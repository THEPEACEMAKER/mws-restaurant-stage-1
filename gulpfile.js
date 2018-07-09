var gulp = require('gulp');
var sass = require('gulp-sass'); 	
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');




gulp.task('default', ['styles','copy-html','copy-images', 'copy-sw', 'scripts-main', 'scripts-restaurant_info'],defaultTask);

function defaultTask(done) {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('./*.html', ['copy-html']);
  done();
}

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'copy-sw',
	'styles',
	'scripts-main-dist',
	'scripts-restaurant_info-dist'
]);

gulp.task('scripts-main', function() {
	gulp.src(['js/idb-library.js', 'js/idb-script.js', 'js/indexController.js', 'js/dbhelper.js', 'js/main.js'])
		// .pipe(babel())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-restaurant_info', function() {
	gulp.src(['js/idb-library.js', 'js/idb-script.js', 'js/indexController.js', 'js/dbhelper.js', 'js/restaurant_info.js'])
		// .pipe(babel())
		.pipe(concat('restaurant_info.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-main-dist', function() {
	gulp.src(['js/dbhelper.js', 'js/main.js'])
		// .pipe(sourcemaps.init())
		.pipe(babel({
            presets: ['env']
        }))
		.pipe(concat('main.js'))
		// .pipe(uglify())
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-restaurant_info-dist', function() {
	gulp.src(['js/idb-library.js', 'js/idb-script.js', 'js/indexController.js', 'js/dbhelper.js', 'js/restaurant_info.js'])
		// .pipe(sourcemaps.init())
		// .pipe(babel())
		.pipe(concat('restaurant_info.js'))
		// .pipe(uglify())
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('copy-html', function(){
	gulp.src('./*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function(){
	gulp.src('img/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('copy-sw', function(){
	gulp.src('./sw.js')
		.pipe(gulp.dest('dist/'));
});

gulp.task('styles', function(){ 
	gulp.src('sass/**/*.scss') 
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
			}))	
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/css'))	
});