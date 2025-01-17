import { useCallback, useEffect, useRef, useState } from "react"
import { Button, Popover } from "antd"
import { CloseCircleOutlined } from "@ant-design/icons"
import { CostStatisticPie, MapTools } from "./components"
import { useModel } from "@umijs/max"
import { GeoJSONObject } from "@/services/entities"
import './index.less'

type MapCenterFunc = () => void

export default function () {
    const { detailInfo, traveled, traveledPoint } = useModel('@@initialState', ({ initialState }) => initialState?.travelData)
    const mapRef = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<BMap.Map>()
    const [currentArea, setCurrentArea] = useState<{ [key: string]: { left: number, top: number, visible: boolean } }>({})
    const mapServiceAreaFuncRef = useRef<MapCenterFunc>() //默认额服务区域边界

    const centerAndZoomMap = useCallback((delay = 500) => {
        setTimeout(() => {
            mapServiceAreaFuncRef.current?.()
            setCurrentArea({})
        }, delay);
    }, [])

    useEffect(() => {
        // 初始化地图
        if (!mapRef.current) return
        const map = new BMap.Map(mapRef.current);
        let point = new BMap.Point(109, 36);
        map.centerAndZoom(point, 6);
        map.enableScrollWheelZoom();
        map.setMapType(BMAP_HYBRID_MAP)
        setMap(map)

        const resetArea = () => { setCurrentArea({}) }

        ['zoomend', 'dragend'].forEach(event => map.addEventListener(event, resetArea))

        return () => {
            ['zoomend', 'dragend'].forEach(event => map.removeEventListener(event, resetArea))
        }
    }, [])

    // 边界、视野
    useEffect(() => {
        if (!map) return
        const bdary = new BMap.Boundary()
        let pointArr: any[] = [];

        // 国外
        traveledPoint.map((info: { name: string, lng: number, lat: number }) => {
            fetch(`./geojson/${info?.name}.geojson`).then(res => res?.json())
                .then((data) => {
                    const overlays = displayGeoJSON(data)
                    overlays.map(v => {
                        v.addEventListener('click', (v: BMap.Polygon) => {
                            // @ts-ignore
                            const { x: left, y: top } = v?.pixel
                            if (detailInfo[info?.name])
                                setCurrentArea(areas => {
                                    let data = { ...areas }
                                    data[info?.name] = { left, top, visible: true }
                                    return data
                                })
                        })
                        return map.addOverlay(v)
                    })

                    return () => {
                        overlays?.map(v => map.removeOverlay(v))
                    }
                }).catch(() => {
                    // 没有边界
                    const point = new BMap.Point(info?.lng, info?.lat)
                    const marker = new BMap.Marker(point)
                    pointArr = pointArr.concat([point])
                    marker.addEventListener('click', () => {
                        const { x: left, y: top } = map.pointToPixel(point)
                        if (detailInfo[info?.name])
                            setCurrentArea(areas => {
                                let data = { ...areas }
                                data[info?.name] = { left, top, visible: true }
                                return data
                            })
                    })
                    map.addOverlay(marker)
                    return () => { map.removeOverlay(marker) }
                })
        })


        // 国内
        traveled.forEach((name: string, index: number) => {
            bdary.get(name, (rs) => {
                if (!name) return
                const count = (rs as unknown as { boundaries: string[] }).boundaries.length;
                if (count === 0) return;

                let polygonArr: any[] = [];
                for (let i = 0; i < count; i++) {
                    // 建立多边形覆盖物
                    const ply = new BMap.Polygon(
                        // @ts-ignore
                        rs.boundaries[i], // 返回的不是BMap.Point[] 也能画, 返回的是 105.11,31.5;106.5,23.5... 字符串
                        {
                            strokeWeight: 2,
                            strokeStyle: "dashed",
                            strokeColor: "#0000ff",
                            strokeOpacity: 0.6,
                            fillColor: detailInfo[name] ? 'rgba(200,100,55,0.7)' : "rgba(0,0,255,0.5)"
                        }
                    );
                    polygonArr = polygonArr.concat(ply);
                    pointArr = pointArr.concat(ply.getPath()); // 获取BMap.Point[]

                    ply.addEventListener('click', (v: BMap.Polygon) => {
                        // @ts-ignore
                        const { x: left, y: top } = v?.pixel
                        if (detailInfo[name])
                            setCurrentArea(areas => {
                                let data = { ...areas }
                                data[name] = { left, top, visible: true }
                                return data
                            })

                    })
                }
                polygonArr.map((o) => map.addOverlay(o)); // 添加覆盖物
                if (index === traveled.length - 1) {
                    mapServiceAreaFuncRef.current = () => map.setViewport(pointArr); // 调整视野
                    centerAndZoomMap()
                }

                return () => {
                    polygonArr.map(o => map.removeOverlay(o))
                }
            })
        })
    }, [map])

    return <>
        <div id="map" ref={mapRef} />
        {/* 地图工具组件 */}
        <MapTools map={map!} centerAndZoomMap={centerAndZoomMap} />
        {/* 详情框 */}
        {
            Object.keys(currentArea).map(area => {
                const { left, top, visible } = currentArea[area]
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { title, time, name, ...infos } = detailInfo[area]
                return <Popover
                    title={`${title} (${time})`}
                    trigger='click'
                    rootClassName="popover-container"
                    open={visible}
                    key={area}
                    content={<>
                        <Button className="close-btn" shape="circle"
                            type="link" danger icon={<CloseCircleOutlined />}
                            onClick={() => {
                                setCurrentArea(areas => {
                                    const data = { ...areas }
                                    data[area].visible = false
                                    return data
                                })
                            }} />
                        <CostStatisticPie {...infos} />
                    </>}
                >
                    <div className="content" style={{ left, top }} />
                </Popover >
            })
        }
    </>
}


