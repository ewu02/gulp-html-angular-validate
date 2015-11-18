gulp-html-angular-validate
===================

[html-angular-validate](https://github.com/nikestep/html-angular-validate) linter plugin for Gulp.

Thanks to
[Nik Estep](https://github.com/nikestep) for html-angular-validate and creating the initial Gulp recipe

Installation
------------
```shell
npm install --save-dev gulp-html-angular-validate 
```

Options
-------
Uses all the [default html-angular-validate options](https://github.com/nikestep/html-angular-validate#options), but one has been added here to allow for custom log output if desired.

`reportFn` is an optional `function` that takes an array of file failure objects.  See below for usage.  An example array of file failure objects might look like this:

```json
[
    {
        "msg": "Start tag seen without seeing a doctype first. Expected e.g. '<!DOCTYPE html>'.",
        "line": 1,
        "col": 5
    },{
        "msg": "Element 'head' is missing a required instance of child element 'title'.",
        "line": 2,
        "col": 9
    }, {
        "msg": "Unclosed element 'div'.",
        "line": 53,
        "col": 12
    }
]
```

Usage
-----
```javascript
var gulp = require('gulp');
var validate = require('gulp-html-angular-validate');

gulp.task('html-lint', function () {
  var options = {
    customattrs: ['*'],
    customtags: ['*'],
    reportFn:function(fileFailures){
        for (var i = 0; i < fileFailures.length; i++) {
		    var fileResult = fileFailures[i];
		    gutil.log(fileResult.filepath);
		    for (var j = 0; j < fileResult.errors.length; j++) {
			    var err = fileResult.errors[j];
			    if (err.line !== undefined) {
				    gutil.log('[line' +err.line +', col: ' + err.col +'] ' +err.msg);
			    } else {
				    gutil.log(err.msg);
			    }
		    }
	    }
    }
  };
  gulp.src('htmlGlob')
    .pipe(validate(options));
})
```
