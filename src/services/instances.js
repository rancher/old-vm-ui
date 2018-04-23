import { request } from '../utils'

export async function query(params) {
  return request({
    url: '/v1/instances',
    method: 'get',
    data: params,
  })
}

export async function createInstance(params) {
  return request({
    url: '/v1/instances',
    method: 'post',
    data: {
      ...params,
    },
  })
}

export async function actionInstance(record, action) {
  return request({
    url: `/v1/instances/${record}/${action}`,
    method: 'post',
  })
}

export async function deleteInstance(name) {
  return request({
    url: `/v1/instances/${name}`,
    method: 'delete',
  })
}

// TODO these functions should make 1 API call

export async function startInstances(payload) {
  for (let i = 0; i < payload.length; i++) {
    actionInstance(payload[i], 'start')
  }
}

export async function stopInstances(payload) {
  for (let i = 0; i < payload.length; i++) {
    actionInstance(payload[i], 'stop')
  }
}

export async function deleteInstances(payload) {
  for (let i = 0; i < payload.length; i++) {
    deleteInstance(payload[i])
  }
}
