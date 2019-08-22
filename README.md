# @36node/bus-op-sdk

[![version][0]][1] [![downloads][2]][3]

主要负责报警处置和工单系统。

## Install

```bash
yarn add @36node/bus-op-sdk
```

## Usage

```js
const SDK = require("@36node/bus-op-sdk");

const sdk = new SDK({ base: "http://localhost:3000" });
await sdk.alert.listAlerts();
await sdk.fault.listFaults();
await sdk.warning.listWarnings();
```

## Test

```sh
yarn test:int
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**module** © [36node](https://github.com/36node), Released under the [MIT](./LICENSE) License.

Authored and maintained by 36node with help from contributors ([list](https://github.com/36node/module/contributors)).

> GitHub [@36node](https://github.com/36node)

[0]: https://img.shields.io/npm/v/@36node/bus-op-sdk.svg?style=flat
[1]: https://npmjs.com/package/@36node/bus-op-sdk
[2]: https://img.shields.io/npm/dm/@36node/bus-op-sdk.svg?style=flat
[3]: https://npmjs.com/package/@36node/bus-op-sdk
