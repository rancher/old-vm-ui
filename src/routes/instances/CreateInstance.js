import React, { PropTypes } from 'react'
import { Modal, Slider, InputNumber, Row, Col, Checkbox, Input, Select, Tooltip } from 'antd'
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
    image: '',
    start: true,
    novnc: true,
    publicKeys: [],
    nodeName: '',
    persistentStorage: false,
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
  onMachineImageChange = (value) => {
    this.setState({
      image: value,
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
  handleOk = () => {
    const { onOk } = this.props
    const { name, cpus, memory, image, publicKeys, novnc, instanceCount, start, nodeName, persistentStorage } = this.state
    const action = start === true ? 'start' : 'stop'
    let volume
    if (persistentStorage) {
      volume = {
        longhorn: {
          frontend: 'blockdev',
          number_of_replicas: 3,
          stale_replica_timeout: 20,
        },
      }
    } else {
      volume = {
        empty_dir: {},
      }
    }
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
      volume,
    })
  }

  render() {
    const { confirmLoading, cpus, memory, instanceCount } = this.state
    const { credentialData, hostData, machineImageData, visible, onCancel } = this.props

    const credentials = []
    credentialData.map((entry) => {
      return credentials.push(<Option key={entry.metadata.name}>{entry.metadata.name}</Option>)
    })

    const hosts = []
    hostData.map((entry) => {
      return hosts.push(<Option key={entry.metadata.name}>{entry.metadata.name}</Option>)
    })

    const machineImages = []
    machineImageData.map((entry) => {
      return machineImages.push(<Option key={entry.metadata.name}>{entry.metadata.name}</Option>)
    })

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
              <p>Image</p>
            </Col>
            <Col span={16}>
              <Select
                mode="combobox"
                style={{ width: '100%', marginTop: 5 }}
                allowClear
                placeholder="Please select"
                onChange={this.onMachineImageChange}
              >
                {machineImages}
              </Select>
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
            <Checkbox defaultChecked onChange={this.onNovncChange} style={{ marginTop: 16 }}>Enable NoVNC</Checkbox>
          </Row>
        </Modal>
      </div>
    )
  }
}

CreateInstance.propTypes = {
  credentialData: PropTypes.array,
  hostData: PropTypes.array,
  machineImageData: PropTypes.array,
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default CreateInstance
