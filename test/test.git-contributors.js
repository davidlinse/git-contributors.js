
var _      = require('underscore'),
    mocha  = require('mocha'),
    sinon  = require('sinon'),
    chai   = require('chai'),
    should = chai.should(),
    expect = chai.expect,

    GitContributors = require('../');


describe('git-contributors', function (done) {

    describe('api', function () {

        it('is an object', function () {
            expect(GitContributors).to.be.an('object');
        });


        it('should have a #list method', function () {
            expect(GitContributors).to.have.property('list');
            expect(_.isFunction(GitContributors.list)).to.be.true;
        });
    });


    describe('#list()', function (done) {

        // use current git-repo
        //
        it('should invoke callback', function (done) {

            GitContributors.list('.', function (err, result) {

                expect(err).to.not.exist;

                expect(result).to.be.an('array');

                var first = _.first(result);

                expect(first).to.contain.keys(['commits', 'name', 'percent']);

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


        it('should invoke callback with error and message', function (done) {

            GitContributors.list('./not-existing-directory', function (err, data) {

                expect(err).to.exist;
                expect(err).to.have.property('message', 'Could not find .git repository at "./not-existing-directory"');

                done();
            });
        });
    });
});
