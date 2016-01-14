module.exports = [
  {
    method: 'GET',
    path: '/css/{path*}',
    handler: {
      directory: {
        path: './css/',
        redirectToSlash: true,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/js/{path*}',
    handler: {
      directory: {
        path: './js/',
        redirectToSlash: true,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/fonts/{path*}',
    handler: {
      directory: {
        path: './fonts/',
        redirectToSlash: true,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/img/{path*}',
    handler: {
      directory: {
        path: './img/',
        redirectToSlash: true,
        index: false
      }
    }
  },
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      file: {
        path: './index.html'
      }
    }
  }
]
