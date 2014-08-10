/* global describe, it, beforeEach, afterEach */
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
  sinon.stub(git, 'log', function (opts, cb) {
    cb(null, readIn(file));
  });
};


describe('git-contributors', function () {

  describe('with --markdown option', function () {

    var opts = { cwd: '.', format: 'markdown' };

    beforeEach(function () {
    });

    afterEach(function () {
      git.log.restore();
    });


    it('can parse a single user commit', function (done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/single-user-single-commit.log';

      outFixture = 'test/fixtures/expected/single-user-single-commit.md';

      stubFixture(inFixture, opts);

      GitContributors.list(opts, function (err, result) {

        expect(err).to.not.exist;

        expect(result).to.equal(readIn(outFixture));

        done();
      });

    }); //it


    it('can parse multiple commits from a single user', function (done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/single-user-multiple-commit.log';

      outFixture = 'test/fixtures/expected/single-user-multiple-commit.md';

      stubFixture(inFixture, opts);

      GitContributors.list(opts, function (err, result) {

        expect(err).to.not.exist;

        expect(result).to.equal(readIn(outFixture));

        done();
      });

    }); //it


    it('can parse same user with different emails', function (done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/single-user-multiple-commit-different-mail.log';

      outFixture = 'test/fixtures/expected/single-user-multiple-commit-different-mail.md';

      stubFixture(inFixture);

      GitContributors.list(opts, function (err, result) {

        expect(err).to.not.exist;

        expect(result).to.equal(readIn(outFixture));

        done();
      });

    }); //it


    it('can parse options', function (done) {

      var inFixture, outFixture;

      inFixture = 'test/fixtures/actual/single-user-multiple-commit-different-mail.log';

      outFixture = 'test/fixtures/expected/single-user-multiple-commit-different-mail.md';

      stubFixture(inFixture, opts);

      GitContributors.list(opts, function (err, result) {

        expect(err).to.not.exist;

        expect(result).to.equal(readIn(outFixture));

        done();
      });

    }); //it

  });

});
