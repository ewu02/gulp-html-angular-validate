gulp-html-angular-validate
===================

[html-angular-validate](https://github.com/nikestep/html-angular-validate) linter plugin for Gulp.

Thanks to
[Panu Horsmalahti](https://github.com/nikestep) for html-angular-validate and creating the initial Gulp recipe

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
[html-angular-validate options](https://github.com/nikestep/html-angular-validate#options)
