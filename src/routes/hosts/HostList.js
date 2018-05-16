import React, { PropTypes } from 'react'
import { Table } from 'antd'
import styles from './HostList.less'

class Hosts extends React.Component {
  state = {}

  render() {
    // const { } = this.state
    const columns = [
      {
        title: 'Name',
        dataIndex: 'metadata.name',
        key: 'name',
        width: 150,
        align: 'left',
        fixed: 'left',
      },
      {
        title: 'CPUs',
        dataIndex: 'status.allocatable.cpu',
        key: 'cpuAllocable',
        width: 50,
      },
      {
        title: 'Memory',
        dataIndex: 'status.allocatable.memory',
        key: 'memAllocable',
        width: 90,
      },
      {
        title: 'Pods',
        dataIndex: 'status.capacity.pods',
        key: 'podCapacity',
        width: 60,
      },
      {
        title: 'Private IP',
        dataIndex: 'status.addresses[0].address',
        key: 'privateIP',
        width: 110,
      },
      {
        title: 'Hostname',
        dataIndex: 'status.addresses[1].address',
        key: 'hostname',
      },
      {
        title: 'Out Of Disk',
        dataIndex: 'status.conditions[0].status',
        key: 'outOfDisk',
        fixed: 'right',
        width: 90,
        render: (value) => {
          let targetClass = styles['status-bad']
          if (value === 'False') {
            targetClass = styles['status-good']
          }
          const obj = {
            children: value,
            props: {
              className: targetClass,
            },
          }
          return obj
        },
      },
      {
        title: 'Memory Pressure',
        dataIndex: 'status.conditions[1].status',
        key: 'memoryPressure',
        fixed: 'right',
        width: 120,
        render: (value) => {
          let targetClass = styles['status-bad']
          if (value === 'False') {
            targetClass = styles['status-good']
          }
          const obj = {
            children: value,
            props: {
              className: targetClass,
            },
          }
          return obj
        },
      },
      {
        title: 'Disk Pressure',
        dataIndex: 'status.conditions[2].status',
        key: 'diskPressure',
        fixed: 'right',
        width: 100,
        render: (value) => {
          let targetClass = styles['status-bad']
          if (value === 'False') {
            targetClass = styles['status-good']
          }
          const obj = {
            children: value,
            props: {
              className: targetClass,
            },
          }
          return obj
        },
      },
      {
        title: 'PID Pressure',
        dataIndex: 'status.conditions[3].status',
        key: 'pidPressure',
        fixed: 'right',
        width: 100,
        render: (value) => {
          let targetClass = styles['status-bad']
          if (value === 'False') {
            targetClass = styles['status-good']
          }
          const obj = {
            children: value,
            props: {
              className: targetClass,
            },
          }
          return obj
        },
      },
      {
        title: 'Ready',
        dataIndex: 'status.conditions[4].status',
        key: 'ready',
        fixed: 'right',
        width: 60,
        className: styles['status-bad'],
        render: (value) => {
          let targetClass = styles['status-bad']
          if (value === 'True') {
            targetClass = styles['status-good']
          }
          const obj = {
            children: value,
            props: {
              className: targetClass,
            },
          }
          return obj
        },
      },
    ]

    const { dataSource, loading } = this.props
    return (
      <div>
        <Table
          bordered
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          size="small"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 1200, y: 500 }}
          rowKey={record => record.metadata.name}
        />
      </div>
    )
  }
}

Hosts.propTypes = {
  dataSource: PropTypes.array,
  loading: PropTypes.bool,
}

export default Hosts
