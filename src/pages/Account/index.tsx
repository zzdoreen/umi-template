import { Badge, Calendar, CalendarProps } from "antd";
import moment, { Moment } from "moment";
import { useEffect, useMemo, useRef, useState } from "react";
import echarts from "@/components/Common/echarts";
import { Space } from "antd";
import { useModel } from "@umijs/max";

export default function () {
    const [month, setMonth] = useState<number>(1)
    const [date, setDate] = useState<Moment>(moment())
    const dataRef = useRef<HTMLDivElement>(null)
    const data = useModel('@@initialState', ({ initialState }) => initialState?.data)

    const { source, expenditures, incomes, totalSurplus, totalIncome, totalExpenditures } = useMemo(() => {
        const isCurrentYear = date.get('year') === moment().get('year')
        const endMonth = isCurrentYear ? moment().get('month') + 1 : 12

        let source: (string | number)[][] = [['month']],
            expenditures: [string, number][] = [],
            incomes: [string, number][] = [],
            totalSurplus = 0, totalIncome = 0, totalExpenditures = 0;

        for (let i = 1; i <= endMonth; i++) {
            const dateStr = `${date.get('year')}-${i}`
            source[0].push(dateStr)
        }
        source[0].forEach((month: string | number, index: number) => {
            if (index === 0) return
            expenditures.push([month as unknown as string, data[month]?.expenditure.total])
            incomes.push([month as unknown as string, data[month]?.income])
            const surplus = ((data[month]?.income - data[month]?.expenditure.total).toFixed(1) as unknown as number) - 0
            totalSurplus += isNaN(surplus) ? 0 : surplus
            totalIncome += isNaN(data[month]?.income) ? 0 : data[month]?.income
            totalExpenditures += isNaN(data[month]?.expenditure?.total) ? 0 : data[month]?.expenditure?.total

            const types = Object.keys(data[month]?.expenditure || []).splice(1)

            for (let i = 0; i < types.length; i++) {
                const value: number = data[month]?.expenditure[types[i]] || 0
                if (index === 1)
                    source.push([types[i], value])
                else
                    source[i + 1].push(value)
            }
        })

        return {
            source, expenditures, incomes,
            totalIncome: totalIncome.toFixed(1),
            totalSurplus: totalSurplus.toFixed(1),
            totalExpenditures: totalExpenditures.toFixed(1),
        }
    }, [date])

    const opts = useMemo(() => ({
        legend: {},
        tooltip: {
            trigger: 'axis',
            confine: true
            // showContent: false
        },
        dataset: { source },
        xAxis: {
            type: 'category',
            axisLabel: { formatter: function (value: string) { return value.split(' ').join('\n\n') } }
        },
        title: {
            // eslint-disable-next-line no-param-reassign
            text: source[0][month] + '\n\n' + source.reduce((pre, curr) => pre += typeof curr[month] === 'number' ? curr[month] : 0, 0),
            left: 'center',
            top: '18%'
        },
        yAxis: { gridIndex: 0 },
        grid: { top: '55%' },
        series: source.map((_, index) => {
            if (index === source.length - 1) {
                return ({
                    type: 'pie',
                    id: 'pie',
                    radius: ['20%', '30%'],
                    center: ['50%', '25%'],
                    emphasis: { focus: 'self' },
                    label: { formatter: `{b}: {@${source[0][month]}} ({d}%)` },
                    encode: {
                        itemName: source[0][0],
                        value: source[0][month],
                        tooltip: source[0][month]
                    }
                })
            }
            return ({
                type: 'line',
                smooth: true,
                stack: 'Total',
                // label: { show: true, position: 'top' },
                areaStyle: {},
                seriesLayoutBy: 'row',
                emphasis: { focus: 'series' }
            })
        }).concat(incomes[0][1] ? [{ // 总额 直接在datasource添加会影响联动效果
            type: 'bar',
            // @ts-ignore
            name: '收入',
            data: incomes,
            label: { show: true, position: 'top' },
            barWidth: 15, // 柱条宽度
            barGap: "20%" // 柱间距 柱条宽度=100%
        },
        {
            type: 'line',
            name: '花费',
            label: { show: true, position: 'top' },
            data: expenditures,
        },
        {
            type: 'pie',
            id: 'statistic',
            name: '-',
            radius: '30%',
            center: ['30%', '25%'],
            data: source.slice(1).map(v => {
                // @ts-ignore
                const [name, value] = [v[0], v.slice(1).reduce((pre, curr) => pre + (isNaN(curr) ? 0 : curr), 0)]
                return { value: (value as number).toFixed(1), name }
            }),
            emphasis: { focus: 'self' },
            label: { formatter: `{b}: {@${source[0][month]}} ({d}%)` },
        }
        ] : []),
        dataZoom: [
            {
                type: "inside", // inside | slider
                zoomOnMouseWheel: true,
                moveOnMouseWheel: true,
                moveOnMouseMove: true
            }
        ]
    }), [source, expenditures, incomes, month])

    useEffect(() => {
        if (!dataRef.current) return
        let chart = echarts.init(dataRef.current!)
        chart.on('updateAxisPointer', function (event: any) {
            const xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                const dimension = xAxisInfo.value + 1;
                chart.setOption({
                    title: {
                        // @ts-ignore
                        // eslint-disable-next-line no-param-reassign
                        text: source[0][dimension] + '\n\n' + source.reduce((pre, curr) => pre += typeof curr[dimension] === 'number' ? curr[dimension] : 0, 0),
                        left: 'center',
                        top: '18%'
                    },
                    series: {
                        id: 'pie',
                        label: { formatter: '{b}: {@[' + dimension + ']} ({d}%)' },
                        encode: { value: dimension, tooltip: dimension }
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
    }, [opts])

    // @ts-ignore
    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current) => {
        const month = current.format('YYYY-M')
        if (current.clone().unix() <= moment().unix() && data[month]) {
            const num = (data[month]?.income - data[month]?.expenditure?.total).toFixed(1) as unknown as number
            return <ul style={{ listStyleType: "none" }}>
                <li><Badge status="success" text={`🤑：${data[month]?.income}`} /></li>
                <li><Badge status="error" text={`😈：${data[month].expenditure.total}`} /></li>
                <li style={{ color: num > 0 ? 'green' : 'red' }}>{num}</li>
            </ul>
        };
        return null
    }

    return <div className="account">
        <br />
        <Space size='large'>
            &nbsp; &nbsp; &nbsp;
            <span>+ {totalIncome}</span>
            <span>- {totalExpenditures}</span>
            <span style={{ color: +totalSurplus > 0 ? 'green' : 'red' }}>{totalSurplus}</span>
        </Space>
        <br />
        <br />
        <Calendar
            mode="year"
            // @ts-ignore
            onChange={setDate}
            cellRender={cellRender}
            onSelect={(v: Moment) => setMonth(v?.month() + 1)}
            disabledDate={(currentDate: Moment) => currentDate.clone().unix() > moment().unix()}
        />
        <br />
        <br />
        <div ref={dataRef} className="statistic" style={{ width: '100%', height: 500 }} />
    </div>
}