import React, { PropTypes } from 'react'
import { Button, Modal, Radio, Table } from 'antd'
const confirm = Modal.confirm

function list({ loading, dataSource }) {
  const handleActionChange = (record, event) => {
    confirm({
      title: `Unimplemented: ${event.target.value}`,
    })
    switch (event.target.value) {
      // TODO make service calls
      case 'start':
      case 'stop':
      case 'reboot':
      default:
    }
  }

  const handleDelete = (record) => {
    confirm({
      title: `Are you sure you want to delete vm ${record.metadata.namespace}/${record.metadata.name} ?`,
      onOk() {
        confirm({
          title: 'Unimplemented',
        })
      },
    })
  }

  const columns = [
    {
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
              <Radio.Button value="reboot">Reboot</Radio.Button>
            </Radio.Group>
            <Button type="danger" value="delete" onClick={e => handleDelete(record, e)}>Delete</Button>
          </div>
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
        pagination={pagination}
        rowKey={record => record.metadata.name}
      />
    </div>
  )
}

list.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
}

export default list
