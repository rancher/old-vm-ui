import React, { PropTypes } from 'react'
import { Button, Modal } from 'antd'
const confirm = Modal.confirm

class GroupActions extends React.Component {
  confirmAction = (name, action) => {
    confirm({
      title: `Are you sure you want to ${name} selected machine images?`,
      onOk() {
        action()
      },
    })
  }
  confirmDelete = () => { this.confirmAction('delete', this.props.delete) }

  render() {
    const { dispatch, noRowSelected } = this.props

    const buttonStyle = {
      marginBottom: 5,
      marginRight: 5,
    }

    const createButtonProps = {
      type: 'primary',
      style: buttonStyle,
      onClick: () => {
        dispatch({
          type: 'machineimages/showCreateModal',
        })
      },
    }

    const deleteButtonProps = {
      type: 'danger',
      style: buttonStyle,
      onClick: this.confirmDelete,
      disabled: noRowSelected,
    }

    return (
      <div>
        <Button {...createButtonProps}>Create</Button>
        <Button {...deleteButtonProps}>Delete</Button>
      </div>
    )
  }
}

GroupActions.propTypes = {
  dispatch: PropTypes.func,
  delete: PropTypes.func,
  noRowSelected: PropTypes.bool,
}

export default GroupActions
