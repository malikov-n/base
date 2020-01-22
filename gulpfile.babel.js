import gulp from 'gulp';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import del from 'del';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import include from 'gulp-include'; // Применение <!--=include relative/path/to/file.html -->
import livereload from 'browser-sync';

const paths = {
    src: 'src/',
    dist: 'dist/',
    live: 'dist/',
    style: {
        src: 'src/scss/*.scss',
        dest: 'dist/style/',
        watch: 'src/scss/**/*.scss'
    },
    script: {
        src: 'src/js/*.js',
        dest: 'dist/js/',
        watch: 'src/js/**/*.js'
    },
    html: {
        src: 'src/*.html',
        dest: 'dist/',
        watch: 'src/**/*.html'
    }
}


//Удаляем папку сборки dist
export const clean = () => del(paths.dist);

// Сборка scss стилей
export const style = () => gulp.src(paths.style.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.style.dest))
    .pipe(livereload.stream())


// сборка js файлов
export const script = () => gulp.src(paths.script.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.script.dest))
    .pipe(livereload.stream())

// сборка html 
export const html = () => gulp.src(paths.html.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(include())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.html.dest))
    .pipe(livereload.stream())

//watch 
export const watchFiles = () => {
    gulp.watch(paths.style.watch, style)
    gulp.watch(paths.script.watch, script)
    gulp.watch(paths.html.watch, html)
}


//live-reload 

export const live = () => {
    livereload.init({
        port: 3000,
        server: {
            baseDir: paths.live
        }
    })
}

//build проекта 
export const build = gulp.series(clean, gulp.parallel(style, script, html));

//live-reload с обновлениями
const streaming = gulp.parallel(html, style, script, watchFiles, live);

export default streaming;