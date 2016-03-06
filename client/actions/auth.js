'use strict'

import Request from 'superagent/lib/client'
import {push} from 'react-router-redux'

const userLogoutUri = '/user/logout'

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
    dispatch({type: 'LOGIN_REQUEST'})

    Request
      .post('/auth/login')
      .type('form')
      .send({username: user, password: pass})
      .end((err, resp) => {
        if (err || !resp.body.ok) {
          return dispatch({
            type: 'LOGIN_RESPONSE',
            niceError: 'Wrong username or password, try again',
            hasError: true,
            isLoggedIn: false
          })
        }

        dispatch({
          type: 'LOGIN_RESPONSE',
          isLoggedIn: true,
          hasError: false
        })

        dispatch(push('/'))
      })
  }
}

export function logout () {
  return (dispatch) => {
    dispatch({type: 'LOGOUT_REQUEST'})

    Request
      .post('/auth/logout')
      .type('form')
      .send({})
      .end(() => {

        dispatch({type: 'LOGOUT_RESPONSE', hasError: false})
        dispatch(push('/login'))
      })
  }
}
