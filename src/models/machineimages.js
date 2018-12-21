import { createMachineImage, deleteMachineImage } from '../services/machineimage'
import { wsChanges } from '../utils/websocket'

export default {
  namespace: 'machineimages',
  state: {
    data: [],
    selectedKeys: [],
    noRowSelected: true,
    createModalVisible: false,
  },
  subscriptions: {
    setup({ dispatch }) {
      wsChanges(dispatch, 'machineimage', '1s')
    },
  },
  effects: {
    *updateBackground({
      payload,
    }, { put }) {
      const data = payload
      yield put({ type: 'queryMachineImage', payload: { ...data } })
    },
    *create({
      payload,
    }, { call, put }) {
      yield call(createMachineImage, payload)
      yield put({ type: 'hideCreateModal' })
    },
    *delete({
      payload,
    }, { call, put }) {
      yield payload.map((entry) => call(deleteMachineImage, entry))
      yield put({ type: 'clearSelectedKeys' })
    },
  },
  reducers: {
    queryMachineImage(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    updateSelectedKeys(state, payload) {
      const { selectedKeys } = payload
      return { ...state, selectedKeys, noRowSelected: selectedKeys.length === 0 }
    },
    clearSelectedKeys(state) {
      return { ...state, selectedKeys: [], noRowSelected: true }
    },
    showCreateModal(state) {
      return { ...state, createModalVisible: true }
    },
    hideCreateModal(state) {
      return { ...state, createModalVisible: false }
    },
  },
}
