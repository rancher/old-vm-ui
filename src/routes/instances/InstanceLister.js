import React, { PropTypes } from 'react'
import { Button, Modal, Radio, Table } from 'antd'
const confirm = Modal.confirm
import styles from './InstanceLister.less'

class InstanceLister extends React.Component {

  state = {}
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
  delayedUpdate = (delay) => {
    return this.sleep(delay).then(() => {
      this.forceUpdate()
    })
  }
  handleActionChange = (record, event) => {
    this.props.actionInstance(record, event.target.value)
    this.delayedUpdate(1000)
  }
  handleDelete = (record) => {
    const x = this
    confirm({
      title: `Are you sure you want to delete vm ${record.metadata.namespace}/${record.metadata.name} ?`,
      onOk() {
        x.props.deleteInstance(record)
        x.delayedUpdate(1000)
      },
    })
  }
  handleVnc = (record) => {
    let url = `http://${record.status.vnc_endpoint}?autoconnect=true`
    window.open(url)
  }
  render() {
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
        title: 'Private IP',
        dataIndex: 'status.ip',
        key: 'ip',
        width: 120,
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
        title: 'Base Image',
        dataIndex: 'spec.image',
        key: 'image',
        // width: 200,
      }, {
        title: 'Launch Time',
        dataIndex: 'metadata.creationTimestamp',
        key: 'launchTime',
        width: 150,
      }, {
        title: 'State',
        dataIndex: 'status.state',
        key: 'state',
        width: 70,
        className: styles['status-pending'],
        fixed: 'right',
        render: (value) => {
          const obj = {
            children: value,
            props: {
              className: styles[`status-${value}`],
            },
          }
          return obj
        },
      }, {
        title: 'Actions',
        key: 'action',
        width: 185,
        fixed: 'right',
        render: (record) => {
          return (
            <div>
              <Radio.Group value={record.spec.action} size="small" onChange={e => this.handleActionChange(record, e)}>
                <Radio.Button value="stop">Stop</Radio.Button>
                <Radio.Button value="start">Start</Radio.Button>
                <Radio.Button value="reboot" disabled>Reboot</Radio.Button>
              </Radio.Group>
            </div>
          )
        },
      },
      {
        title: 'VNC',
        key: 'vnc',
        width: 45,
        fixed: 'right',
        render: (record) => {
          if (record.status.state !== 'running') {
            return (
              <Button type="primary" icon="eye-o" size="small" disabled></Button>
            )
          }
          return (
            <Button type="primary" icon="eye-o" size="small" onClick={e => this.handleVnc(record, e)}></Button>
          )
        },
      },
      {
        title: 'Terminate',
        key: 'terminate',
        width: 75,
        fixed: 'right',
        render: (record) => {
          return (
            <Button type="danger" value="delete" size="small" onClick={e => this.handleDelete(record, e)}>Delete</Button>
          )
        },
      },
    ]

    const bordered = true
    const { loading, dataSource } = this.props

    return (
      <div>
        <Table
          bordered={bordered}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          simple
          size="small"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200, y: 500 }}
          rowKey={record => record.metadata.name}
        />
      </div>
    )
  }
}

InstanceLister.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  deleteInstance: PropTypes.func,
  actionInstance: PropTypes.func,
}

export default InstanceLister
