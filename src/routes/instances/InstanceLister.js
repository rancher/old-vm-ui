import React, { PropTypes } from 'react'
import { Button, Radio, Table } from 'antd'
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
        title: 'Node Name',
        dataIndex: 'status.node_name',
        key: 'nodeName',
        width: 120,
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
        width: 190,
        fixed: 'right',
        render: (record) => {
          return (
            <div>
              <Radio.Group value={record.spec.action} size="small" onChange={e => this.handleActionChange(record, e)} disabled={record.status.state === 'migrating'}>
                <Radio.Button value="stop">Stop</Radio.Button>
                <Radio.Button value="start">Start</Radio.Button>
                <Radio.Button value="migrate" disabled={record.status.state !== 'running'}>Migrate</Radio.Button>
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
    const { loading, dataSource, onSelectChange, selectedRowKeys } = this.props
    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
      hideDefaultSelections: true,
    }

    return (
      <div>
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
  onSelectChange: PropTypes.func,
  selectedRowKeys: PropTypes.array,
}

export default InstanceLister
