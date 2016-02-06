'use strict'



import {subscribeSocket, unsubscribeSocket} from '../lib/socket'
import _ from 'lodash'

export const VIDI_SUBSCRIBE = 'VIDI_SUBSCRIBE'
export const VIDI_UPDATE = 'VIDI_UPDATE'
export const VIDI_UNSUBSCRIBE = 'VIDI_UNSUBSCRIBE'

export function subscribe (source, metric) {
  return (dispatch) => {
    const metrics = Array.isArray(metric) ? metric : [metric]

    _.each(metrics, (met) => {
      const uri = '/metrics' + '/' + source + '/' + met

      subscribeSocket(uri, (msg) => {
        dispatch({type: VIDI_UPDATE, data: msg.data, uri: uri})
        store.dispatch({type: VIDI_SUBSCRIBE, uri: uri})
      }, () => {
        dispatch({type: VIDI_SUBSCRIBE, uri: uri})
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
      store.dispatch({type: VIDI_UNSUBSCRIBE, uri: uri})
    })
  }
}
