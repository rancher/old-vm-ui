import React, { PropTypes } from 'react'
import { Button, Modal, Radio, Table } from 'antd'
const confirm = Modal.confirm

function list({ loading, dataSource, deleteInstance, actionInstance }) {
  const handleActionChange = (record, event) => {
    actionInstance(record, event.target.value)
  }

  const handleDelete = (record) => {
    confirm({
      title: `Are you sure you want to delete vm ${record.metadata.namespace}/${record.metadata.name} ?`,
      onOk() {
        deleteInstance(record)
      },
    })
  }

  const handleVnc = (record) => {
    let url = `${record.status.vnc_endpoint}?autoconnect=true`
    window.open(url)
  }

  const columns = [
    {
      title: 'Namespace',
      dataIndex: 'metadata.namespace',
      key: 'namespace',
      width: 90,
      fixed: 'left',
    }, {
      title: 'Name',
      dataIndex: 'metadata.name',
      key: 'name',
      width: 150,
      align: 'left',
      fixed: 'left',
    }, {
      title: 'Instance ID',
      dataIndex: 'status.id',
      key: 'id',
      width: 90,
    }, {
      title: 'vCPU',
      dataIndex: 'spec.cpus',
      key: 'cpus',
      width: 50,
    }, {
      title: 'Memory',
      dataIndex: 'spec.memory_mb',
      key: 'memory',
      width: 80,
    }, {
      title: 'Image',
      dataIndex: 'spec.image',
      key: 'image',
      width: 100,
    }, {
      title: 'Launch Time',
      dataIndex: 'metadata.creationTimestamp',
      key: 'launchTime',
    }, {
      title: 'State',
      dataIndex: 'status.state',
      key: 'state',
      width: 100,
      fixed: 'right',
    }, {
      title: 'Actions',
      key: 'action',
      width: 220,
      fixed: 'right',
      render: (record) => {
        return (
          <div>
            <Radio.Group value={record.spec.action} onChange={e => handleActionChange(record, e)}>
              <Radio.Button value="stop">Stop</Radio.Button>
              <Radio.Button value="start">Start</Radio.Button>
              <Radio.Button value="reboot" disabled>Reboot</Radio.Button>
            </Radio.Group>
          </div>
        )
      },
    },
    {
      title: 'Terminate',
      key: 'terminate',
      width: 90,
      fixed: 'right',
      render: (record) => {
        return (
          <Button type="danger" value="delete" onClick={e => handleDelete(record, e)}>Delete</Button>
        )
      },
    },
    {
      title: 'VNC',
      key: 'vnc',
      width: 50,
      fixed: 'right',
      render: (record) => {
        if (record.status.state !== 'running') {
          return (
            <Button type="primary" icon="eye-o" disabled></Button>
          )
        }
        return (
          <Button type="primary" icon="eye-o" onClick={e => handleVnc(record, e)}></Button>
        )
      },
    },
  ]

  const bordered = true

  return (
    <div>
      <Table
        bordered={bordered}
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        simple
        size="middle"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200, y: 500 }}
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
