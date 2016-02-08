# vidi-dashboard
Vidi: Dashboard is a composition of various Seneca modules and Hapi plugins to create an easy to use
Dashboard. The app is extensible, it allows you to plug in your own data and reports with ease.

- __Lead Maintainer:__ [Dean McDonnell][lead]
- __Sponsor:__ [nearForm][]

## Running
To run the self monitoring demo,

1. Clone [this repo](https://github.com/nearform/vidi-dashboard.git)
2. Run `docker-compose -f test/influx.yml up`
3. Run `npm install`
4. Run `npm run build`
5. Run `npm run start`
6. Run `npm run rig` to add a second system to the demo

Also you can watch the files for changes and automatically rebuild the sources by running `npm run watch`
in a different terminal.

## Documentation
This project is in it's infancy, documentation will come after stability.

## Contributing
The Vidi:Dashboard project encourages open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

- [Code of Conduct][]


## License
Copyright (c) 2015, Dean McDonnell and other contributors.
Licensed under [MIT][].

[here]: https://github.com/nearform/vidi-concorda-nodezoo-system
[MIT]: ./LICENSE
[Code of Conduct]: ./CoC.md
[lead]: https://github.com/mcdonnelldean
[nearForm]: http://www.nearform.com/
