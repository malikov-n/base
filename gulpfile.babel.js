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

const paths = {
    src: 'src/',
    dist: 'dist/',
    style: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/style/'
    },
    script: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    }
}


//Удаляем папку сборки dist
export const clean = () => del(paths.dist);

// Сборка scss стилей
export const style = () => {
    return gulp.src(paths.style.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.style.dest));
}