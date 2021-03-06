var index = require('../index')

var expect = require('chai').expect

describe('gif2mp4', function() {
  it('should exist', function() {
    expect(index).to.exist
  });

  it('should have a handler', function() {
    expect(index.handler).to.be.a('Function')
  });

  it('should call context.done() after running smoothly', function(done) {
    var event = require('./test-input')
    var context = {
      done: function(err, message) {
        if (err) {
          done(err);
        } else if (message) {
          done(message);
        } else {
          done();
        }
      }
    }
    index.handler(event, context)
  });

  it('should call context.done(err) when errors pop up', function(done) {
    var event = {}
    var context = {
      done: function(err, message) {
        if (err) {
          done()
        } else if(message) {
          done()
        } else {
          done(new Error('Error - should have failed with bad event data'))
        }
      }
    }
    index.handler(event, context)
  })

  it('should reject invalid keys', function(done) {
    var event = require('./test-bad-input')
    var context = {
      done: function(err, message) {
        if (err) {
          done(err);
        } else if (message) {
          done();
        } else {
          done(new Error('Error - should have failed with bad event data'));
        }
      }
    }
    index.handler(event, context)
  })

})
