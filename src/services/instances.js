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
  const { record, action } = params
  return request({
    url: `/v1/instances/${record}/${action}`,
    method: 'post',
  })
}

export async function deleteInstance(params) {
  const { name } = params
  return request({
    url: `/v1/instances/${name}`,
    method: 'delete',
  })
}
