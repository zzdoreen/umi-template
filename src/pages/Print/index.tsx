import { useEffect, useRef, useState } from "react"
import './index.less'
import { Button, Table } from "antd"

export default function Print() {
    const mapRef = useRef<HTMLDivElement>(null)
    const [printFlag, setPrintFlag] = useState<boolean>(false)
    const { pathname, origin, hash } = window.location

    useEffect(() => {
        if (!mapRef.current) return

        const map = new BMap.Map(mapRef.current)
        map.centerAndZoom(new BMap.Point(104.07, 30.67), 11); // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP] })); // 添加地图类型控件
        map.setCurrentCity("成都"); // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(); // 开启鼠标滚轮缩放

    }, [mapRef])

    const handlePrint = () => {
        if (hash === '#/print')
            window.open(origin + pathname + '#/detail/print', '_target')
        else {
            setPrintFlag(true)

            setTimeout(() => {
                window.print()
            }, 1e3);
        }
    }

    useEffect(() => {
        function triggerPrintFlag() { setPrintFlag(false) }

        window.addEventListener('afterprint', triggerPrintFlag)

        return () => {
            window.removeEventListener('afterprint', triggerPrintFlag)
        }
    }, [])

    return <div className="print-wrapper" >
        <div className="container">
            <h1>一、地图</h1>
            <div className="map" ref={mapRef} />
            <br />
            <h1>二、蜀道难</h1>
            <div className="content">
                &nbsp;&nbsp;噫吁嚱，危乎高哉！蜀道之难，难于上青天！蚕丛及鱼凫，开国何茫然！尔来四万八千岁，不与秦塞通人烟。西当太白有鸟道，可以横绝峨眉巅。

                地崩山摧壮士死，然后天梯石栈相钩连。上有六龙回日之高标，下有冲波逆折之回川。黄鹤之飞尚不得过，猿猱欲度愁攀援。青泥何盘盘，百步九折萦岩峦。扪参历井仰胁息，以手抚膺坐长叹。

                问君西游何时还？畏途巉岩不可攀。但见悲鸟号古木，雄飞雌从绕林间。又闻子规啼夜月，愁空山。蜀道之难，难于上青天，使人听此凋朱颜！

                连峰去天不盈尺，枯松倒挂倚绝壁。飞湍瀑流争喧豗，砯崖转石万壑雷。其险也如此，嗟尔远道之人胡为乎来哉！

                剑阁峥嵘而崔嵬，一夫当关，万夫莫开。所守或匪亲，化为狼与豺。朝避猛虎，夕避长蛇；磨牙吮血，杀人如麻。锦城虽云乐，不如早还家。蜀道之难，难于上青天，侧身西望长咨嗟！
            </div>
            <br />
            <h1>三、表格</h1>
            <Table columns={[{ title: '姓名' }, { title: '性别' }, { title: '年龄' }]} style={{ width: '100%' }} />
        </div>
        <Button className="btn" size="large" type="primary" style={{ display: printFlag ? 'none' : 'inline-block' }} onClick={handlePrint}>打印</Button>
    </div>
}