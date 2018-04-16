import React, { PropTypes } from 'react'
import { connect } from 'dva'
import KeyList from './KeyList'

function Credentials({ credentials, loading, dispatch }) {
  const { data } = credentials
  const keyListProps = {
    loading,
    dataSource: data,
    deleteCredential(name) {
      dispatch({
        type: 'credentials/delete',
        payload: name,
      })
    },
    createCredential(payload) {
      dispatch({
        type: 'credentials/create',
        payload,
      })
    },
  }

  return (
    <div>
      <KeyList {...keyListProps} />
    </div>
  )
}

Credentials.propTypes = {
  credentials: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
}

export default connect(({ credentials, loading }) => ({ credentials, loading: loading.models.instance }))(Credentials)
