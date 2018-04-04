import React from 'react'
import { Button, Modal, Slider, InputNumber, Row, Col, Radio, Checkbox, Input } from 'antd'

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
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    namespace: 'default',
    name: '',
    cpus: 1,
    memory: 512,
    image: 'ubuntu',
    start: true,
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
  onImageChange = (value) => {
    this.setState({
      image: value,
    })
  }
  onActionChange = (value) => {
    this.setState({
      start: value,
    })
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    })
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 1000)
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }
  render() {
    const { visible, confirmLoading } = this.state
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
            <Col span={12}>
              <Input placeholder="Name" onChange={this.onNameChange} style={{ marginBottom: 5 }} />
            </Col>
            <Col span={4}></Col>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>Name</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Slider min={1} max={32} onChange={this.onCpusChange} value={this.state.cpus} />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={32}
                style={{ marginLeft: 16 }}
                value={this.state.cpus}
                onChange={this.onCpusChange}
              />
            </Col>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>vCPUs</p>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Slider min={256} max={8192} marks={memoryMarks} step={null} onChange={this.onMemoryChange} value={this.state.memory} />
            </Col>
            <Col span={4}>
              <InputNumber
                min={256}
                max={8192}
                style={{ marginLeft: 16 }}
                value={this.state.memory}
                onChange={this.onMemoryChange}
              />
            </Col>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>MiB Memory</p>
            </Col>
          </Row>
          <Row>
            <Col span={17}>
              <Radio.Group value={this.state.image} onChange={this.onImageChange} type="primary">
                <Radio.Button value="ubuntu">Ubuntu</Radio.Button>
                <Radio.Button value="centos">CentOS</Radio.Button>
                <Radio.Button value="rancheros">RancherOS</Radio.Button>
                <Radio.Button value="windows7">Windows 7</Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={4} style={{ marginLeft: 5, marginTop: 5 }}>
              <p>Base Image</p>
            </Col>
          </Row>
          <Row>
            <Checkbox defaultChecked={this.state.start} onChange={this.onActionChange} style={{ marginTop: 16 }}>Start Instance Immediately</Checkbox>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default InstanceCreate
