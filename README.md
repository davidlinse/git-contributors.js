### git-contributors.js (0.1.5)

A [_Node.js_][nodejs] module providing contribution stats for your git repository.

This module utilize `$ git log --pretty=%an` to calculate and add the amount
of percental contribution of each committer to the output.

[![Build Status][travis_png]][travis_link] [![Dependency Status][dm_png]][dm_url]

[travis_png]: https://travis-ci.org/davidlinse/git-contributors.js.png?branch=master
[travis_link]: https://travis-ci.org/davidlinse/git-contributors.js
[dm_png]: https://david-dm.org/davidlinse/git-contributors.js.png
[dm_url]: https://david-dm.org/davidlinse/git-contributors.js

#### Usage

```sh
$ npm install -g git-contributors

$ git-contributors.js /path/to/repository-dir/
```

You can also `require` it somewhere in your node-module,

```js
// your-node-module.js
var GitContributors = require('git-contributors').GitContributors;
GitContributors.list('/path/to/repository-dir', function (err, result) {
    if (err) { throw err; }
    console.log(JSON.stringify(result, null, 2));
});
```

.. which gives you an _sorted_ array of results:

```js
[
  // sorted descending by commits (beautyfied)
  { commits: 200, name: 'Maja',  email: 'maja@hive', percent: 56.8 },
  { commits: 50,  name: 'Flip',  email: 'flip@meadow', percent: 31.1 },
  { commits: 10,  name: 'Willi', email: 'willi@sunflower', percent: 10.8 }
]
```

#### Requirements

```sh
$ node --version # 0.8+
$ git --version # 1.7+
```

#### Dependencies
* [lodash.js][lodash] (~2.4.1)


#### Tests

```sh
$ grunt test
// or
$ mocha --version # 1.7.4
$ mocha -R list test/
```

#### Reports

```sh
$ grunt plato
```


[semver]: http://semver.org
[lodash]: http://lodash.com
[mocha]: http://visionmedia.github.com/mocha/
[chai]: http://chaijs.com
[sinon]: http://sinonjs.org
[plato]: https://github.com/es-analysis/plato
[nodejs]: http://nodejs.org

#### Licence

(The MIT License)

Copyright (c) 2014 David Linse <davidlinse@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THEWARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
