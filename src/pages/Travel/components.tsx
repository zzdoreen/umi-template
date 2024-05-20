import echarts, { useEchartsAutoResize, useEchartsInit } from "@/components/Common/echarts";
import { Modal, Tooltip } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import { detailInfo } from "./data";


export const CostStatisticPie = (info: { [key: string]: number }) => {
    const data = useMemo(() => Object.keys(info).map(name => ({ value: info[name], name })), [info])
    const pieRef = useRef<HTMLDivElement>(null)
    const opts = {
        title: {
            left: 'center',
            top: 'center',
            text: `花费\n${data.reduce((pre, curr) => pre + curr?.value, 0)}`
        },
        tooltip: {},
        legend: {
            left: 'center',
            bottom: 400,
        },
        series: {
            type: 'pie',
            radius: ['35%', '60%'],
            data,
            label: {
                show: true, // 显示标签  
                formatter: '{b}: {c}元 \n\n({d}%)' // 使用{b}表示数据项名称，{d}表示百分比
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(200, 0, 0, 0.5)'
                }
            }
        }
    };

    useEchartsAutoResize(pieRef)
    useEchartsInit(pieRef, opts)

    return <div className="chart" ref={pieRef} />
}

export const MapTools = ({ map, centerAndZoomMap }: { map: BMap.Map, centerAndZoomMap: (time?: number) => void }) => {
    const [visible, setVisible] = useState<boolean>(false)

    return <div className="tools">
        <Tooltip placement="left" title="切换地图类型">
            <div className="tool mapType"
                onClick={() => {
                    const maptype = map?.getMapType() === BMAP_NORMAL_MAP ? BMAP_HYBRID_MAP : BMAP_NORMAL_MAP
                    map?.setMapType(maptype)
                }}  >类型</div>
        </Tooltip>
        <Tooltip placement="left" title='花费统计'>
            <div className="tool statistic" onClick={() => {
                centerAndZoomMap(0)
                setVisible(true)
            }}>统计</div>
        </Tooltip>
        <Tooltip placement="left" title="返回默认地图">
            <div onClick={() => centerAndZoomMap(0)} className="tool reset" >返回</div>
        </Tooltip>
        <TotalStatisticModal {...{ visible, setVisible }} />
    </div>
}


const TotalStatisticModal = ({ visible, setVisible }: { visible: boolean, setVisible: (v: boolean) => void }) => {
    const chartsRef = useRef<HTMLDivElement>(null)

    let currKeys: string[] = []
    let totalSource: [string, number][] = []
    const source: any[] = Object.values(JSON.parse(JSON.stringify(detailInfo))).reduce((pre, cur, index) => {
        const values = Object.keys(cur).filter(a => !['title', 'time'].includes(a))//.concat('总额')
        const total = values.reduce((pres, currentName) => pres += typeof cur[currentName] === 'number' && currentName !== '总额' ? cur[currentName] : 0, 0)
        // cur['总额'] = total
        totalSource.push([cur!.name, total])

        if (index === 0) {
            pre = values.map(v => [v, cur[v]])
            currKeys = values
        }
        else {
            const otherKeys = values.filter(name => !currKeys.includes(name))
            if (otherKeys.length) {
                currKeys = currKeys.concat(otherKeys)
                otherKeys.forEach(newKey => {
                    pre.push([newKey])
                })
            }
            for (let i of values) {
                pre.forEach(v => {
                    if (v[0] === i) v[index + 1] = cur[i]
                })
            }
        }
        return pre
    }, [])



    const opts = {
        legend: {},
        tooltip: {
            trigger: 'axis',
            confine: true
            // showContent: false
        },
        dataset: {
            source
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                formatter: function (value: string) {
                    return value.split(' ').join('\n\n')
                }
            }
        },
        title: {
            text: source[0][1].split(' ').join('\n') + '\n\n' + source.reduce((pre, curr) => pre += typeof curr[1] === 'number' ? curr[1] : 0, 0),// + source[source.length - 2][1],
            left: 'center',
            top: '18%'
        },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: source.map((_, index) => {
            if (index === source.length - 1) {
                return (
                    {
                        type: 'pie',
                        id: 'pie',
                        radius: ['20%', '30%'],
                        center: ['50%', '25%'],
                        emphasis: {
                            focus: 'self'
                        },
                        label: {
                            formatter: `{b}: {@${source[0][1]}} ({d}%)`
                        },
                        encode: {
                            itemName: source[0][0],
                            value: source[0][1],
                            tooltip: source[0][1]
                        }
                    }
                )
            }
            return (
                {
                    type: 'line',
                    smooth: true,
                    seriesLayoutBy: 'row',
                    label: {
                        show: true,
                        position: 'top'
                    },
                    emphasis: { focus: 'series' }
                }
            )
        }).concat({ // 总额 直接在datasource添加会影响联动效果
            type: 'bar',
            name: '总花费',
            data: totalSource,
            barWidth: 15, // 柱条宽度
            barGap: "20%" // 柱间距 柱条宽度=100%
        }),
        dataZoom: [
            {
                type: "inside", // inside | slider
                zoomOnMouseWheel: true,
                moveOnMouseWheel: true,
                moveOnMouseMove: true
            }
        ]
    };

    useEffect(() => {

        if (!visible) return
        let chart = echarts.init(chartsRef.current!)

        chart.on('updateAxisPointer', function (event) {
            const xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                const dimension = xAxisInfo.value + 1;
                chart.setOption({
                    title: {
                        text: source[0][dimension].split(' ').join('\n') + '\n\n' + source.reduce((pre, curr) => pre += typeof curr[dimension] === 'number' ? curr[dimension] : 0, 0),// + source[source.length - 2][dimension],
                        // source.reduce((pre, curr) => pre += typeof curr[dimension] === 'number' ? curr[dimension] : 0, 0),
                        left: 'center',
                        top: '18%'
                    },
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension
                        }
                    }
                });
            }
        });

        chart.setOption(opts)

        function resizeFn() { chart?.resize() }
        window.addEventListener('resize', resizeFn)

        return () => {
            chart.dispose()
            window.removeEventListener('resize', resizeFn)
        }
    }, [visible])


    return <Modal width={800} title='统计' open={visible} footer={false} onCancel={() => setVisible(false)}>
        <div ref={chartsRef} className="statistic-modal" />
    </Modal>
}