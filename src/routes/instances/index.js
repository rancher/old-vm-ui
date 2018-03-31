import React, { PropTypes } from 'react'
import { connect } from 'dva'
import InstanceList from './InstanceList'

function Instances({ instances, dispatch, loading }) {
  const { data } = instances
  const props = {
    data,
    loading,
    onSubmit(payload) {
      dispatch({
        type: 'instances/update',
        payload,
      })
    },
  }

  const instanceListProps = {
    dataSource: data,
    loading,
  }

  return (
    <div className="content-inner">
      <InstanceList {...instanceListProps} />
    </div>
  )
}

Instances.propTypes = {
  instances: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
}

export default connect(({ instances, loading }) => ({ instances, loading: loading.models.instance }))(Instances)
