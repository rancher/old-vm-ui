import { query, create, deleteCredential } from '../services/credentials'
import { wsChanges } from '../utils/websocket'
import { parse } from 'qs'

export default {
  namespace: 'credentials',
  state: {
    data: [],
  },
  subscriptions: {
    setup({ dispatch }) {
      wsChanges(dispatch, 'credential', '1s')
    },
  },
  effects: {
    *query({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      yield put({ type: 'queryInstance', payload: { ...data } })
    },
    *updateBackground({
      payload,
    }, { put }) {
      const data = payload
      yield put({ type: 'queryInstance', payload: { ...data } })
    },
    *create({
      payload,
    }, { call, put }) {
      yield call(create, payload)
      yield put({ type: 'query' })
    },
    *delete({
      payload,
    }, { call, put }) {
      yield call(deleteCredential, payload)
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
  },
}
