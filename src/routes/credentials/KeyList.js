import React, { PropTypes } from 'react'
import { Button, Modal, Table } from 'antd'
const confirm = Modal.confirm

const columns = [
  {
    title: 'Name',
    dataIndex: 'metadata.name',
    key: 'name',
    width: 150,
    fixed: 'left',
  }, {
    title: 'Public Key',
    dataIndex: 'spec.public_key',
    key: 'pubkey',
  }, {
    title: 'Create Time',
    dataIndex: 'metadata.creationTimestamp',
    key: 'createTime',
    width: 150,
    fixed: 'right',
  },
]

class KeyList extends React.Component {
  state = {
    selectedRowKeys: [],
    noRowSelected: true,
    deleteInProgress: false,
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys, noRowSelected: selectedRowKeys.length === 0 })
  }
  onClickDelete = () => {
    const { selectedRowKeys } = this.state
    this.handleDeletes(selectedRowKeys)
  }
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
  handleDeletes = (names) => {
    const x = this
    confirm({
      title: `Are you sure you want to delete credentials ${names} ?`,
      onOk() {
        x.setState({ deleteInProgress: true })
        for (let name of names) {
          x.props.deleteCredential(name)
        }
        x.sleep(1000).then(() => {
          x.setState({ deleteInProgress: false })
          x.forceUpdate()
        })
      },
    })
  }
  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      onSelection: this.onSelection,
    }

    const { loading, dataSource } = this.props
    const { noRowSelected, deleteInProgress } = this.state
    return (
      <div>
        <Button
          type="danger"
          onClick={this.onClickDelete}
          loading={deleteInProgress}
          disabled={noRowSelected}
        >
        Delete</Button>
        <Table
          bordered
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

KeyList.propTypes = {
  loading: PropTypes.bool,
  dataSource: PropTypes.array,
  deleteCredential: PropTypes.func,
}

export default KeyList
