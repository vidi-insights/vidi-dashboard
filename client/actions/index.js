'use strict'

import Request from 'superagent/lib/client'
import { pushPath } from 'redux-simple-router'

export const TOKEN_REQUEST = 'TOKEN_REQUEST'
export const TOKEN_RESPONSE = 'TOKEN_RESPONSE'

export function fetchToken (user, pass) {
  return (dispatch) => {
    dispatch({type: TOKEN_REQUEST})

    console.log(user, pass)

    Request
      .post('/auth/login')
      .type('form')
      .send({username: user, password: pass})
      .end((err, resp) => {
        if (err) {
          dispatch({
            type: TOKEN_RESPONSE,
            hasError: true,
            token: null
          })
        }
        else {
          dispatch({
            type: TOKEN_RESPONSE,
            hasError: false,
            token: resp.body.token
          })

          dispatch(pushPath('/'))
        }
      })
    }
  }
