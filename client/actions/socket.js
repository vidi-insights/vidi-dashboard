'use strict'

var Nes = require('nes/client')

export const SOCKET_SUBSCRIBE = 'SOCKET_SUBSCRIBE'
export const SOCKET_UPDATE = 'SOCKET_UPDATE'
export const SOCKET_UNSUBSCRIBE = 'SOCKET_UNSUBSCRIBE'

const client = new Nes.Client(document.URL.replace('http', 'ws'))


export function socketSubscribe (source, metric) {
  return (dispatch) => {
    const uri = '/metrics' + '/' + source + '/' + metric

    client.connect(function (err) {
      if (err) {
        return console.log(err)
      }

      dispatch({type: SOCKET_SUBSCRIBE, uri: uri})

      client.subscribe(uri,
        (msg) => {
          dispatch({type: SOCKET_UPDATE, data: msg.data, uri: uri})
        },
        (err) => {
          dispatch({type: SOCKET_SUBSCRIBE, uri: uri})
        }
      )
    })
  }
}

export function socketUnsubscribe (source, metric) {
  return (dispatch) => {
    const uri = '/metrics' + '/' + source + '/' + metric

    client.unsubscribe(uri)

    dispatch({type: SOCKET_UNSUBSCRIBE, uri: uri})
  }
}
