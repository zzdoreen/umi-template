import { useCallback, useEffect, useRef, useState } from "react"
import { Button, Popover } from "antd"
// import { detailInfo, traveled, traveledPoint } from './data'
import { CloseCircleOutlined } from "@ant-design/icons"
import { CostStatisticPie, MapTools } from "./components"
import './index.less'
import { useModel } from "@umijs/max"

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

        // 尼泊尔
        fetch('./geojson/nepal-states.geojson')
            .then(res => res?.json())
            .then(({ features }) => {
                if (Array.isArray(features) && features?.length) {
                    let polygonArr: any[] = [];
                    features.forEach(({ geometry: { coordinates = [] } = {} }) => {
                        const points = coordinates?.map(([lng, lat]: [number, number]) => new BMap.Point(lng, lat))
                        const ply = new BMap.Polygon(points, {
                            strokeWeight: 2,
                            strokeStyle: "dashed",
                            strokeColor: "#0000ff",
                            strokeOpacity: 0.6,
                            fillColor: 'rgba(200,100,55,0.7)'
                        })
                        polygonArr = polygonArr.concat(ply);
                        pointArr = pointArr.concat(ply.getPath()); // 获取BMap.Point[]

                        ply.addEventListener('click', (v: BMap.Polygon) => {
                            // @ts-ignore
                            const { x: left, y: top } = v?.pixel
                            if (detailInfo['尼泊尔'])
                                setCurrentArea(areas => {
                                    let data = { ...areas }
                                    data['尼泊尔'] = { left, top, visible: true }
                                    return data
                                })
                        })
                    })

                    polygonArr.map((o) => map.addOverlay(o)); // 添加覆盖物

                    return () => {
                        polygonArr.map(o => map.removeOverlay(o))
                    }
                }
            }).catch(() => {
                // 没有边界
                const markers = traveledPoint.map(({ name, lng, lat }) => {
                    const point = new BMap.Point(lng, lat)
                    const marker = new BMap.Marker(point)
                    pointArr = pointArr.concat([point])
                    marker.addEventListener('click', () => {
                        const { x: left, y: top } = map.pointToPixel(point)
                        if (detailInfo[name])
                            setCurrentArea(areas => {
                                let data = { ...areas }
                                data[name] = { left, top, visible: true }
                                return data
                            })
                    })
                    return marker
                })

                markers.map(o => map.addOverlay(o))

                return () => {
                    markers.map(o => map.removeOverlay(o))
                }
            })

        // 国内
        traveled.forEach((name, index) => {
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
