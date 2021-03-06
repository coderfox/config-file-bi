config-file-bi
=====

[![Greenkeeper badge](https://badges.greenkeeper.io/coderfox/config-file-bi.svg)](https://greenkeeper.io/)
[![Build Status](https://img.shields.io/travis/coderfox/config-file-bi.svg?style=flat-square)](https://travis-ci.org/coderfox/config-file-bi)
[![Coveralls](https://img.shields.io/coveralls/coderfox/config-file-bi.svg?style=flat-square)](https://coveralls.io/github/coderfox/config-file-bi)
[![license](https://img.shields.io/github/license/coderfox/config-file-bi.svg?style=flat-square)](https://github.com/coderfox/config-file-bi/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/dt/config-file-bi.svg?style=flat-square)](https://www.npmjs.com/package/config-file-bi)
[![npm](https://img.shields.io/npm/v/config-file-bi.svg?style=flat-square)](https://www.npmjs.com/package/config-file-bi)

R/W config file management.

Install
-----

```
npm install config-file-bi --save
```

or

```
yarn add config-file-bi
```

Usage
-----

```TypeScript
import * as Config from "config-file-bi";

// previously only YAML format is supported
let config = new Config("./config.yaml");

// load config from file, which will automatically create
//     the file when file not exists
await config.pull();
// or
config.pullSync();

// and the not-creating file one
await config.pullWhenExists();
// or
config.pullSyncWhenExists();

// write config to file
await config.push();
// or
config.pushSync();

// get config by key
config.get("something");

// set config by key
config.set("something", data);

// set config by key, only when key exists
config.setWhenExists("something", data);

// throws error when key not exists for #get and #set
config.KeyNotExistsError
```

License
-----

```
The MIT License (MIT)
Copyright (c) 2016 coderfox

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```