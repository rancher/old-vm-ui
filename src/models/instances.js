import { query } from '../services/instances'
import { parse } from 'qs'

export default {
  namespace: 'instances',
  state: {
    data: [],
    // data: [
    //   {
    //     metadata: {
    //       name: "james-01",
    //       namespace: "default",
    //     },
    //     spec: {
    //       cpus: 1,
    //       memory_mb: 256,
    //       image: "ubuntu",
    //     },
    //   },
    //   {
    //     metadata: {
    //       name: "james-02",
    //       namespace: "default",
    //     },
    //     spec: {
    //       cpus: 1,
    //       memory_mb: 512,
    //       image: "centos",
    //     },
    //   },
    // ],
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
      console.dir(data)
      // data.data.sort((a, b) => a.name.localeCompare(b.name))
      yield put({ type: 'queryInstance', payload: { ...data } })
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
