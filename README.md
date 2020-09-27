<div align="center">
  <h1>gatsby-source-google-mymaps</h1>
  <br/>
  <p>
    <img src="./logo.png" alt="gatsby-source-google-mymaps" height="100px">
  </p>
  <br/>

[![Npm version][badge-npm]][npm]
[![Npm downloads][badge-npm-dl]][npm]
[![MIT license][badge-licence]](./LICENCE.md)
[![PRs welcome][badge-prs-welcome]](#contributing)

</div>

---

`gatsby-source-google-mymaps` is a [Gatsby](https://www.gatsbyjs.org/) plugin to use [Google MyMaps](https://www.google.com/maps/d) as a data source.

## Usage

1. Download `gatsby-source-google-mymaps` from the NPM registry:

```shell
yarn add gatsby-source-google-mymaps
```

2. Add the plugin in your `gatsby-config.js` file

```js
module.exports = {
    plugins: [
        {
            resolve: "gatsby-source-google-mymaps",
            options: {
                ids: ["MY_MAPS_ID_1", "MY_MAPS_ID_2"],
                // Optional
                name: "travels",
            },
        },
    ],
}
```

## Contributing

-   ⇄ Pull/Merge requests and ★ Stars are always welcome.
-   For bugs and feature requests, please [create an issue][github-issue].

## Changelog

See [CHANGELOG](./CHANGELOG.md)

## License

This project is licensed under the MIT License - see the
[LICENCE](./LICENCE.md) file for details

[badge-npm]: https://img.shields.io/npm/v/gatsby-source-google-mymaps.svg?style=flat-square
[badge-npm-dl]: https://img.shields.io/npm/dt/gatsby-source-google-mymaps.svg?style=flat-square
[badge-licence]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[badge-prs-welcome]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[npm-badge]: https://img.shields.io/npm/v/gatsby-source-google-mymaps.svg?style=flat-square
[npm]: https://www.npmjs.org/package/gatsby-source-google-mymaps
[github-issue]: https://github.com/cedricdelpoux/gatsby-source-google-mymaps/issues/new
