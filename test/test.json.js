/* global describe, beforeEach, afterEach */
/* jshint expr:true, indent:2, maxlen:92 */

'use strict';

var fs     = require('fs'),
    sinon  = require('sinon'),
    chai   = require('chai'),
    git    = require('../lib/gitlog'),
    expect = chai.expect,

    GitContributors = require('../').GitContributors;


var readIn = function readIn (file) {
  return fs.readFileSync(file, 'utf-8');
};

var stubFixture = function stubFixture (file) {
  sinon.stub(git, 'log').returns(readIn(file));
};


describe('git-contributors', function () {

  describe('json support', function () {

    beforeEach(function () {
    });

    afterEach(function () {
      git.log.restore();
    });

    it('--markdown=false --json=true returns a stringified json object', function(done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/single-user-multiple-commit.log';
      stubFixture(inFixture);

      outFixture = readIn('test/fixtures/expected/single-user-multiple-commit.json');

      // beautify string
      outFixture = JSON.stringify(JSON.parse(outFixture));

      GitContributors.list({cwd: '.', markdown: false, json: true}, function (err, result) {
        expect(err).to.not.exist;
        expect(result).to.deep.eql(outFixture);
        done();
      });
    });

    it('--markdown=true --json=true returns stringified array', function(done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/single-user-multiple-commit.log';

      // outFixture = readIn('test/fixtures/expected/single-user-multiple-commit.md');

      stubFixture(inFixture);

      outFixture = '["+ John Doe <john@doe.com>  (3 - 100%)"]';

      GitContributors.list({cwd: '.', markdown: true, json: true}, function (err, result) {

        expect(err).to.not.exist;
        expect(result).to.exist;
        expect(result).to.eql(outFixture);

        done();
      });
    });
  });
});
