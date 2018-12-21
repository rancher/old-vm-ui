import React, { PropTypes } from 'react'
import { Button, Table, Icon, Tooltip } from 'antd'
import styles from './MachineImageList.less'

class MachineImageList extends React.Component {
  state = {}

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'metadata.name',
        key: 'name',
        width: 300,
        fixed: 'left',
      }, {
        title: 'Size GiB',
        dataIndex: 'spec.size_gib',
        key: 'size',
        width: 70,
        fixed: 'left',
      }, {
        title: 'Docker Image',
        dataIndex: 'spec.docker_image',
        key: 'image',
        width: 400,
        fixed: 'left',
      }, {
        title: 'State',
        dataIndex: 'status.state',
        key: 'state',
        width: 120,
        fixed: 'left',
        className: styles['status-snapshot'],
        render: (value) => {
          let text
          let loading = true
          switch (value) {
            case 'ready':
              loading = false
              text = value.substring(0, 1).toUpperCase() + value.substring(1)
              break
            default:
              text = value.substring(0, 1).toUpperCase() + value.substring(1)
          }
          if (loading) {
            const loadingIcon = (<Icon key="loading" type="loading" />)
            return {
              children: [loadingIcon, text],
              props: {
                className: styles[`status-${value}`],
              },
            }
          }
          return {
            children: text,
            props: {
              className: styles[`status-${value}`],
            },
          }
        },
      }, {
        title: 'Provisioned Nodes',
        dataIndex: 'status.nodes',
        key: 'nodes',
        render: (nodes) => {
          if (nodes == null) {
            return null
          }
          return (<div>{
            nodes.map((entry) =>
              <Tooltip title={entry} key={entry}><Button type="primary" shape="circle" icon="laptop" size="small" /></Tooltip>
            )
          }</div>)
        },
      },
    ]
    const bordered = true
    const { loading, dataSource, dispatch, selectedKeys } = this.props
    const rowSelection = {
      hideDefaultSelections: true,
      onChange: (selected) => {
        dispatch({
          type: 'machineimages/updateSelectedKeys',
          selectedKeys: selected,
        })
      },
      selectedRowKeys: selectedKeys,
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

MachineImageList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  dispatch: PropTypes.func,
  selectedKeys: PropTypes.array,
}

export default MachineImageList
