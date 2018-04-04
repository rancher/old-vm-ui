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

export async function actionInstance(params) {
  return request({
    url: `/v1/instances/${params.record.metadata.namespace}/${params.record.metadata.name}/${params.action}`,
    method: 'post',
  })
}

export async function deleteInstance(params) {
  return request({
    url: `/v1/instances/${params.metadata.namespace}/${params.metadata.name}`,
    method: 'delete',
  })
}
