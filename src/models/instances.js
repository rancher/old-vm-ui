import { query, deleteInstance, actionInstance, createInstance } from '../services/instances'
import { parse } from 'qs'

export default {
  namespace: 'instances',
  state: {
    data: [],
    createInstanceModalVisible: false,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'query',
          payload: location.query,
        })
      })
    },
  },
  effects: {
    *query({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      data.data.sort((a, b) => a.metadata.name.localeCompare(b.metadata.name))
      yield put({ type: 'queryInstance', payload: { ...data } })
    },
    *create({
      payload,
    }, { call, put }) {
      yield put({ type: 'hideCreateInstanceModal' })
      yield call(createInstance, payload)
      yield put({ type: 'query' })
    },
    *action({
      payload,
      action,
    }, { call, put }) {
      yield call(actionInstance, payload)
      yield put({ type: 'query' })
    },
    *delete({
      payload,
    }, { call, put }) {
      yield call(deleteInstance, payload)
      yield put({ type: 'query' })
    },
  },
  reducers: {
    queryInstance(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
    showCreateInstanceModal(state, action) {
      return { ...state, ...action.payload, createInstanceModalVisible: true }
    },
    hideCreateInstanceModal(state) {
      return { ...state, createInstanceModalVisible: false }
    },
  },
}
