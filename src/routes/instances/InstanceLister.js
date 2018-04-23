import React, { PropTypes } from 'react'
import { Button, Modal, Radio, Table } from 'antd'
const ButtonGroup = Button.Group
const confirm = Modal.confirm
import styles from './InstanceLister.less'

class InstanceLister extends React.Component {
  state = {
    selectedRowKeys: [],
    noRowSelected: true,
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys, noRowSelected: selectedRowKeys.length === 0 })
  }

  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
  delayedUpdate = (delay) => {
    return this.sleep(delay).then(() => {
      this.forceUpdate()
    })
  }
  startInstances = () => {
    this.actionInstances('start')
  }
  stopInstances = () => {
    this.actionInstances('stop')
  }
  actionInstances = (action) => {
    const { selectedRowKeys, noRowSelected } = this.state
    if (noRowSelected) { return }

    const { actionInstance, dataSource } = this.props
    confirm({
      title: `Are you sure you want to ${action} vms ${selectedRowKeys}?`,
      onOk() {
        for (let i = 0; i < selectedRowKeys.length; i++) {
          const rowKey = selectedRowKeys[i]

          // find matching entry in dataSource
          let row = null
          for (let j = 0; j < dataSource.length; j++) {
            if (dataSource[j].metadata.name === rowKey) {
              row = dataSource[j]
              break
            }
          }

          // send a request iff action changed
          if (row !== null && row.spec.action !== action) {
            actionInstance(row.metadata.name, action)
          }
        }
      },
    })
  }

  deleteInstances = () => {
    const { selectedRowKeys, noRowSelected } = this.state
    if (noRowSelected) { return }

    const x = this
    const { deleteInstance } = this.props
    confirm({
      title: `Are you sure you want to delete vms ${selectedRowKeys}?`,
      onOk() {
        for (let i = 0; i < selectedRowKeys.length; i++) {
          const name = selectedRowKeys[i]
          deleteInstance({ name })
        }
        // x.onSelectChange([])
        x.forceUpdate()
      },
    })
  }
  handleActionChange = (record, event) => {
    const { name } = record.metadata
    const { value } = event.target
    this.props.actionInstance(name, value)
    this.delayedUpdate(1000)
  }
  handleVnc = (record) => {
    let url = `http://${record.status.vnc_endpoint}?autoconnect=true`
    window.open(url)
  }
  render() {
    const columns = [
      {
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
        title: 'Credentials',
        dataIndex: 'spec.public_keys',
        key: 'publicKeys',
        width: 100,
        render: (value) => {
          let out = ''
          for (let i = 0; i < value.length; i++) {
            if (i > 0) {
              out += ', '
            }
            out += value[i]
          }
          return out
        },
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
        width: 80,
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
        width: 120,
        fixed: 'right',
        render: (record) => {
          return (
            <div>
              <Radio.Group value={record.spec.action} size="small" onChange={e => this.handleActionChange(record, e)}>
                <Radio.Button value="stop">Stop</Radio.Button>
                <Radio.Button value="start">Start</Radio.Button>
              </Radio.Group>
            </div>
          )
        },
      },
      {
        title: 'VNC',
        key: 'vnc',
        width: 50,
        fixed: 'right',
        render: (record) => {
          if (record.status.state !== 'running' || record.spec.hosted_novnc === false || record.status.vnc_endpoint === '') {
            return (
              <Button type="primary" icon="eye-o" size="small" disabled></Button>
            )
          }
          return (
            <Button type="primary" icon="eye-o" size="small" onClick={e => this.handleVnc(record, e)}></Button>
          )
        },
      },
    ]

    const bordered = true
    const { loading, dataSource } = this.props
    const { selectedRowKeys, noRowSelected } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
    }

    return (
      <div>
        <ButtonGroup style={{ marginBottom: 5, marginRight: 5 }}>
          <Button type="default" onClick={this.stopInstances} disabled={noRowSelected}>Stop</Button>
          <Button type="default" onClick={this.startInstances} disabled={noRowSelected}>Start</Button>
        </ButtonGroup>
        <Button type="danger" onClick={this.deleteInstances} style={{ marginBottom: 5 }} disabled={noRowSelected}>Delete</Button>
        <Table
          bordered={bordered}
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowSelection={rowSelection}
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
