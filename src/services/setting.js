import { request } from '../utils'

export async function query(params) {
  return request({
    url: '/v1/setting',
    method: 'get',
    data: params,
  })
}

export async function update(params) {
  const { name, value } = params
  return request({
    url: `/v1/setting/${name}`,
    method: 'put',
    data: {
      value,
    },
  })
}
