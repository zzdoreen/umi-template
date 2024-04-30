
import { ProColumns, ProFormDependency, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useCallback, useMemo, useRef, useState, } from 'react';
import ProTable, { ProFormModal, useProTable } from '@/components/ProTable';
import { callProTableData } from '@/services';
import { getListService, importService, exportService, addService, editService, delService } from '@/services/table';
import { ModalConfirm, UnixTimeRender, getvalueEnumMap } from '@/utils/tools';
import moment from 'moment';
import ImportProcess from '@/components/Common/ImportComponent';
import { ProUploadFile } from '@/components/Common/Upload/ProFormUploadFile';
import { useControllableValue } from 'ahooks';

const TableList: React.FC<unknown> = () => {
  const currentSearchRef = useRef<object>()
  const [selectedArr, setSelectedArr] = useState<string[]>([]);

  const columns = useMemo(() => [
    {
      title: '名称',
      dataIndex: 'deviceId',
      tip: '名称是唯一的 key',
      search: false
    },
    {
      title: '枚举类型',
      dataIndex: 'market',
      valueEnum: getvalueEnumMap([{ label: '类型一', value: 1 }, { label: '类型二', value: 2 }]),
      formItemProps: { rules: [{ required: true }] },
      fieldProps: {
        mode: 'multiple',
      }
    },
    {
      title: '排序',
      dataIndex: 'market',
      search: false,
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true },]
      },
      width: 100,
      fieldProps: { precision: 0, min: 1 }
    },
    {
      title: (_, type,) => type === 'form' ? 'emm form' : 'emm table',
      dataIndex: 'market',
      search: false,
      renderFormItem: () => <ProFormDependency name={['market']}>
        {
          ({ market }) => {
            if (market === 1 || (Array.isArray(market) && market[0] === 1))
              return <ProFormSelect name='type' options={[{ label: '类型一', value: 1 }, { label: '类型二', value: 2 }]} />
            else return <ProFormTextArea name='note' rules={[{ required: true }, { max: 15 }]} />
          }
        }
      </ProFormDependency>
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      render: UnixTimeRender,
      hideInForm: true,
      width: 200,
      valueType: 'dateRange',
      search: {
        transform: (v) => {
          const [start, end] = v
          return {
            startAt: moment(start).startOf('day').unix(),
            endAt: moment(end).endOf('day').unix()
          }
        }
      }
    },
    {
      title: '文件',
      dataIndex: 'file',
      search: false,
      formItemProps: {
        rules: [{ required: true, message: '请上传图片' }]
      },
      renderFormItem: () => <ProUploadFile accept='.png' />,
      renderText: (_) => <Button type='link' target='_blank' href={_}>{_}</Button>
    },
    {
      dataIndex: 'id',
      hideInTable: true,
      search: false,
      formItemProps: { hidden: true }
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_, item) => <>
        <Button type="link" onClick={() => setModal({ visible: true, defaultFormValues: { ...item, file: 'http://xxx.png' }, title: '编辑' })} >编辑</Button>
        <Button type='link' danger onClick={() => onBatchDelete(item?.deviceId)}>删除</Button>
      </>
    },
  ] as ProColumns<any>[], []);

  const { proTableProps, proFormModalProps, setModal, reload, modal } = useProTable({
    columns,
    request: callProTableData(getListService),
  });

  const onSubmit = useCallback((item: any) => {
    const service = modal?.isAdd ? addService(item) : editService(item);
    return service.then(({ code, message: msg }) => {
      if (code === 0) {
        message.success(`${modal?.isAdd ? '新增' : '编辑'}成功`);
        reload(modal?.isAdd);
        setModal({ visible: false });
      } else
        message.error(msg || '操作失败');

    });
  }, [modal?.isAdd]);

  const formColumns: ProColumns<any, "text">[] = useMemo(() => {
    return proFormModalProps.columns.map(e => {
      if (e.dataIndex === 'status') {
        return {
          ...e,
          initialValue: 1,
          valueType: 'radio',
        }
      }
      return e
    })
  }, [proFormModalProps.columns])

  const onBatchDelete = useCallback((id?: string) => {
    ModalConfirm({
      content: id ? '确定删除此数据吗?' : `确定删除选中的${selectedArr?.length}项?`,
      onOk() {
        delService(id ? [id] : selectedArr).then(({ code, message: msg }) => {
          if (code === 0) {
            message.success('删除成功')
            setSelectedArr([])
            reload(true)
          } else message.error(msg || '删除失败')
        })
      }
    })
  }, [selectedArr])

  return <>
    <ProTable {...proTableProps} searchSpan={6} addText="新建" rowKey='deviceId'
      beforeSearchSubmit={v => { currentSearchRef.current = v; return v }}
      extraActions={[<ImportProcess name='导入' template='' key='upload'
        service={importService} reload={reload} accept='.xlsx'
        tootip='仅支持xlsx格式文件，文件小于30MB'
        validator={f => {
          if (f.size > 30 * 1024 * 1024 || !/.xlsx$/.test(f.name)) {
            message.error("仅支持xlsx格式文件，文件小于30MB")
            return false
          }
          return true
        }}
      ><Button type="primary">导入数据</Button></ImportProcess>,
      <Button key='export' type='primary' onClick={() => exportService({ ...currentSearchRef.current })}>导出</Button>,
      <Button key='batchDel' danger disabled={selectedArr.length <= 0} type='primary' onClick={() => onBatchDelete()}>批量删除</Button>
      ]}
      scroll={{ y: 480 }}
      rowSelection={{
        onChange: (v) => setSelectedArr(v as string[]),
        selectedRowKeys: selectedArr,
        getCheckboxProps: () => ({ disabled: false })
      }}
    />
    <ProFormModal {...proFormModalProps} columns={formColumns} onSubmit={onSubmit as any} />
  </>
};

export default TableList;