// 定义一个处理GeoJSON数据并显示在地图上的函数
function displayGeoJSON(geoJsonData: GeoJSONObject) {
    if (!geoJsonData || !geoJsonData.features) {
        console.error("无效的GeoJSON数据");
        return [];
    }
    let result: any[] = []
    geoJsonData.features.forEach(function (feature) {
        let geometry = feature.geometry;
        let coordinates: number[] = [];
        let type = geometry.type;
        if (type === "Point") {
            coordinates = [geometry.coordinates[1] as number, geometry.coordinates[0] as number];  // [lat, lng]
            let point = new BMap.Point(coordinates[0], coordinates[1]);
            let marker = new BMap.Marker(point);
            result = result.concat(marker)
        } else if (type === "LineString") {
            coordinates = geometry.coordinates.map(function (coord) {
                return new BMap.Point(coord[0], coord[1]);
            });
            let polyline = new BMap.Polyline(coordinates, { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 });
            result = result.concat(polyline)
        } else if (type === "Polygon") {
            coordinates = geometry.coordinates[0].map(function (coord) {
                return new BMap.Point(coord[0], coord[1]);
            });
            let polygon = new BMap.Polygon(coordinates, { strokeColor: "transparent", strokeWeight: 0, strokeOpacity: 0, fillColor: "rgba(0, 0, 255, 0.1)", fillOpacity: 0.5 });
            result = result.concat(polygon)
        } else if (type === "MultiPoint") {
            coordinates = geometry.coordinates.map(function (coord) {
                return new BMap.Point(coord[0], coord[1]);
            });
            coordinates.forEach(function (coord) {
                let marker = new BMap.Marker(coord);
                result = result.concat(marker)
            });
        } else if (type === "MultiLineString") {
            geometry.coordinates.forEach(function (line) {
                let lineCoordinates = line.map(function (coord) {
                    return new BMap.Point(coord[0], coord[1]);
                });
                let polyline = new BMap.Polyline(lineCoordinates, { strokeColor: "blue", strokeWeight: 2, strokeOpacity: 0.5 });
                result = result.concat(polyline)
            });
        } else if (type === "MultiPolygon") {

            let polygonCoordinates = geometry.coordinates.map(function (coord) {
                return new BMap.Point(coord[0], coord[1]);
            });
            let poly = new BMap.Polygon(polygonCoordinates, {
                strokeWeight: 2,
                strokeStyle: "dashed",
                strokeColor: "transparents",
                fillColor: 'rgba(200,100,55,0.7)'
            });
            result = result.concat(poly)

        } else {
            console.warn("不支持的GeoJSON几何类型: " + type);
        }
    })

    return result
}
