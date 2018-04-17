import React, { PropTypes } from 'react'
import { Button, Modal, Slider, InputNumber, Row, Col, Checkbox, Input, Menu, Dropdown, Select, Tooltip } from 'antd'
const SubMenu = Menu.SubMenu
const Option = Select.Option

const memoryMarks = {
  256: '',
  512: '',
  1024: '',
  2048: '',
  4096: '',
  8192: '',
}

class InstanceCreate extends React.Component {
  state = {
    visible: false,
    confirmLoading: false,
    namespace: 'default',
    name: '',
    cpus: 1,
    memory: 512,
    image: 'ubuntu:16.04.4-server-amd64',
    start: true,
    novnc: false,
    publicKeys: [],
  }
  onNameChange = (e) => {
    const { value } = e.target
    this.setState({
      name: value,
    })
  }
  onCpusChange = (value) => {
    this.setState({
      cpus: value,
    })
  }
  onMemoryChange = (value) => {
    this.setState({
      memory: value,
    })
  }
  onImageSelected = (e) => {
    const { key } = e
    this.setState({
      image: key,
    })
  }
  onActionChange = (e) => {
    this.setState({
      start: e.target.checked,
    })
  }
  onNovncChange = (e) => {
    this.setState({
      novnc: e.target.checked,
    })
  }
  onPublicKeyChange = (values) => {
    this.setState({
      publicKeys: values,
    })
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
    if (this.state.start === true) {
      this.state.action = 'start'
    } else {
      this.state.action = 'stop'
    }
    this.props.createInstance({
      namespace: this.state.namespace,
      name: this.state.name,
      cpus: this.state.cpus,
      memory: this.state.memory,
      image: this.state.image,
      action: this.state.action,
      pubkey: this.state.publicKeys,
      novnc: this.state.novnc,
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
    const { visible, confirmLoading, cpus, memory, image } = this.state
    // TODO: Image data should come from backend. Consider supporting volumes
    // from base images and VM images in the near future
    const menu = (
      <Menu onSelect={this.onImageSelected} style={{ width: '100px' }}>
        <SubMenu title="Ubuntu">
          <Menu.Item key="ubuntu:16.04.4-desktop-amd64">16.04 LTS Desktop</Menu.Item>
          <Menu.Item key="ubuntu:16.04.4-server-amd64">16.04 LTS Server</Menu.Item>
        </SubMenu>
        <SubMenu title="CentOS">
          <Menu.Item key="centos:7-x86_64-minimal-1708">7 Minimal (Build 1708)</Menu.Item>
        </SubMenu>
        <SubMenu title="Fedora">
          <Menu.Item key="fedora:Atomic-27-20180326.1.x86_64">27 Atomic</Menu.Item>
          <Menu.Item key="fedora:27-1.6.x86_64">27 Server</Menu.Item>
        </SubMenu>
      </Menu>
    )

    const credentials = []
    const { credentialData } = this.props
    for (let i = 0; i < credentialData.length; i++) {
      const { name } = credentialData[i].metadata
      credentials.push(<Option key={name}>{name}</Option>)
    }

    return (
      <div>
        <Button type="primary" onClick={this.showModal} style={{ marginBottom: 5 }}>Create Instance</Button>
        <Modal title="Create Instance"
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
              <Input placeholder="Name" onChange={this.onNameChange} style={{ marginBottom: 5 }} />
            </Col>
          </Row>
          <Row>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>vCPUs</p>
            </Col>
            <Col span={12}>
              <Slider min={1} max={32} onChange={this.onCpusChange} value={cpus} />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={32}
                style={{ marginLeft: 16 }}
                value={cpus}
                onChange={this.onCpusChange}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>MiB Memory</p>
            </Col>
            <Col span={12}>
              <Slider min={256} max={8192} marks={memoryMarks} step={null} onChange={this.onMemoryChange} value={memory} />
            </Col>
            <Col span={4}>
              <InputNumber
                min={256}
                max={8192}
                style={{ marginLeft: 16 }}
                value={memory}
                onChange={this.onMemoryChange}
              />
            </Col>
          </Row>
          <Row>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>Base Image</p>
            </Col>
            <Col span={17}>
              <Dropdown.Button overlay={menu}>
                {image}
              </Dropdown.Button>
            </Col>
          </Row>
          <Row>
            <Col span={4} style={{ marginLeft: 24, marginTop: 10 }}>
              <p>Public Keys</p>
            </Col>
            <Col span={16}>
              <Select
                mode="multiple"
                style={{ width: '100%', marginTop: 5 }}
                placeholder="Please select"
                onChange={this.onPublicKeyChange}
              >
                {credentials}
              </Select>
            </Col>
          </Row>
          <Row>
            <Checkbox defaultChecked onChange={this.onActionChange} style={{ marginTop: 16 }}>Start Instance Immediately</Checkbox>
          </Row>
          <Row>
            <Tooltip title="Recommended for Desktop Images only">
              <Checkbox onChange={this.onNovncChange} style={{ marginTop: 16 }}>Enable NoVNC</Checkbox>
            </Tooltip>
          </Row>
        </Modal>
      </div>
    )
  }
}

InstanceCreate.propTypes = {
  credentialData: PropTypes.array,
  createInstance: PropTypes.func,
}

export default InstanceCreate
