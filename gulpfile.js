/*,
  "devDependencies": {
    "gulp": "^3.9.0",
    "gulp-inject": "^1.5.0",
    "gulp-jscs": "^2.0.0",
    "gulp-jshint": "^2.0.0",
    "gulp-nodemon": "^2.0.4",
    "jshint": "^2.9.1-rc1",
    "jshint-stylish": "^2.1.0",
    "wiredep": "^2.2.2"
  },
*/
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'public/**/*.js', 'server/**/*.js', '!public/vendor/**/*.js'];

gulp.task('style', function () {
    gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css',
                             './public/js/*.js'
                             ,'./public/app/**/*.js'], {
        read: false
    });
    var injectOptions = {
        ignorePath: '/public'
    };
    var options = {
        verbose: true,
        bowerJson: require('./bower.json'),
        directory: './public/vendor',
        ignorePath: '../../public'
    };

    return gulp.src(['./server/includes/*.jade']) //,'./server/**/*.jade'] )
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./server/includes/'));
});

gulp.task('nodemon', ['style', 'inject'], function () {
    var options = {
        script: 'server.js',
        delayTime: 1,
        env: {
            'PORT': 3030,
            'NODE_ENV': 'development'
        },
        watch: jsFiles
    };
    return nodemon(options)
        .on('restart', ['style'], function (ev) {
            console.log('Restarting .....');
            console.log('File changed on restart:\n' + ev);
        })
        .on('start', function (ev) {console.log('Starting .....');})
        .on('crash', function (ev) {console.log('CRASH  .....');})
        .on('exit', function (ev) {console.log('Clean exit .....');})
    ;
});
