import { BarChart, DatasetChart, LineChart, PieChart } from './components'
import './index.less'

export default function Echarts() {

    return <div className="container">
        <LineChart />
        <BarChart />
        <PieChart />
        <DatasetChart />
    </div>
}