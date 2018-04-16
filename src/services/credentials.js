import { request } from '../utils'

export async function query(params) {
  return request({
    url: '/v1/credential',
    method: 'get',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: '/v1/credential',
    method: 'post',
    data: params,
  })
}

export async function deleteCredential(name) {
  return request({
    url: `/v1/credential/${name}`,
    method: 'delete',
  })
}
