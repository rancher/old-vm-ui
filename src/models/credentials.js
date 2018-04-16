import { query, create, deleteCredential } from '../services/credentials'
import { parse } from 'qs'

export default {
  namespace: 'credentials',
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
