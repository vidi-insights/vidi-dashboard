![Banner][]


# vidi-dashboard

- __Lead Maintainer:__ [Dean McDonnell][Lead]
- __Sponsor:__ [nearForm][Sponsor]

Vidi: Dashboard is a web app used to chart metrics from Vidi: Metrics.

- __Work in progress:__ This module is currently a work in progress.

## Running
To run the self monitoring demo,

1. Clone [this repo](https://github.com/vidi-insights/vidi-dashboard.git)
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
The [Vidi: Insights org][Org] encourages __open__ and __safe__ participation.

- [Code of Conduct][CoC]

If you feel you can help in any way, be it with documentation, examples, extra testing, or new
features please get in touch.

## License
Copyright (c) 2016, Dean McDonnell and other contributors.
Licensed under [MIT][].

[Banner]: https://raw.githubusercontent.com/vidi-insights/org/master/assets/vidi-banner.png
[Lead]: https://github.com/mcdonnelldean
[Sponsor]: http://www.nearform.com/
[Org]: https://github.com/vidi-insights
[CoC]: https://github.com/vidi-insights/org/blob/master/code-of-conduct.md
[MIT]: ./LICENSE
