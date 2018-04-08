import React, { PropTypes } from 'react'
import { Table } from 'antd'

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
        title: 'Internal IP',
        dataIndex: 'status.addresses[0].address',
        key: 'internalIP',
        width: 120,
      },
      {
        title: 'Hostname',
        dataIndex: 'status.addresses[1].address',
        key: 'hostname',
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
        width: 120,
      },
      {
        title: 'Pods',
        dataIndex: 'status.capacity.pods',
        key: 'podCapacity',
        width: 60,
      },
      {
        title: 'Out Of Disk',
        dataIndex: 'status.conditions[0].status',
        key: 'outOfDisk',
        width: 90,
      },
      {
        title: 'Memory Pressure',
        dataIndex: 'status.conditions[1].status',
        key: 'memoryPressure',
        width: 120,
      },
      {
        title: 'Disk Pressure',
        dataIndex: 'status.conditions[2].status',
        key: 'diskPressure',
        width: 100,
      },
      {
        title: 'Ready',
        dataIndex: 'status.conditions[3].status',
        key: 'ready',
        fixed: 'right',
        width: 80,
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
          size="middle"
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
  loading: PropTypes.func,
}

export default Hosts
