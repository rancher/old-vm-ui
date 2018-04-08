import { query } from '../services/hosts'
import { parse } from 'qs'

export default {
  namespace: 'hosts',
  state: {
    data: [],
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
    // *delete({
    //   payload,
    // }, { call, put }) {
    //   yield call(deleteInstance, payload)
    //   yield put({ type: 'query' })
    // },
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
