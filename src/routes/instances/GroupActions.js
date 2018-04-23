import React, { PropTypes } from 'react'
import { Button } from 'antd'

class GroupActions extends React.Component {
  state = {}

  render() {
    const { createInstance } = this.props
    return (
      <div>
        <Button type="primary" onClick={createInstance} style={{ marginBottom: 5 }}>Create</Button>
      </div>
    )
  }
}

GroupActions.propTypes = {
  createInstance: PropTypes.func,
}

export default GroupActions
