import React, { PropTypes } from 'react'
import { Button, Modal } from 'antd'
const ButtonGroup = Button.Group
const confirm = Modal.confirm

class GroupActions extends React.Component {
  confirmAction = (name, action) => {
    confirm({
      title: `Are you sure you want to ${name} selected vms?`,
      onOk() {
        action()
      },
    })
  }
  confirmStopSelected = () => { this.confirmAction('stop', this.props.stopSelected) }
  confirmStartSelected = () => { this.confirmAction('start', this.props.startSelected) }
  confirmDeleteSelected = () => { this.confirmAction('delete', this.props.deleteSelected) }

  render() {
    const { confirmStopSelected, confirmStartSelected, confirmDeleteSelected } = this
    const { create, noRowSelected } = this.props
    return (
      <div>
        <Button type="primary" onClick={create} style={{ marginBottom: 5, marginRight: 5 }}>Create</Button>
        <ButtonGroup style={{ marginBottom: 5, marginRight: 5 }}>
          <Button type="default" onClick={confirmStopSelected} disabled={noRowSelected}>Stop</Button>
          <Button type="default" onClick={confirmStartSelected} disabled={noRowSelected}>Start</Button>
        </ButtonGroup>
        <Button type="danger" onClick={confirmDeleteSelected} style={{ marginBottom: 5 }} disabled={noRowSelected}>Delete</Button>
      </div>
    )
  }
}

GroupActions.propTypes = {
  create: PropTypes.func,
  stopSelected: PropTypes.func,
  startSelected: PropTypes.func,
  deleteSelected: PropTypes.func,
  noRowSelected: PropTypes.bool,
}

export default GroupActions
