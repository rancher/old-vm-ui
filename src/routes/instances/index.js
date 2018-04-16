import React, { PropTypes } from 'react'
import { connect } from 'dva'
import InstanceCreate from './InstanceCreate'
import InstanceLister from './InstanceLister'

function Instances({ instances, credentials, loading, dispatch }) {
  const { data } = instances
  const credentialData = credentials.data

  const instanceCreateProps = {
    credentialData,
    createInstance(record) {
      dispatch({
        type: 'instances/create',
        payload: record,
      })
    },
  }

  const instanceListProps = {
    loading,
    dataSource: data,
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
    <div>
      <InstanceCreate {...instanceCreateProps} />
      <InstanceLister {...instanceListProps} />
    </div>
  )
}

Instances.propTypes = {
  instances: PropTypes.object,
  credentials: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
}

export default connect(({ instances, credentials, loading }) => ({ instances, credentials, loading: loading.models.instance }))(Instances)
