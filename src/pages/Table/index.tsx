
import { ProColumns } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useCallback, useMemo, } from 'react';
import ProTable, { ProFormModal, useProTable } from '@/components/ProTable';
import { callProTableData } from '@/services';
import { getListService } from '@/services/table';
import { getvalueEnumMap } from '@/utils/tools';

const TableList: React.FC<unknown> = () => {


  const columns = useMemo(() => [
    {
      title: '名称',
      dataIndex: 'deviceId',
      tip: '名称是唯一的 key',
      search: false
    },
    {
      title: '枚举类型',
      dataIndex: 'type',
      // valueEnum: getvalueEnumMap(EnumTypeOpts),
      formItemProps: { rules: [{ required: true, message: '请选择${label}' }] }
    },
    {
      title: '枚举名称',
      dataIndex: 'name',
      formItemProps: {
        rules: [{ required: true }, { max: 15 }]
      }
    },

    {
      title: '排序',
      dataIndex: 'order',
      search: false,
      valueType: 'digit',
      formItemProps: {
        rules: [{ required: true },]
      },
      width: 100,
      fieldProps: { precision: 0, min: 1 }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: getvalueEnumMap([{ label: '正常', value: 1 }, { label: '异常', value: 2 }]),
      formItemProps: { rules: [{ required: true }] }
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      // renderText: UnixTimeRender,
      hideInForm: true,
      width: 200,
      search: false
    },
    {
      title: '操作人',
      dataIndex: 'operator',
      search: false,
      width: 150,
      hideInForm: true
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
      width: 100,
      render: (_, item) => <Button type="link" onClick={() => setModal({ visible: true, defaultFormValues: item, title: '编辑' })} >编辑</Button>
    },
  ] as ProColumns<any>[], []);

  const onSubmit = useCallback((item: any) => {
    console.log(item)
    // const isAdd = item.id === undefined;
    // const service = isAdd
    //   ? addBasicSettingEnumService({ ...item })
    //   : editBasicSettingEnumService(item);
    // return service.then(({ code, message: msg }) => {
    //   if (code === 0) {
    //     message.success(`${isAdd ? '新增' : '编辑'}成功`);
    //     reload(isAdd);
    //     setModal({ visible: false });
    //   } else {
    //     message.error(msg || '操作失败');
    //   }
    // });
  }, []);

  const { proTableProps, proFormModalProps, setModal, reload } = useProTable({
    columns,
    request: callProTableData(getListService),
  });

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



  return <>
    <ProTable {...proTableProps} searchSpan={4} addText="新建" />
    <ProFormModal {...proFormModalProps} columns={formColumns} onSubmit={onSubmit as any} />
  </>
};

export default TableList;
