'use strict';

var gutil = require('gulp-util');
var path = require('path');
var pluginName = require('./package').name;
var through = require('through2');
var htmlValidate = require('html-angular-validate');

function defaultReportFn(fileFailures) {
	
	gutil.log(gutil.colors.red('Found validation failures'));
	for (var i = 0; i < fileFailures.length; i++) {
		var fileResult = fileFailures[i];
		gutil.log(fileResult);
		gutil.log(gutil.colors.yellow(fileResult.filepath));
		for (var j = 0; j < fileResult.errors.length; j++) {
			var err = fileResult.errors[j];
			if (err.line !== undefined) {
				gutil.log(gutil.colors.red('  --[' +
				  err.line +
				  ':' +
				  err.col +
				  '] ' +
				  err.msg));
			} else {
				gutil.log(gutil.colors.red('  --[fileResult] ' + err.msg));
			}
		}
	}
}

function validate(file, options, cb) {
  var self = this;
  htmlValidate.validate(file.path, options).then(function(result) {
    self.push(file);
    if (result.allpassed) {
      cb();
    } else {
      if (options.reportFn) {
	      options.reportFn(result.failed);
      } else {
      	defaultReportFn(result.failed);
      }
      cb();
    }
  }, function(err) { // Unable to validate files
    gutil.log(gutil.colors.red('htmlangular error: ' + err));
    cb(err);
  });
};

module.exports = function(options) {
  options = options || {};

  var stream = through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb();
    }
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError(pluginName, 'Streams are not supported!'));
      return cb();
    }
    if (file.isBuffer()) {
      validate.call(this, file, options, cb);
    }
  });
  return stream;
}
