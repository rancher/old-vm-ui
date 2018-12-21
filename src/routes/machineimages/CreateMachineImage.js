import React, { PropTypes } from 'react'
import { Modal, InputNumber, Row, Col, Input, Select } from 'antd'
const Option = Select.Option

class CreateMachineImage extends React.Component {
  state = {
    name: '',
    fromMachine: '',
    size: 8,
    docker_image: '',
  }
  onNameChange = (e) => {
    const { value } = e.target
    this.setState({
      name: value,
    })
  }
  onFromInstanceChange = (value) => {
    let size
    if (value !== '') {
      size = 0
    } else {
      size = 8
    }
    this.setState({
      fromMachine: value,
      size,
    })
  }
  onSizeChange = (value) => {
    this.setState({
      size: value,
    })
  }
  onImageChange = (e) => {
    const { value } = e.target
    this.setState({
      docker_image: value,
    })
  }
  onOk = () => {
    const { dispatch } = this.props
    const { name, fromMachine, size, docker_image } = this.state
    dispatch({
      type: 'machineimages/create',
      payload: {
        name,
        from_vm: fromMachine,
        size_gib: size,
        docker_image,
      },
    })
  }
  onCancel = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'machineimages/hideCreateModal',
    })
  }

  render() {
    const { onOk, onCancel } = this
    const { visible, instanceData } = this.props
    const { size, fromMachine } = this.state

    const instances = []
    instanceData.map((entry) => {
      return instances.push(<Option key={entry.metadata.name}>{entry.metadata.name}</Option>)
    })

    let rowSize
    if (fromMachine === '') {
      rowSize = (
        <Row>
          <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
            <p>Size GiB</p>
          </Col>
          <Col span={16}>
            <InputNumber
              min={1}
              max={1024}
              value={size}
              onChange={this.onSizeChange}
              style={{ marginBottom: 5 }}
            />
          </Col>
        </Row>
      )
    } else {
      rowSize = ''
    }

    return (
      <div>
        <Modal title="Create Machine Image"
          wrapClassName="vertical-center-modal"
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
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
              <p>Docker Image</p>
            </Col>
            <Col span={16}>
              <Input placeholder="Docker Image" onChange={this.onImageChange} style={{ marginBottom: 5 }} />
            </Col>
          </Row>
          <Row>
            <Col span={4} style={{ marginLeft: 24, marginTop: 5 }}>
              <p>From Instance</p>
            </Col>
            <Col span={16}>
              <Select
                mode="combobox"
                style={{ width: '100%', marginBottom: 5 }}
                placeholder="Optional"
                onChange={this.onFromInstanceChange}
              >
                {instances}
              </Select>
            </Col>
          </Row>
          {rowSize}
        </Modal>
      </div>
    )
  }
}

CreateMachineImage.propTypes = {
  dispatch: PropTypes.func,
  visible: PropTypes.bool,
  instanceData: PropTypes.array,
}

export default CreateMachineImage
