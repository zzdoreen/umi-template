import echarts, { useEchartsAutoResize } from "@/components/Common/echarts"
import { useEffect, useRef } from "react"

export function LineChart() {
    const lineRef = useRef<HTMLDivElement>(null)
    useEchartsAutoResize(lineRef)

    useEffect(() => {
        if (!lineRef.current) return
        let chart = echarts.init(lineRef.current!)
        chart.setOption({
            // 标题
            title: {
                text: "line"
            },

            // 边距
            grid: {
                left: "5%",
                top: "20%",
                bottom: "10%",
                width: "auto",
                containLabel: true // grid区域是否包含坐标轴的刻度标签
            },

            // 提示框
            tooltip: {
                confine: true // 是否将tooltip限制在图表内
            },

            // 图例
            legend: {
                type: "scroll", // 图例类型 plain | scroll 普通 | 翻滚翻页
                // icon: 'circle' // 图例项的icon
                // orient: 'vertical' // 图例朝向'vertical' | 'horizontal'
                bottom: 0,
                width: 250 // 图例总宽度
            },

            // x轴
            xAxis: {
                // 悬停 坐标轴指示器
                axisPointer: {
                    show: true,
                    type: "shadow" // 阴影 | 直线
                },
                // minInterval: 100, // 最小间隔
                // min:'2023-06-09',
                // max: '2023-06-16',
                type: 'category',// value | category | time | log 数值 | 类目 | 时间 | 对数
                data: ['2023-06-09', '2023-06-10', '2023-06-11', '2023-06-12', '2023-06-13', '2023-06-14', '2023-06-15',],
                name: "x",
                nameLocation: "end", // 坐标轴名称显示位置

                splitLine: {
                    // grid 区域分割线 ( 竖 )
                    show: true,
                    lineStyle: {
                        type: "dashed"
                        // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                    }
                },

                axisLine: {
                    // [坐标轴线] 相关配置
                    // show: false
                    symbol: "none", // ['none' | 'arrow', 'none' | 'arrow'] | 'none' | 'arrow' // 轴线两边的箭头
                    lineStyle: {
                        // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                    }
                },

                axisTick: {
                    // 坐标轴刻度
                    show: true,
                    inside: true // 刻度是否朝内
                },

                axisLabel: {
                    // 刻度标签
                }
            },

            // y轴
            yAxis: {
                name: "y",
                // minInterval: number // 最小间隔

            },

            // 数据展示的颜色
            color: ["#085078", "#85D8CE"],

            // 数据
            series: [
                {
                    name: "a",
                    type: "line", // 类型一般就 bar | line | pie
                    data: [0, -20, 36, 10, 100, 20, 55],

                    // 区域填充样式
                    areaStyle: {
                        // color: "pink",
                        // color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)']

                        // new echarts.graphic.LinearGradient(右,下,左,上) 起止位置
                        // 0 0 0 1则代表渐变色从正上方开始
                        // 0 1 0 0代表从正下方向正上方渐变
                        // 1 0 0 1代表从右上方向左下方渐变
                        color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                            {
                                offset: 0,
                                color: 'rgba(58,77,233,1)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(58,77,233,0.3)'
                            }
                        ])
                    },

                    // 标注点
                    markPoint: {
                        symbol: "pin", // 样式
                        symbolSize: 35, // 大小
                        data: [
                            {
                                name: "a1",
                                type: "max" // max | min | average ( 最大 | 最小 | 中间值 )
                            }
                        ]
                    },

                    // 标线
                    markLine: {
                        name: "标线",
                        symbol: "none",
                        label: {
                            formatter: "{c}-{b}",
                            offset: [0, 10] // 文字偏移量 [+右 -左，+下 -上]
                        },
                        lineStyle: {
                            type: "dashed",
                            width: 1
                        },
                        data: [
                            {
                                name: "标线",
                                yAxis: 66, // xAxis: '裤子' 需要注意数值最值限制
                                lineStyle: {},
                                label: {
                                    position: "middle" // start | end | middle
                                }
                            }
                        ]
                    },

                    // 标域
                    markArea: {
                        data: [
                            [
                                {
                                    name: "mark-area",
                                    type: "average"
                                },
                                {
                                    type: "max"
                                }
                            ]
                        ]
                    }
                }
            ],

            // 区域缩放
            dataZoom: [
                {
                    type: "inside", // inside | slider
                    zoomOnMouseWheel: true,
                    moveOnMouseWheel: true,
                    moveOnMouseMove: true
                }
            ]
        })

        function resizeFn() { chart?.resize() }
        window.addEventListener('resize', resizeFn)

        return () => {
            chart.dispose()
            window.removeEventListener('resize', resizeFn)
        }
    }, [])

    return <div className="line" ref={lineRef} />
}

