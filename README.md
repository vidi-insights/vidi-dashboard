![logo]

# vidi-frontend
The vidi-frontend repo contains the Vidi Dashboard front-end app. Included are all the necessary
pieces to run as a container. See below for instructions. This repo does not include any backend
services. Pair with [vidi-backend][] for a simple client server setup.

__Sponsor:__ nearForm

## Deploying
Deploying vidi-frontend is extremely simple, first download the version you wish to run,

- [latest]()

Next, complete the following steps to run the app,

 - __Modify Config:__ In the [./config.js]() file, all values are set to reasonable defaults. Update
   any values you require and save your changes.

 - __Run Container:__ vidi-frontend includes a [Dockerfile][] and can be ran as a container. To do
  this follow the steps below,

  1. Run `docker .` to creat e the container
  2. Run ` ` To start the container
  3. Browse to `localhost:4000`

## Documentation

 - To Follow...

## Contributing
The [vidi org][] encourages open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

## License
Copyright (c) 2015, Dean McDonnell and other contributors.
Licensed under [MIT][].


[MIT]: ./LICENSE
[Code of Conduct]: https://github.com/nearform/vidi-contrib/docs/code_of_conduct.md
[vidi org]: https://github.com/nearform/vidi-contrib
[logo]: ./assets/vidi-logo.png

[Dockerfile]: ./Dockerfile
[vidi-backend]: https://github.com/nearform/vidi-backend
