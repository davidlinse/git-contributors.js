/* global describe, it */
/* jshint expr:true */

'use strict';

var _  = require('lodash'),
sinon  = require('sinon'),
chai   = require('chai'),
expect = chai.expect,

GitContributors = require('../').GitContributors;


describe('git-contributors', function () {

  describe('api', function () {

    it('is an object', function () {
      expect(GitContributors).to.be.an('object');
    });


    it('should have a #list method', function () {
      expect(GitContributors).to.have.property('list');
    });
  });


  describe('#list()', function () {

    // use current git-repo
    //
    it('should invoke callback', function (done) {

      GitContributors.list('.', function (err, result) {

        expect(err).to.not.exist;

        expect(result).to.be.an('array');

        var first = _.first(result);

        expect(first).to.contain.keys(['commits', 'name', 'percent', 'email']);

        done();
      });
    });


    it('should invoke callback with error', function (done) {

      var spy = sinon.spy();

      GitContributors.list('./not-existing-directory', spy);

      sinon.assert.called(spy);
      sinon.assert.calledWith(spy, new Error(), null);

      done();
    });


    it('should invoke callback with error', function (done) {

      GitContributors.list('./not-existing-directory', function(err, result) {
        expect(err).to.exist;
        expect(result).to.not.exist;
        done();
      });
    });


    it('should invoke callback with error and message', function (done) {

      var repo, msg;

      repo = './not-existing-directory';

      msg = 'Could not find .git repository at "'+ repo +'"';

      GitContributors.list(repo, function (err) {

        expect(err).to.exist;
        expect(err).to.have.property('message', msg);

        done();
      });
    });
  });
});
