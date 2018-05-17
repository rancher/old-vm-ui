import React, { PropTypes } from 'react'
import { Modal, Slider, InputNumber, Row, Col, Checkbox, Input, Menu, Dropdown, Select, Tooltip } from 'antd'
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

class CreateInstance extends React.Component {
  state = {
    confirmLoading: false,
    name: '',
    cpus: 1,
    memory: 512,
    instanceCount: 1,
    image: 'ubuntu:16.04.4-server-amd64',
    start: true,
    novnc: false,
    publicKeys: [],
    nodeName: '',
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
  onInstanceCountChange = (value) => {
    this.setState({
      instanceCount: value,
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
  onNodeNameChange = (value) => {
    this.setState({
      nodeName: value,
    })
  }
  handleOk = () => {
    const { onOk } = this.props
    const { name, cpus, memory, image, publicKeys, novnc, instanceCount, start, nodeName } = this.state
    const action = start === true ? 'start' : 'stop'
    onOk({
      name,
      cpus,
      memory,
      image,
      action,
      pubkey: publicKeys,
      novnc,
      instances: instanceCount,
      node_name: nodeName,
    })
  }
  render() {
    const { confirmLoading, cpus, memory, instanceCount, image } = this.state
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
    const { credentialData, visible, onCancel } = this.props
    for (let i = 0; i < credentialData.length; i++) {
      const { name } = credentialData[i].metadata
      credentials.push(<Option key={name}>{name}</Option>)
    }

    const hosts = []
    const { hostData } = this.props
    for (let i = 0; i < hostData.length; i++) {
      const { name } = hostData[i].metadata
      hosts.push(<Option key={name}>{name}</Option>)
    }

    return (
      <div>
        <Modal title="Create Instance"
          wrapClassName="vertical-center-modal"
          visible={visible}
          onOk={this.handleOk}
          onCancel={onCancel}
          confirmLoading={confirmLoading}
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
              <p>Instances</p>
            </Col>
            <Col span={12}>
              <Slider min={1} max={20} onChange={this.onInstanceCountChange} value={instanceCount} />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={20}
                style={{ marginLeft: 16 }}
                value={instanceCount}
                onChange={this.onInstanceCountChange}
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
            <Tooltip title="Choose a specific Kubernetes node to run your VM">
              <Col span={4} style={{ marginLeft: 24, marginTop: 10 }}>
                <p>Node Name</p>
              </Col>
              <Col span={16}>
                <Select
                  mode="combobox"
                  style={{ width: '100%', marginTop: 5 }}
                  allowClear
                  placeholder="Optional"
                  onChange={this.onNodeNameChange}
                >
                  {hosts}
                </Select>
              </Col>
            </Tooltip>
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

CreateInstance.propTypes = {
  credentialData: PropTypes.array,
  hostData: PropTypes.array,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default CreateInstance
