const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const babel = require('gulp-babel');
const babelify = require("babelify");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');


gulp.task('build-js', function () {
    gulp.src('views/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ["es2015"]
        }))
        .pipe(uglify())
        .pipe(concat('bundle.min.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/javascripts'))
});

gulp.task('build-react', function() {
    // Assumes a file has been transformed from
    // ./app/src/main.jsx to ./app/dist/main.js
    return browserify({
		    entries: 'app/index.js',
		    debug: true,
		    standalone: 'bundle'
		 })
        .transform("babelify", { presets: ["env", "react"], plugins: ["transform-object-rest-spread"] })
        .bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
	        // Add transformation tasks to the pipeline here.
	        //.pipe(uglify())
	        .on('error', gutil.log)
    	.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/javascripts'))
});

gulp.task("default", function () {
  gulp.watch('app/**/*.js', ['build-react']);
});
