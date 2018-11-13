import { query } from '../services/hosts'
import { wsChanges } from '../utils/websocket'
import { parse } from 'qs'

export default {
  namespace: 'hosts',
  state: {
    data: [],
  },
  subscriptions: {
    setup({ dispatch }) {
      wsChanges(dispatch, 'host', '5s')
    },
  },
  effects: {
    *query({
      payload,
    }, { call, put }) {
      const data = yield call(query, parse(payload))
      yield put({ type: 'queryHost', payload: { ...data } })
    },
    *updateBackground({
      payload,
    }, { put }) {
      const data = payload
      yield put({ type: 'queryHost', payload: { ...data } })
    },
  },
  reducers: {
    queryHost(state, action) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
}
