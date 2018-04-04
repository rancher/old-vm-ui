import React, { PropTypes } from 'react'
import { connect } from 'dva'
import InstanceCreate from './InstanceCreate'
import InstanceList from './InstanceList'

function Instances({ instances, loading, dispatch }) {
  const { data } = instances

  const instanceCreateProps = {
    createInstance(record) {
      dispatch({
        type: 'instances/create',
        payload: record,
      })
    },
  }

  const instanceListProps = {
    dataSource: data,
    loading,
    deleteInstance(record) {
      dispatch({
        type: 'instances/delete',
        payload: record,
      })
    },
    actionInstance(record, action) {
      dispatch({
        type: 'instances/action',
        payload: {
          record,
          action,
        },
      })
    },
  }

  return (
    <div className="content-inner">
      <InstanceCreate {...instanceCreateProps} />
      <InstanceList {...instanceListProps} />
    </div>
  )
}

Instances.propTypes = {
  instances: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
}

export default connect(({ instances, loading }) => ({ instances, loading: loading.models.instance }))(Instances)
