import { getPrefix } from './pathnamePrefix'

function constructWebsocketURL(type, period) {
  let loc = window.location

  let proto = 'ws:'
  if (loc.protocol === 'https:') {
    proto = 'wss:'
  }

  let prefix = getPrefix()
  if (prefix === '') {
    prefix = '/'
  }

  return `${proto}//${loc.host}${prefix}v1/ws/${period}/${type}`
}

export function wsChanges(dispatch, type, period) {
  let url = constructWebsocketURL(type, period)
  const ws = new WebSocket(url)
  ws.onmessage = function (msg) {
    if (JSON.parse(msg.data).data != null) {
      dispatch({
        type: 'updateBackground',
        payload: JSON.parse(msg.data),
      })
    }
  }
}
