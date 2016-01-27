'use strict'

var Nes = require('nes/client')

import * as socketActions from '../constants/socket'
import * as authActions from '../constants/auth'

import { pushPath } from 'redux-simple-router'

const client = new Nes.Client(document.URL.replace('http', 'ws'))

const userLogoutUri = '/user/logout'

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
      client.subscribe(userLogoutUri,
        (msg) => {
          if (msg.user_id) {
            if (msg.user_id === window.localStorage.getItem('user_id')){
              dispatch({type: authActions.LOGOUT_RESPONSE})
              dispatch(pushPath('/login'))
            }
          }
        },
        (err) => {
          dispatch({type: socketActions.SOCKET_SUBSCRIBE, uri: userLogoutUri})
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
    dispatch({type: socketActions.SOCKET_UNSUBSCRIBE, uri: userLogoutUri})
  }
}
