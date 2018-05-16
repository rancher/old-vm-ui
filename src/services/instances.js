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

export async function actionInstance(payload) {
  const { record, action } = payload
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

export function actionInstances(payload, action) {
  return request({
    url: `/v1/instances/${action}`,
    method: 'post',
    data: {
      names: payload,
    },
  })
}
export async function startInstances(payload) { return actionInstances(payload, 'start') }
export async function stopInstances(payload) { return actionInstances(payload, 'stop') }
export async function migrateInstances(payload) { return actionInstances(payload, 'migrate') }
export async function deleteInstances(payload) { return actionInstances(payload, 'delete') }
