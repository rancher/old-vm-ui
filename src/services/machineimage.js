import { request } from '../utils'

export async function createMachineImage(params) {
  return request({
    url: '/v1/machineimage',
    method: 'post',
    data: {
      ...params,
    },
  })
}

export async function deleteMachineImage(name) {
  return request({
    url: `/v1/machineimage/${name}`,
    method: 'delete',
  })
}
