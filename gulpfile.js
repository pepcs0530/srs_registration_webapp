var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

var uglyFy = require('gulp-uglify');

gulp.task("start", function(){
    
    nodemon({
    
        script : 'app.js',
        ext : 'js',
        env : {
            PORT : 3000
        }
            ,
        ignore : ['./node_modules/**']
    })
    .on('restart', function(){
        console.log("Restarting the server");
    });
    
})