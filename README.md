![logo][]

# vidi-frontend
The vidi-frontend repo contains the Vidi Dashboard front-end app. Included are all the necessary
pieces to run as a container. See below for instructions. This repo does not include any backend
services. Pair with [vidi-backend][] for a simple client server setup.

- __Lead Maintainer:__ [Dean McDonnell][lead]
- __Sponsor:__ [nearForm][]

## Running
You can run the frontend both as a process on your machine and as a container. Follow the steps
below,

### In process
1. Run `npm install` to install all dependencies
2. Run `npm run build` to create a deploy
3. Run `npm run serve` to serve the app on port `3000`  


### As a container
1. Run `docker build -t vidi-frontend .` to create the container
2. Run `docker run -p 3000:3000 -d vidi-frontend` To start the container
3. Run `docker-machine ip` to get your vm ip address (or just localhost if Linux)
4. Browse to `your_ip:3000`

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
[lead]: https://github.com/mcdonnelldean
[nearForm]: http://www.nearform.com/

[Dockerfile]: ./Dockerfile
[vidi-backend]: https://github.com/nearform/vidi-backend
