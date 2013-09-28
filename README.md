### git-contributors.js (0.1.1)

A nodejs module providing contribution stats for your git repository.

It uses the result of `$ git log --pretty=%an` to calculate and add the amount of percental contribution of each committer to the output.

#### Synopsis
You can either `require` it somewhere in you node-module like ...

```bash
# your-node-module.js
var GitContributors = require('git-contributors').GitContributors;
GitContributors.list('/path/to/repository-dir', function (err, shortlog) {
    if (err) throw err;
    shortlog.forEach(function (contributor) {
        console.log(contributor.commits, contributor.name, contributor.percent);
    })
});
```
.. or execute it with an optional argument like ..

```bash
$ node git-contributors.js /path/to/repository-dir/
```

.. which gives you an (sorted) result array like ..

```JSON
[
    // sorted descending by commits (beautyfied)
    { commits: 200, name: 'Maja',  email: 'maja@hive', percent: '56.8 %' },
    { commits: 50,  name: 'Flip',  email: 'flip@meadow', percent: '31.1 %' },
    { commits: 10,  name: 'Willi', email: 'willi@sunflower', percent: '10.8 %' }
]
```

#### Requirements

```JavaScript
$ ruby -v #=> ruby 1.9.3p125
$ node --version #=> 0.8+
$ git --version #=> 1.7+
```

#### Dependencies
<strike>* [underscore.js][underscore] (1.4.4)</strike>
* [lodash.js][lodsh] (~2.0.0)


#### Developer Dependencies

* [mocha][mocha] (1.8.2)
* [chai][chai] (1.5.0)
* [sinon][sinon] (1.6.0)
* [plato][plato] (0.5.0)


#### Developer notes

* claim to follow versioning guide-lines proposed by [semver.org][semver]


#### Tests

```
$ mocha --version #=> 1.7.4
$ mocha -R list test/
```

#### Reports

```
$ grunt plato
```


#### TODO/Wishlist


* add `--plain` parameter to generate simple plaint-text file
* add `grouping` of comitters based on `user name`
* add `grouping` of comitters based on `user mail`



#### History

* 0.1.2
    + replace `underscore` in favour of `lodash`

* 0.1.1
    + add email of contributor

* 0.1.0 initial commit


[semver]: http://semver.org
[underscore]: http://underscorejs.org
[lodash]: http://lodash.com
[mocha]: http://visionmedia.github.com/mocha/
[chai]: http://chaijs.com
[sinon]: http://sinonjs.org
[plato]: https://github.com/es-analysis/plato


#### Licence

(The MIT License)

Copyright (c) 2013 David Linse <davidlinse@gmail.com>

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
