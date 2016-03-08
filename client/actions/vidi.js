'use strict'



import {subscribeSocket, unsubscribeSocket} from '../lib/socket'
import _ from 'lodash'

export const VIDI_SUBSCRIBE = 'VIDI_SUBSCRIBE'
export const VIDI_UPDATE = 'VIDI_UPDATE'
export const VIDI_UNSUBSCRIBE = 'VIDI_UNSUBSCRIBE'

export function subscribe (metric) {
  return (dispatch) => {
    const metrics = Array.isArray(metric) ? metric : [metric]

    _.each(metrics, (met) => {
      const uri = '/api/vidi/view/' + met

      dispatch({type: VIDI_SUBSCRIBE, uri: uri, view: met})

      subscribeSocket(uri, (msg) => {
        dispatch({type: VIDI_UPDATE, data: msg, uri: uri, view: met})
      }, () => {

      })
    })
  }
}

export function unsubscribe (metric) {
  return (dispatch) => {
    const metrics = Array.isArray(metric) ? metric : [metric]

    _.each(metrics, (met) => {
      const uri = '/api/vidi/view/' + met
      unsubscribeSocket(uri)
      dispatch({
        type: VIDI_UNSUBSCRIBE,
        uri: uri,
        name: met,
        view: met
      })
    })
  }
}
