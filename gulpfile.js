var gulp = require('gulp');
var sass = require('gulp-sass'); 	
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var babel = require('gulp-babel');




gulp.task('default', ['styles','copy-html','copy-images', 'copy-sw', 'scripts-main', 'scripts-restaurant_info', 'scripts-offline-script'],defaultTask);

function defaultTask(done) {
  gulp.watch('sass/**/*.scss', ['styles']);
  gulp.watch('./*.html', ['copy-html']);
  done();
}

gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'copy-sw-dist',
	'scripts-main-dist',
	'scripts-restaurant_info-dist',
	'scripts-offline-script-dist'
]);

gulp.task('scripts-main', function() {
	gulp.src(['js/dbhelper.js', 'js/main.js'])
		// .pipe(babel())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-restaurant_info', function() {
	gulp.src(['js/dbhelper.js', 'js/restaurant_info.js'])
		// .pipe(babel())
		.pipe(concat('restaurant_info.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-offline-script', function(){
	gulp.src(['js/indexController.js', 'js/idb-library.js', 'js/idb-script.js'])
		// .pipe(babel())
		.pipe(concat('offline-script.js'))			
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-main-dist', function() {
	gulp.src(['js/dbhelper.js', 'js/main.js'])
		.pipe(babel())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-restaurant_info-dist', function() {
	gulp.src(['js/dbhelper.js', 'js/restaurant_info.js'])
		.pipe(babel())
		.pipe(concat('restaurant_info.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-offline-script-dist', function(){
	gulp.src(['js/indexController.js', 'js/idb-library.js', 'js/idb-script.js'])
		.pipe(babel())
		.pipe(concat('offline-script.js'))			
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'));
});

// gulp.task('copy-idb-script-dist', function(){
// 	gulp.src(['js/indexController.js', 'js/idb-script.js'])
// 		.pipe(babel())
// 		.pipe(concat('idb-script.js'))	
// 		.pipe(uglify())
// 		.pipe(gulp.dest('dist/js'));
// });

gulp.task('copy-sw', function(){
	gulp.src('./sw.js')
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy-sw-dist', function(){
	gulp.src('./sw.js')
		.pipe(babel())
		.pipe(uglify())	
		.pipe(gulp.dest('dist/'));
});

gulp.task('copy-html', function(){
	gulp.src('./*.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function(){
	gulp.src('img/*')
		.pipe(gulp.dest('dist/img'));
});

gulp.task('styles', function(){ 
	gulp.src('sass/**/*.scss') 
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
			}))	
		.pipe(gulp.dest('dist/css'))	
});