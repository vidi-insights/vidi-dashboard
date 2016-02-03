import Nes from 'nes/client'

let nesClient = null
const _subscriptions = {}

export function getSocket () {
  return new Promise((resolve, reject) => {
    if (nesClient) {
      resolve(nesClient)
    }
    else {
      const url = document.URL.replace('http', 'ws')
      nesClient = new Nes.Client(url)

      nesClient.connect(function (err) {
        if (err) {
          return console.log(err)
        }

        resolve(nesClient)
      })
    }
  })
}

export function subscribeSocket (uri, handler, errorHandler) {
  _subscriptions[uri] = handler

  getSocket().then((client) => {
    client.subscribe(uri, handler, errorHandler)
  })
}

export function unsubscribeSocket (uri) {
  getSocket().then((client) => {
    client.unsubscribe(uri)
    delete _subscriptions[uri]
  })
}
