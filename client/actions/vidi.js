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
      const uri = '/api/vidi' + '/' + source + '/' + met

      dispatch({type: VIDI_SUBSCRIBE, uri: uri, source: source, stat: met})

      subscribeSocket(uri, (msg) => {
        dispatch({type: VIDI_UPDATE, data: msg, uri: uri, source: source, stat: met})
      }, () => {

      })
    })
  }
}

export function unsubscribe (source, metric) {
  return (dispatch) => {
    const metrics = Array.isArray(metric) ? metric : [metric]

    _.each(metrics, (met) => {
      const uri = '/api/vidi' + '/' + source + '/' + met
      unsubscribeSocket(uri)
      dispatch({
        type: VIDI_UNSUBSCRIBE,
        uri: uri,
        source: source,
        name: met
      })
    })
  }
}
