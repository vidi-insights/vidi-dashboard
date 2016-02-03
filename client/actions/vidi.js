'use strict'

import * as vidiActions from '../constants/vidi'
import _ from 'lodash'

import store from '../bootstrap/store'
import { subscribeSocket, unsubscribeSocket } from '../lib/socket'

export function subscribe (source, metric) {
  return (dispatch) => {
    const metrics = Array.isArray(metric) ? metric : [metric]

    _.each(metrics, (met) => {
      const uri = '/metrics' + '/' + source + '/' + met

      subscribeSocket(uri, (msg) => {
        dispatch({type: vidiActions.VIDI_UPDATE, data: msg.data, uri: uri})
        store.dispatch({type: vidiActions.VIDI_SUBSCRIBE, uri: uri})
      }, () => {
        dispatch({type: vidiActions.VIDI_SUBSCRIBE, uri: uri})
      })
    })
  }
}

export function unsubscribe (source, metric) {
  return (dispatch) => {
    const metrics = Array.isArray(metric) ? metric : [metric]

    _.each(metrics, (met) => {
      const uri = '/metrics' + '/' + source + '/' + met
      unsubscribeSocket(uri)
      store.dispatch({type: vidiActions.VIDI_UNSUBSCRIBE, uri: uri})
    })
  }
}
