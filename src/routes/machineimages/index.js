import React, { PropTypes } from 'react'
import { connect } from 'dva'
import GroupActions from './GroupActions'
import CreateMachineImage from './CreateMachineImage'
import MachineImageList from './MachineImageList'

function MachineImages({ machineimages, instances, loading, dispatch }) {
  const { data, selectedKeys, createModalVisible } = machineimages
  const instanceData = instances.data

  const groupActionsProps = {
    dispatch,
    delete() {
      dispatch({
        type: 'machineimages/delete',
        payload: selectedKeys,
      })
    },
    noRowSelected: selectedKeys.length === 0,
  }

  const createMachineImageProps = {
    dispatch,
    visible: createModalVisible,
    instanceData,
  }

  const machineImageListProps = {
    loading,
    dataSource: data,
    dispatch,
    selectedKeys,
  }

  return (
    <div>
      <GroupActions {...groupActionsProps} />
      <CreateMachineImage {...createMachineImageProps} />
      <MachineImageList {...machineImageListProps} />
    </div>
  )
}

MachineImages.propTypes = {
  machineimages: PropTypes.object,
  instances: PropTypes.object,
  loading: PropTypes.bool,
  dispatch: PropTypes.func,
}

export default connect(({ machineimages, instances, loading }) => ({ machineimages, instances, loading: loading.models.instance }))(MachineImages)
