import React, { PropTypes } from 'react'
import { Table } from 'antd'
import styles from './InstanceList.less'

function list({ loading, dataSource }) {
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
      dataIndex: 'state',
      key: 'state',
      width: 100,
      className: styles.status,
      render: () => {
        return (
          <div>Activate</div>
        )
      },
    },
  ]

  const pagination = true

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
