import React, { PropTypes } from 'react'
import { connect } from 'dva'
import HostList from './HostList'

function Hosts({ hosts, loading }) {
  const { data } = hosts

  const props = {
    dataSource: data,
    loading,
    // deleteHost(record) {
    //   dispatch({
    //     type: 'instances/delete',
    //     payload: record,
    //   })
    // },
  }

  return (
    <div>
      <HostList {...props} />
    </div>
  )
}

Hosts.propTypes = {
  hosts: PropTypes.object,
  loading: PropTypes.bool,
  // dispatch: PropTypes.func,
}

export default connect(({ hosts, loading }) => ({ hosts, loading: loading.models.hosts }))(Hosts)
