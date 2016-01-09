'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE'

export function login (user, pass) {
  return (dispatch) => {
    dispatch({type: LOGIN_REQUEST})

    Request
      .post('/auth/login')
      .type('form')
      .send({username: user, password: pass})
      .end((err, resp) => {
        if (err || !resp.body.token) {
          dispatch({type: LOGIN_RESPONSE, hasError: true, token: null})
        }
        else {
          const token = resp.body.token

          dispatch({type: LOGIN_RESPONSE, hasError: false, token: token})
          dispatch(pushPath('/'))

          window.localStorage.setItem('token', token)
        }
      })
    }
  }

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_RESPONSE = 'LOGOUT_RESPONSE'

export function logout (token) {
  return (dispatch) => {
    dispatch({type: LOGOUT_REQUEST})

    Request
      .post('/auth/logout')
      .type('form')
      .send({token: token})
      .end(() => {
        dispatch({type: LOGOUT_RESPONSE, hasError: false, token: null})
        dispatch(pushPath('/'))

        window.localStorage.clear()
      })
  }
}
