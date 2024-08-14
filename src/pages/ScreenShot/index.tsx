import { Button } from "antd";
import scriptjs from 'scriptjs'
import { useCallback, useEffect, useRef } from "react";
import './index.less'
import html2canvas from "html2canvas";

export default function ScreenShot() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        scriptjs('//api.map.baidu.com/getscript?type=webgl&v=1.0&ak=2Cj12hK8X1jz5STDaOUrGShTmyaw5aUB&services=&t=20240801100837',
            () => {
                const bmapgl = new BMapGL.Map(ref.current!, {
                    // @ts-ignore
                    preserveDrawingBuffer: true, // 截图必须配置
                    enableMapClick: true,
                    enableAutoResize: true,
                    enableHighResolution: true
                })
                bmapgl.centerAndZoom(new BMapGL.Point(104, 30.5), 10)
                // bmapgl.setMapType(BMAP_EARTH_MAP)
                bmapgl.enableScrollWheelZoom()
                bmapgl.setTilt(30)

                const p1 = new BMapGL.Point(105.40432315282534, 38.89288042490572)
                const p2 = new BMapGL.Point(105.40419509683154, 38.89287689968862)
                const p3 = new BMapGL.Point(105.4047079608473, 38.89288400949964);

                [p1, p2, p3].forEach((v, index) => {
                    bmapgl.addOverlay(new BMapGL.Marker(v))
                    bmapgl.addOverlay(new BMapGL.Label(index + 1 + '', { position: v }))
                })

                const polyline = new BMapGL.Polyline([p1, p2, p3], {
                    strokeStyle: 'dashed',
                    strokeColor: 'blue',
                    // @ts-ignore
                    strokeTexture: {
                        url: 'https://mapopen-pub-jsapigl.bj.bcebos.com/svgmodel/Icon_road_blue_arrow.png',
                        width: 16,
                        height: 64
                    },
                    strokeWeight: 8,
                    strokeOpacity: 0.8
                });
                bmapgl.addOverlay(polyline);
                bmapgl.setViewport([p1, p2, p3])
            })
    }, [])

    const handleScreenshot = useCallback(() => {
        html2canvas(ref.current!).then(canvas => {
            const url = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.href = url
            link.download = '截图.png'
            link.click()
        })
    }, [])

    return <>
        <Button onClick={handleScreenshot}>截图</Button>
        <div className="screenshot-content" ref={ref} />
    </>
}