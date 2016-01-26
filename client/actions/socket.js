'use strict'

var Nes = require('nes/client')

import * as socketActions from '../constants/socket'

const client = new Nes.Client(document.URL.replace('http', 'ws'))


export function socketSubscribe (source, metric) {
  return (dispatch) => {
    const uri = '/metrics' + '/' + source + '/' + metric

    client.connect(function (err) {
      if (err) {
        return console.log(err)
      }

      dispatch({type: socketActions.SOCKET_SUBSCRIBE, uri: uri})

      client.subscribe(uri,
        (msg) => {
          dispatch({type: socketActions.SOCKET_UPDATE, data: msg.data, uri: uri})
        },
        (err) => {
          dispatch({type: socketActions.SOCKET_SUBSCRIBE, uri: uri})
        }
      )
    })
  }
}

export function socketUnsubscribe (source, metric) {
  return (dispatch) => {
    const uri = '/metrics' + '/' + source + '/' + metric

    client.unsubscribe(uri)

    dispatch({type: socketActions.SOCKET_UNSUBSCRIBE, uri: uri})
  }
}
