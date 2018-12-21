import React, { PropTypes } from 'react'
import { connect } from 'dva'
import GroupActions from './GroupActions'
import CreateInstance from './CreateInstance'
import InstanceLister from './InstanceLister'

function Instances({ instances, credentials, hosts, machineimages, loading, dispatch }) {
  const { data, createInstanceModalVisible, selectedRowKeys, noRowSelected } = instances
  const credentialData = credentials.data
  const hostData = hosts.data
  const machineImageData = machineimages.data

  const groupActions = {
    create() {
      dispatch({
        type: 'instances/showCreateInstanceModal',
      })
    },
    stopSelected() {
      dispatch({
        type: 'instances/stopSelected',
        payload: selectedRowKeys,
      })
    },
    startSelected() {
      dispatch({
        type: 'instances/startSelected',
        payload: selectedRowKeys,
      })
    },
    deleteSelected() {
      dispatch({
        type: 'instances/deleteSelected',
        payload: selectedRowKeys,
      })
    },
    noRowSelected,
  }

  const createInstanceModalProps = {
    credentialData,
    hostData,
    machineImageData,
    visible: createInstanceModalVisible,
    onOk(payload) {
      dispatch({
        type: 'instances/create',
        payload,
      })
    },
    onCancel() {
      dispatch({
        type: 'instances/hideCreateInstanceModal',
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
    onSelectChange(selectedKeys) {
      dispatch({
        type: 'instances/updateSelectedRows',
        selectedKeys,
      })
    },
    selectedRowKeys,
    hostData,
    updateInstance(record) {
      dispatch({
        type: 'instances/update',
        payload: record,
      })
    },
  }

  return (
    <div>
      <GroupActions {...groupActions} />
      <CreateInstance {...createInstanceModalProps} />
      <InstanceLister {...instanceListProps} />
    </div>
  )
}

Instances.propTypes = {
  instances: PropTypes.object,
  credentials: PropTypes.object,
  hosts: PropTypes.object,
  machineimages: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
}

export default connect(({ instances, credentials, hosts, machineimages, loading }) => ({ instances, credentials, hosts, machineimages, loading: loading.models.instance }))(Instances)
