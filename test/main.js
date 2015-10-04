require('mocha');

var expect = require('chai').expect;
var File = require('gulp-util').File;
var assert = require('stream-assert');
var gulp = require('gulp');
var validate = require('../');

describe('gulp-html-angular-validate', function() {

  it('should ignore empty files', function(done) {
    var stream = validate();
    stream
      .pipe(assert.length(0))
      .pipe(assert.end(done));
    stream.write(new File());
    stream.end();
  });

  it('should emit error on streamed files', function(done) {
    gulp.src('./test/html/*', {buffer: false})
      .pipe(validate())
      .on('error', function(err) {
        expect(err.message).to.exist;
        done();
      });
  });

  it('should find validation failures', function(done) {
    gulp.src('./test/html/invalid.html')
      .pipe(validate())
      .on('error', function(err) {
        expect(err).to.have.length.above(0);
        done();
      });
  });

  it('should not find validation failures', function(done) {
    gulp.src('./test/html/valid.html')
      .pipe(validate())
      .on('error', function(err) {
        done(new Error('should not emit error'));
      })
      .pipe(assert.end(done));
  });
});

