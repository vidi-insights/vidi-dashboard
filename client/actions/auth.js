'use strict'

import Request from 'superagent/lib/client'
import {push} from 'react-router-redux'
import {subscribeSocket, unsubscribeSocket} from '../lib/socket'

const userLogoutUri = '/user/logout'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_RESPONSE = 'LOGOUT_RESPONSE'
export const CHECK_COOKIE_REQUEST = 'CHECK_COOKIE_REQUEST'
export const CHECK_COOKIE_RESPONSE = 'CHECK_COOKIE_RESPONSE'

export function validateCookie (done) {
  Request
    .get('/auth/user')
    .end((err, resp) => {
      if (err && err.status === 401 || !resp.body || resp.body.statusCode === 401) {
        return done(false)
      }

      return done(true)
    })
}

export function login (user, pass) {
  return (dispatch) => {
    dispatch({type: LOGIN_REQUEST})

    Request
      .post('/auth/login')
      .type('form')
      .send({username: user, password: pass})
      .end((err, resp) => {
        if (err || !resp.body.ok) {
          return dispatch({
            type: LOGIN_RESPONSE,
            niceError: 'Wrong username or password, try again',
            hasError: true,
            isLoggedIn: false
          })
        }

        window.localStorage.setItem('user_id', resp.body.user.id)

        dispatch({
          type: LOGIN_RESPONSE,
          isLoggedIn: true,
          hasError: false
        })

        subscribeSocket(userLogoutUri, (msg) => {
          if (msg.user_id && msg.user_id === window.localStorage.getItem('user_id')) {
            unsubscribeSocket(userLogoutUri)
            dispatch({type: LOGOUT_RESPONSE})
            dispatch(push('/login'))
          }
        }, (err) => {console.log(err)})

        dispatch(push('/'))
      })
  }
}

export function logout () {
  return (dispatch) => {
    dispatch({type: LOGOUT_REQUEST})

    Request
      .post('/auth/logout')
      .type('form')
      .send({})
      .end(() => {
        window.localStorage.clear()

        unsubscribeSocket(userLogoutUri)
        dispatch({type: LOGOUT_RESPONSE, hasError: false})
        dispatch(push('/login'))
      })
  }
}