export function BarChart() {
    const barRef = useRef<HTMLDivElement>(null)
    useEchartsAutoResize(barRef)

    useEffect(() => {
        if (!barRef.current) return
        let chart = echarts.init(barRef.current!)
        chart.setOption({
            // 标题
            title: {
                text: "bar"
            },

            // 边距
            grid: {
                left: "5%",
                top: "20%",
                bottom: "10%",
                width: "auto",
                containLabel: true // grid区域是否包含坐标轴的刻度标签
            },

            // 提示框
            tooltip: {
                confine: true // 是否将tooltip限制在图表内
            },

            // 图例
            legend: {
                type: "scroll", // 图例类型 plain | scroll 普通 | 翻滚翻页
                // icon: 'circle' // 图例项的icon
                // orient: 'vertical' // 图例朝向'vertical' | 'horizontal'
                bottom: 0,
                width: 250 // 图例总宽度
            },

            // x轴
            xAxis: {
                // 悬停 坐标轴指示器
                axisPointer: {
                    show: true,
                    type: "shadow" // 阴影 | 直线
                },
                // minInterval: 100, // 最小间隔
                // min:'2023-06-09',
                // max: '2023-06-16',
                type: 'category',// value | category | time | log 数值 | 类目 | 时间 | 对数
                data: ['2023-06-09', '2023-06-10', '2023-06-11', '2023-06-12', '2023-06-13', '2023-06-14', '2023-06-15',],
                name: "x",
                nameLocation: "end", // 坐标轴名称显示位置

                splitLine: {
                    // grid 区域分割线 ( 竖 )
                    show: true,
                    lineStyle: {
                        type: "dashed"
                        // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                    }
                },

                axisLine: {
                    // [坐标轴线] 相关配置
                    // show: false
                    symbol: "none", // ['none' | 'arrow', 'none' | 'arrow'] | 'none' | 'arrow' // 轴线两边的箭头
                    lineStyle: {
                        // { color , width , type , dashOffset , cap , join , miterLimit , shadowBlur , shadowColor , shadowOffsetX , shadowOffsetY , opacity }
                    }
                },

                axisTick: {
                    // 坐标轴刻度
                    show: true,
                    inside: true // 刻度是否朝内
                },

                axisLabel: {
                    // 刻度标签
                }
            },

            // y轴
            yAxis: {
                name: "y",
                // minInterval: number // 最小间隔

            },

            // 数据展示的颜色
            color: ["#085078", "#85D8CE"],

            // 数据
            series: [
                {
                    name: "b",
                    type: "bar",
                    barMinHeight: 2,
                    data: [20, 0,
                        {
                            value: 136,
                            itemStyle: {
                                color: { // 颜色配置 https://echarts.apache.org/zh/option.html#color
                                    type: 'linear',
                                    x: 1,
                                    y: 1,
                                    x2: 0,
                                    y2: 0,
                                    colorStops: [{
                                        offset: 0, color: '#9FEAE5' // 0% 处的颜色
                                    }, {
                                        offset: 1, color: '#FFC0CB' // 100% 处的颜色
                                    }],
                                    global: false // 缺省为 false
                                }
                            }

                        },
                        100, 100, 120],
                    barWidth: 15, // 柱条宽度
                    barGap: "20%" // 柱间距 柱条宽度=100%
                }
            ],

            // 区域缩放
            dataZoom: [
                {
                    type: "inside", // inside | slider
                    zoomOnMouseWheel: true,
                    moveOnMouseWheel: true,
                    moveOnMouseMove: true
                }
            ]
        })

        function resizeFn() { chart?.resize() }
        window.addEventListener('resize', resizeFn)

        return () => {
            chart.dispose()
            window.removeEventListener('resize', resizeFn)
        }
    }, [])
    return <div className="bar" ref={barRef} />
}

export function PieChart() {
    const pieRef = useRef<HTMLDivElement>(null)
    useEchartsAutoResize(pieRef)

    useEffect(() => {
        if (!pieRef.current) return
        let chart = echarts.init(pieRef.current)
        chart.setOption(
            {
                title: {
                    text: "\n \n pie",
                    subtext: "副标题:16 \n aaa:20 \n bbb:100",
                    top: 'center',
                    right: 'center'
                },

                // 提示框
                tooltip: {
                    trigger: "item"
                },

                // 对饼图不生效
                // grid: {},
                legend: {
                    orient: "vertical",
                    left: "left",
                    top: 0
                },
                color: ["pink", "red", "black", "green", "blue"],
                series: [
                    {
                        type: "pie",
                        name: "From",

                        center: ["50%", "60%"], // 圆心坐标 [number|string,number|string] [横坐标,纵坐标]

                        radius: ["30%", "45%"], // 饼图半径，number | string eg:'20%'外半径占宽/高(短的那个)的比例 | [number|string,number|string] [内半径,外半径]

                        data: [
                            { value: 1048, name: "S" },
                            { value: 735, name: "D" },
                            { value: 580, name: "E" },
                            { value: 484, name: "U" },
                            { value: 300, name: "V" }
                        ],

                        // 文本标签
                        label: {
                            // show:false,
                            position: "outside", // 'outside' 饼图外侧，通过视觉引导线连接 | inside === inner | 'center'
                            // formatter: '{a}:{b}-{c}-{d}%',
                            formatter: ["{a| {a}:}{b| {b}-}", "{c| {c}-}{d| {d}%}"].join("\n"),
                            // width: 80,
                            // overflow: 'break', // 设置了width才生效，none | truncate 截断末尾显示ellipsis配置的文本 默认... | break | breakAll 强制单词内换行

                            // 自定义富文本样式
                            // {styleName| text content } 换行用 \n
                            rich: {
                                a: {
                                    color: "red",
                                    fontWeight: 700
                                },
                                b: {
                                    fontSize: 18
                                },
                                c: {
                                    backgroundColor: "#449933"
                                    /* 
                                        所有属性，label同理
                                        { 
                                            color , fontStyle , fontWeight , fontFamily , fontSize , align , verticalAlign , lineHeight , backgroundColor , 
                                            borderColor , borderWidth , borderType , borderDashOffset , borderRadius , padding , shadowColor , shadowBlur ,
                                            shadowOffsetX , shadowOffsetY , width , height , textBorderColor , textBorderWidth , textBorderType , 
                                            textBorderDashOffset , textShadowColor , textShadowBlur , textShadowOffsetX , textShadowOffsetY 
                                        }
                                                        
                                    */
                                }
                            }

                            // alignTo: 'labelLine', // 标签对齐方式 none | lableLine 末端对齐 | edge 文字对齐与edgeDistance(文字边距)配合使用  （position为outside时生效）
                        },

                        // 视觉引导线相关配置
                        labelLine: {
                            // show: true,
                            // showAbove: true,
                            length: 10, // 靠内引导线
                            length2: 15, // 靠外引导线
                            minTurnAngle: 90 // 最小夹角  maxTurnAngle

                            /*
                            lineStyle: {
                                color, width, type, dashOffset, cap, join, miterLimit, shadowBlur, shadowColor, shadowOffsetX, shadowOffsetY, opacity
                            }
                            */
                        },

                        // 标签统一布局配置
                        labelLayout: () => ({
                            // labelLayout: (p) => ({
                            //     x: p.rect.x - 10,
                            //     ...
                            // })

                            // align: 'left'
                            // verticalAlign: 'top' | 'middle' | 'bottom'
                            // draggable: boolean

                            hideOverlap: true, // 隐藏重叠的标签
                            moveOverlap: "shiftY" // 可挪动标签  shiftx | shiftY  水平/垂直方向依次位移
                        }),

                        // 图形样式
                        itemStyle: {
                            borderColor: "black"
                            // borderType: solid | dashed dotted | number | [number (线长),number (空白长)]
                        },

                        // 高亮状态的扇区和标签样式
                        emphasis: {
                            // disabled: boolean // 是否关闭高亮
                            // scale: boolean    // 是否开启高亮后扇区的放大效果
                            // scaleSize: number    // 放大尺寸
                            // focus: 'none' | 'self' 之聚焦当前高亮的数据的图形 | 'series' 聚焦当前高亮的数据所在的系列的所有图形
                            // blurScope: 'coordinateSystem' 淡出范围为坐标 | 'series' 淡出范围为系列 | 'global' 淡出范围为全局
                        }
                    }
                ]
            }
        )
        function resizeFn() { chart?.resize() }
        window.addEventListener('resize', resizeFn)

        return () => {
            chart.dispose()
            window.removeEventListener('resize', resizeFn)
        }
    }, [])
    return <div className="pie" ref={pieRef} />
}

export function DatasetChart() {
    const datasetRef = useRef<HTMLDivElement>(null)
    useEchartsAutoResize(datasetRef)

    useEffect(() => {
        if (!datasetRef.current) return
        let chart = echarts.init(datasetRef.current)

        chart.setOption({
            title: {
                text: 'dataset'
            },
            legend: {},
            tooltip: {},
            /* 
            series.data 或者 dataset.source 的每个纬度的信息 
    
            dataset: string[] // => {name:string}[]
            dataset: {
                name: string,
                type: number | ordinal | float | int | time,
                displayName: string // 用于tooltip中纬度名的展示
            }[]
             */
            dataset: {
                // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
                // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
                // 如果不指定 dimensions，也可以通过指定 series.encode 完成映射
                dimensions: ["product", "2015", "2016", "2017"],
                source: [
                    { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
                    { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
                    { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
                    { product: "Walnut Brownie", 2015: 72.4, 2016: 53.9, 2017: 39.1 }

                    /*  =>
                     ['product', '2015', '2016', '2017'],
                     ['Matcha Latte', 43.3, 85.8, 93.7],
                     ['Milk Tea', 83.1, 73.4, 55.1],
                     ['Cheese Cocoa', 86.4, 65.2, 82.5],
                     ['Walnut Brownie', 72.4, 53.9, 39.1]
                       */
                ]
            },
            xAxis: { type: "category" },
            yAxis: {},
            // type : pie | line | bar
            series: [{ type: "line" }, { type: "bar" }, { type: "bar" }]
        })

        function resizeFn() { chart?.resize() }
        window.addEventListener('resize', resizeFn)
        return () => {
            chart?.dispose()
            window.removeEventListener('resize', resizeFn)
        }
    }, [])
    return <div className="dataset" ref={datasetRef} />
}