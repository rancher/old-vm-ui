import React, { PropTypes } from 'react'
import { Button, Modal, Table, Row, Col, Input } from 'antd'
const confirm = Modal.confirm

const columns = [
  {
    title: 'Name',
    dataIndex: 'metadata.name',
    key: 'name',
    width: 200,
    fixed: 'left',
  }, {
    title: 'Public Key',
    dataIndex: 'spec.public_key',
    key: 'pubkey',
    render: (pubkey) => {
      let parts = pubkey.split(' ')
      return `${parts[0]} ${parts[1].substring(0, 16)}...${parts[1].substring(parts[1].length - 16)}`
    },
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

    visible: false,
    confirmLoading: false,
    name: '',
    publicKey: '',
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys, noRowSelected: selectedRowKeys.length === 0 })
  }
  onClickDelete = () => {
    const { selectedRowKeys } = this.state
    this.handleDeletes(selectedRowKeys)
  }
  onNameChange = (e) => {
    const { value } = e.target
    this.setState({
      name: value,
    })
  }
  onPublicKeyChange = (e) => {
    const { value } = e.target
    this.setState({
      publicKey: value,
    })
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
  sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    const timeout = setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 3000)
    this.setState({
      confirmLoading: true,
    })
    this.props.createCredential({
      name: this.state.name,
      pubkey: this.state.publicKey,
    })
    clearTimeout(timeout)
    this.setState({
      visible: false,
      confirmLoading: false,
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
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
    const { visible, confirmLoading, name, publicKey } = this.state
    return (
      <div>
        <Modal title="Create Key"
          wrapClassName="vertical-center-modal"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <Row>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>Name</p>
            </Col>
            <Col span={16}>
              <Input placeholder="Name" onChange={this.onNameChange} value={name} style={{ marginBottom: 5 }} />
            </Col>
          </Row>
          <Row>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>Public Key</p>
            </Col>
            <Col span={16}>
              <Input placeholder="ssh-rsa AAAAB3Nz..." onChange={this.onPublicKeyChange} value={publicKey} />
            </Col>
          </Row>
        </Modal>
        <Button
          type="primary"
          onClick={this.showModal}
          style={{ marginBottom: 5 }}
        >
        Create</Button>
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
  createCredential: PropTypes.func,
}

export default KeyList
