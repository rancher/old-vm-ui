import React, { PropTypes } from 'react'
import { Button, Radio, Table, Menu, Dropdown, Icon } from 'antd'
import styles from './InstanceLister.less'

class InstanceLister extends React.Component {
  state = {}

  onNodeSelected = (record, e) => {
    record.spec.node_name = e.key === 'any' ? '' : e.key
    this.props.updateInstance(record)
  }
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
    let url = `http://${record.status.vnc_endpoint}?autoconnect=true&reconnect=true&reconnect_delay=5000&resize=scale`
    window.open(url)
  }
  render() {
    const hosts = []
    const { hostData } = this.props
    for (let i = 0; i < hostData.length; i++) {
      const { name } = hostData[i].metadata
      hosts.push(<Menu.Item key={name}>{name}</Menu.Item>)
    }
    hosts.push(<Menu.Divider />)
    hosts.push(<Menu.Item key="any">any</Menu.Item>)

    const columns = [
      {
        title: 'Name',
        dataIndex: 'metadata.name',
        key: 'name',
        width: 200,
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
        title: 'Keys',
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
        title: 'Machine Image',
        dataIndex: 'spec.image',
        key: 'image',
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
        title: 'Node Name',
        key: 'nodeName',
        width: 200,
        fixed: 'right',
        render: (record) => {
          const { onNodeSelected } = this
          const menu = (
            <Menu
              onSelect={e => onNodeSelected(record, e)}
              selectedKeys={[record.spec.node_name === '' ? 'any' : record.spec.node_name]}
            >
              {hosts}
            </Menu>
          )

          return (
            <div>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link">
                  {record.spec.node_name === '' ? 'any' : record.spec.node_name} <Icon type="down" />
                </a>
              </Dropdown>
              ({record.status.node_name})
            </div>
          )
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
                <Radio.Button value="stop" disabled={record.spec.action === 'stop'}>Stop</Radio.Button>
                <Radio.Button value="start" disabled={record.spec.action === 'start'}>Start</Radio.Button>
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
          return (
            <Button type="primary" icon="eye-o" size="small"
              onClick={e => this.handleVnc(record, e)}
              disabled={(record.status.state !== 'running' && record.status.state !== 'migrating') || record.spec.hosted_novnc === false || record.status.vnc_endpoint === ''}></Button>
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
  hostData: PropTypes.array,
  updateInstance: PropTypes.func,
}

export default InstanceLister
