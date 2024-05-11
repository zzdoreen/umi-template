import { useEffect, useRef, useState } from 'react'
import './index.less'
import { Button, Col, Input, Row, Space } from 'antd'

export default () => {
    const mapRef = useRef<HTMLDivElement>(null)
    const [lglat, setLglat] = useState<string>()
    const [location, setLocation] = useState<string>()
    const [map, setMap] = useState<BMap.Map>()

    useEffect(() => {
        // 初始化地图
        if (!mapRef.current) return
        const map = new BMap.Map(mapRef.current);
        let point = new BMap.Point(116.418261, 39.921984);
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom();
        setMap(map)
    }, [])

    // 行政边界
    const getBoundary = () => {
        if (!map) return
        const bdary = new BMap.Boundary();
        bdary.get("四川成都", (rs) => {
            console.log(rs)
            const count = (rs as unknown as { boundaries: string[] }).boundaries.length;
            if (count === 0) return;
            let pointArr: any[] = [];
            let polygonArr: any[] = [];
            for (let i = 0; i < count; i++) {
                // 建立多边形覆盖物
                const ply = new BMap.Polygon(
                    // @ts-ignore
                    rs.boundaries[i], // 返回的不是BMap.Point[] 也能画, 返回的是 105.11,31.5;106.5,23.5... 字符串
                    {
                        strokeWeight: 2,
                        strokeStyle: "dashed",
                        strokeColor: "#ff0000",
                        strokeOpacity: 0.6,
                        fillColor: "transparent"
                    }
                );
                polygonArr = polygonArr.concat(ply);
                pointArr = pointArr.concat(ply.getPath()); // 获取BMap.Point[]
            }
            polygonArr.map((o) => map.addOverlay(o)); // 添加覆盖物
            map.setViewport(pointArr); // 调整视野
        });
    }

    const locationOrPointAnalyse = (isLocation: boolean) => {
        if (!map) return
        const geo = new BMap.Geocoder();
        const res = isLocation ? location : lglat

        map.clearOverlays()

        let marker: BMap.Marker, label: BMap.Label;

        if (isLocation) {
            setLglat('')
            // 地址转经纬度
            geo.getPoint(res, (point) => {
                if (point) {
                    map.centerAndZoom(point, 16);
                    marker = new BMap.Marker(point);
                    map.addOverlay(marker);
                    console.log(point, point.lng + "," + point.lng);
                } else console.log("地址没有解析到结果");
            }, '');
        } else {
            setLocation('')
            const [lng, lat] = res!.split(",").map(v => Number(v));
            const point = new BMap.Point(lng, lat);
            marker = new BMap.Marker(point);
            map.centerAndZoom(point, 16);
            map.addOverlay(marker);
            // 经纬度转地址
            geo.getLocation(point, (res) => {
                const {
                    address,
                    addressComponents: {
                        city,
                        district,
                        province,
                        street,
                        streetNumber,
                        town
                    }
                } = res;
                const str = `${address}; city: ${city}; district: ${district}; province: ${province}; street: ${street}; streetNumber: ${streetNumber}; town: ${town}`;
                label = new BMap.Label(str, { position: point });
                map.addOverlay(label);
                console.log(res);
            });
        }
    }
    return <div>
        <br />
        <Space>
            {/* 改变地图类型 */}
            <Button onClick={() => map?.setMapType(BMAP_NORMAL_MAP)}>普通街道视图</Button>
            <Button onClick={() => map?.setMapType(BMAP_HYBRID_MAP)}>卫星和路网的混合视图</Button>
            <Button onClick={() => map?.setMapType(BMAP_SATELLITE_MAP)}>卫星视图</Button>
            <Button onClick={getBoundary}>获取行政边界</Button>
        </Space>
        <br />
        <br />
        <Row>
            <Col span={6}>
                <Input type="text" placeholder="输入地址" id="location" width={150} value={location} onChange={(e) => setLocation(e.target.value)} />
            </Col>
            <Col span={6}>
                <Button onClick={() => locationOrPointAnalyse(true)}>提交</Button>
            </Col>
        </Row>
        <br />
        <Row>
            <Col span={6}>
                <Input type="text" placeholder="输入经纬度 x,x" id="lglat" width={150} value={lglat} onChange={(e) => setLglat(e.target.value)} />
            </Col>
            <Col span={6}>
                <Button onClick={() => locationOrPointAnalyse(false)}>提交</Button>
            </Col>
        </Row>
        <br />
        <div id="container" ref={mapRef} />
    </div>
}

/* 

const locationDom = document.getElementById("location");
const lglatDom = document.getElementById("lglat");
let marker, label;

// 地图初始化
const map = new BMap.Map("container");
var point = new BMap.Point(116.418261, 39.921984);
map.centerAndZoom(point, 15);
map.enableScrollWheelZoom();




const setMapTypeChange = (type) => map.setMapType(type);

// 地址解析 / 逆地址解析
function locationOrPointAnalyse(isLocation) {
  const geo = new BMap.Geocoder();
  const res = isLocation ? locationDom.value : lglatDom.value;

  if (map) [marker, label].map((o) => map.removeOverlay(o));

  if (isLocation) {
    lglatDom.value = "";
    // 地址转经纬度
    geo.getPoint(res, (point) => {
      if (point) {
        map.centerAndZoom(point, 16);
        marker = new BMap.Marker(point);
        map.addOverlay(marker);
        console.log(point, point.lng + "," + point.lng);
      } else console.log("地址没有解析到结果");
    });
  } else {
    locationDom.value = "";
    const [lng, lat] = res.split(",");
    const point = new BMap.Point(lng, lat);
    marker = new BMap.Marker(point);
    map.centerAndZoom(point, 16);
    map.addOverlay(marker);
    // 经纬度转地址
    geo.getLocation(point, (res) => {
      const {
        address,
        addressComponents: {
          city,
          district,
          province,
          street,
          streetNumber,
          town
        }
      } = res;
      const str =
        address +
        "; city: " +
        city +
        "/ district: " +
        district +
        "/ province: " +
        province +
        "/ street: " +
        street +
        "/ streetNumber: " +
        streetNumber +
        "/ town: " +
        town;
      label = new BMap.Label(str, { position: point });
      map.addOverlay(label);
      console.log(res);
    });
  }
}

*/