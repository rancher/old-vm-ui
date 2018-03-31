import React, { PropTypes } from 'react'
import { connect } from 'dva'
import InstanceList from './InstanceList'

function Instances({ instances, loading }) {
  const { data } = instances

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
  loading: PropTypes.bool,
}

export default connect(({ instances, loading }) => ({ instances, loading: loading.models.instance }))(Instances)
