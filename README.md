gulp-html-angular-validate
===================

[html-angular-validate](https://github.com/nikestep/html-angular-validate) linter plugin for Gulp.

Thanks to
[Nik Estep](https://github.com/nikestep) for html-angular-validate and creating the initial Gulp recipe

Installation
------------
```
npm install --save-dev gulp-html-angular-validate 
```

Usage
-----
```
var gulp = require('gulp');
var validate = require('gulp-html-angular-validate');

gulp.task('html-lint', function () {
  var options = {
    customattrs: ['*'],
    customtags: ['*'],
  };
  gulp.src('htmlGlob')
    .pipe(validate(options));
})
```

Options
-------
Uses all the options available to [html-angular-validate](https://github.com/nikestep/html-angular-validate#options)


Custom Gulp Options
-------
**Name**: `emitError`
**Type**: boolean
**Default**: `false`
**Description**: Set this to `true` if you want the gulp task to emit an error when validation failure occur.

**Name**: `errorInCallback`
**Type**: boolean
**Default**: `false`
**Description**: Set this to `true` if you want the gulp task's callback to return a message saying there were validation failures.