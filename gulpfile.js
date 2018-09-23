var gulp = require('gulp'), // npm install -g gulp
                            // npm install –save-dev gulp
    sass = require('gulp-sass'), // npm install gulp-sass --save-dev    
    cleanCSS = require('gulp-clean-css'), // npm install gulp-clean-css --save-dev    
    watch = require('gulp-watch'), // npm install --save-dev gulp-watch    
    browserSync = require('browser-sync').create(),// npm install browser-sync --save-dev    
    uglify = require('gulp-uglify'), // npm install --save-dev gulp-uglify    
    concat = require('gulp-concat'), // npm install --save-dev gulp-concat    
    pump = require('pump'), // npm install pump
    htmlmin  = require('gulp-htmlmin'), // npm i gulp-htmlmin --save-dev
    jsonminify = require('gulp-jsonminify'), // npm install gulp-jsonminify --save-dev
    imagemin = require('gulp-imagemin'), // npm install --save-dev gulp-imagemin
    traceur = require('gulp-traceur'), // npm install --save-dev gulp-traceur
    gulpif = require('gulp-if'),
    beautify = require('gulp-beautify');
    

//create varaible for src
// var sassSources = ['components/sass/style.scss'];
// var cleanCSSSources = ['builds/development/css/custom.css'];


//gulp tasks
//beautify js files
// gulp.task('beautify', ()=> {
//     gulp.src('builds/development/js/*.js')
//       .pipe(beautify({indent_size: 2}))
//       .pipe(gulp.dest('builds/production'))
//   });

// var condition = true; // TODO: add business logic 

// gulp.task('gulpif1', ()=> {
//  gulp.src('builds/development/js/*.js')
//    .pipe(gulpif(condition, uglify()))
//    .pipe(gulp.dest('builds/production'));
// });

var condition =  (file)=> {
    // TODO: add business logic 
    return false;
  }
   
  gulp.task('gulpif2', ()=> {
    gulp.src('builds/development/js/*.js')
      .pipe(gulpif(condition, uglify(), concat('min.js')))
      .pipe(gulp.dest('builds/production/js'));
  });

//compile sass to css
gulp.task('sass', () => {
    return gulp.src('components/sass/style.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('builds/development/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//minify css
gulp.task('cleanCSS', () => {
    return gulp.src('builds/development/css/custom.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('builds/development/css'))
});

//minify html
gulp.task('htmlmin', ()=> {
    return gulp.src('builds/development/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('builds/production'));
  });

//minify images  
gulp.task('imagemin', () =>
  gulp.src('builds/development/images/*')
      .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
      .pipe(gulp.dest('builds/production'))
);

//minify json
gulp.task('jsonminify',  ()=> {
    return gulp.src(['builds/development/js/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('builds/production'));
});
  
//minify js
gulp.task('compress',  (cb)=> {
    pump([
        gulp.src('builds/development/js/*.js'),
        uglify(),
        gulp.dest('builds/production')
    ],
        cb
    );
});

//concatenate js files to one js file
gulp.task('scripts',  ()=> {
    return gulp.src('builds/development/js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('builds/production'));
});

//compile es6 to es5
gulp.task('traceur', () =>{
gulp.src('builds/development/js/ES6/*.js')
    .pipe(traceur())
    .pipe(gulp.dest('builds/production'))
});

//watch task
gulp.task('watch', ['browserSync'], () => {
    gulp.watch('components/sass/*.scss', ['sass']),
        gulp.watch('builds/development/css/*.css', ['cleanCSS']),
        gulp.watch('builds/development/*.html', browserSync.reload),
        gulp.watch('builds/development/js/**/*.js', browserSync.reload)
});

//browser sync
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'builds/development/'
        },
    })
});


//default task
gulp.task('default',
 ['sass', 'cleanCSS', 'browserSync', 'scripts', 'compress',
  'htmlmin','jsonminify','imagemin','traceur','gulpif2', 'watch']) //default task for hirerarchy
