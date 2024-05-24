import { Button } from "antd";
import PizZip from 'pizzip'
import Docxtemplater from "docxtemplater";
import { saveAs } from 'file-saver';
import './index.less'

export default function Export() {

    const data = {
        title: '我是标题',
        array: [
            { name: 'chuya', age: 29, sex: '女' },
            { name: 'zhengxie', age: 22, sex: '男' },
            { name: 'zhexian', age: 10, sex: '女' },
        ],
        list: ['苹果', '西瓜', '香蕉'],
        person: {
            name: 'person name ',
            sex: 'person sex ',
        },
        isTrue: true,
        isFalse: false
    }

    async function handleExport() {
        await fetch('./template.docx')
            .then(res => res.arrayBuffer())
            .then(response => {
                const zip = new PizZip(response)
                const docx = new Docxtemplater(zip)

                try {
                    docx.setData(data)
                    docx.render()
                } catch (error: any) {
                    // 处理渲染过程中的错误（例如，占位符未找到）  
                    const e = {
                        message: error.message,
                        name: error.name,
                        stack: error.stack,
                        properties: error.properties,
                    };
                    console.log(JSON.stringify({ error: e }));
                    throw error;
                }

                try {
                    const out = docx.getZip().generate({ type: 'blob' })
                    saveAs(out, 'output.docx')
                } catch (error) {
                    console.log(error)
                }
            })
    }

    return <div className="export-container">
        <Button type="primary" onClick={handleExport}>导出</Button>
        <div className="raw">
            raw:
            <br />
            <br />
            {JSON.stringify(data)}
        </div>
    </div>
}