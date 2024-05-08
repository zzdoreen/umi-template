// 引入柱状图图表，图表后缀都为 Chart
import { useSize } from 'ahooks';
import { BarChart, LineChart, LinesChart, PieChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import {
    AxisPointerComponent, DatasetComponent, DataZoomInsideComponent, MarkAreaComponent,
    GridComponent, LegendComponent, TitleComponent, TooltipComponent, MarkLineComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
import { RefObject, useEffect } from 'react';

// 注册必须的组件
echarts.use([
    LineChart, LinesChart, PieChart, BarChart,
    TitleComponent, TooltipComponent, GridComponent, LegendComponent,
    AxisPointerComponent, DataZoomInsideComponent, DatasetComponent,
    CanvasRenderer, MarkAreaComponent, MarkLineComponent,
]);

export function useEchartsAutoResize(ref: RefObject<HTMLElement>) {
    const size = useSize(ref)
    useEffect(() => {
        if (!ref.current) return
        echarts.getInstanceByDom(ref.current!)?.resize()
    }, [size]);
}
export default echarts