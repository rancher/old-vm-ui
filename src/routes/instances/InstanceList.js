import React, { PropTypes } from 'react'
import { Table } from 'antd'
import styles from './InstanceList.less'

function list({ loading, dataSource }) {
  const columns = [
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      width: 100,
      className: styles.status,
      render: () => {
        return (
          <div>Activate</div>
        )
      },
    }, {
      title: 'Name',
      dataIndex: 'metadata.name',
      key: 'name',
    }, {
      title: 'Image',
      dataIndex: 'spec.image',
      key: 'image',
    }, {
      title: 'vCPU',
      dataIndex: 'spec.cpus',
      key: 'cpus',
    }, {
      title: 'Memory',
      dataIndex: 'spec.memory_mb',
      key: 'memory',
    },
  ]

  const pagination = false

  return (
    <div>
      <Table
        bordered={false}
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
