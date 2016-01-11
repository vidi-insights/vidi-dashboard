![logo][]

# vidi-dashboard
Vidi: Dashboard is a composition of various pieces of the Vidi: Insights project to create an easy to use
Dashboard. The app is extensible, it allows you to plug in your own data and reports with ease.

- __Lead Maintainer:__ [Dean McDonnell][lead]
- __Sponsor:__ [nearForm][]

## Running
To run the server,

1. Run `npm install` to install all dependencies
2. Setup influxdb (see below)
3. Run `npm run build` to build the project
4. Run `npm run start` to create a deploy and server on port `3000`
5. Log in with default user `admin@vidi.com` and password `vidi`

Also you can watch the files for changes and automatically rebuild the sources by running `npm run watch` 
in a different terminal.

## Setup influxdb
1. Install influxdb [help](https://influxdb.com/docs/v0.9/introduction/installation.html)
2. Run `influxd` in a separate window
3. Run `influx` in a separate window
4. In the `influx` window, type in `CREATE DATABASE seneca_msgstats`
5. In the `influx` window, type in `CREATE USER msgstats WITH PASSWORD 'msgstats' WITH ALL PRIVILEGES`
6. 

## Setup data
1. Add seneca-msgstats to each microservice you wish to track
2. Create a simple collector service to populate influx with the collected data


## Documentation

 This project is in it's infancy, documentation will come after stability.

## Contributing
The [Vidi: Insights][] encourages open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

- [Code of Conduct]

## License
Copyright (c) 2015, Dean McDonnell and other contributors.
Licensed under [MIT][].


[MIT]: ./LICENSE
[Code of Conduct]: https://github.com/nearform/vidi-contrib/docs/code_of_conduct.md
[Vidi: Insights]: https://github.com/nearform/vidi-contrib
[logo]: ./assets/vidi-logo.png
[lead]: https://github.com/mcdonnelldean
[nearForm]: http://www.nearform.com/
[NodeZoo]: http://www.nodezoo.com/
