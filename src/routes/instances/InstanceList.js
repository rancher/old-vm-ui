import React, { PropTypes } from 'react'
import { Button, Modal, Radio, Table } from 'antd'
const confirm = Modal.confirm

function list({ loading, dataSource, deleteInstance, actionInstance }) {
  const handleActionChange = (record, event) => {
    actionInstance(record, event.target.value)
    // confirm({
    //   title: `Are you sure you want to ${event.target.value} vm ${record.metadata.namespace}/${record.metadata.name} ?`,
    //   onOk() {
    //     actionInstance(record, event.target.value)
    //   },
    // })
  }

  const handleDelete = (record) => {
    confirm({
      title: `Are you sure you want to delete vm ${record.metadata.namespace}/${record.metadata.name} ?`,
      onOk() {
        deleteInstance(record)
      },
    })
  }

  const columns = [
    {
      title: 'Namespace',
      dataIndex: 'metadata.namespace',
      key: 'namespace',
    }, {
      title: 'Name',
      dataIndex: 'metadata.name',
      key: 'name',
    }, {
      title: 'Instance ID',
      dataIndex: 'metadata.uid',
      key: 'uid',
    }, {
      title: 'vCPU',
      dataIndex: 'spec.cpus',
      key: 'cpus',
    }, {
      title: 'Memory',
      dataIndex: 'spec.memory_mb',
      key: 'memory',
    }, {
      title: 'Image',
      dataIndex: 'spec.image',
      key: 'image',
    }, {
      title: 'State',
      dataIndex: 'status.state',
      key: 'state',
    }, {
      title: 'Launch Time',
      dataIndex: 'metadata.creationTimestamp',
      key: 'launchTime',
    }, {
      title: 'Actions',
      key: 'action',
      render: (record) => {
        return (
          <div>
            <Radio.Group value={record.spec.action} onChange={e => handleActionChange(record, e)}>
              <Radio.Button value="stop">Stop</Radio.Button>
              <Radio.Button value="start">Start</Radio.Button>
              <Radio.Button value="reboot" disabled>Reboot</Radio.Button>
            </Radio.Group>
            <Button type="danger" value="delete" onClick={e => handleDelete(record, e)}>Delete</Button>
          </div>
        )
      },
    },
    {
      title: 'VNC',
      key: 'vnc',
      render: (record) => {
        if (record.status.state !== 'running') {
          return (
            <Button type="primary" icon="eye-o" disabled></Button>
          )
        }
        return (
          <Button type="primary" icon="eye-o"></Button>
        )
      },
    },
  ]

  const bordered = true
  const pagination = true

  return (
    <div>
      <Table
        bordered={bordered}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        simple
        size="middle"
        pagination={pagination}
        rowKey={record => record.metadata.name}
      />
    </div>
  )
}

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  deleteInstance: PropTypes.func,
  actionInstance: PropTypes.func,
}

export default list
