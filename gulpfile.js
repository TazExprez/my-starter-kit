var gulp = require("gulp");
// gulp.task("printName", function () {
//   console.log("My name is Joe.");
// });

// gulp.task("printAge", function () {
//   console.log("I am 30 years old.");
// });

// Whenever you simply run gulp without any task name, it will just run the default task.  In this case the default task will run printName and printAge in the order you placed them in the array.
// gulp.task("default", ["printName", "printAge"]);

// Here we are declaring the sass variable and we are going to require that new package that we just brought in as gulp-sass.
// Joe is using var here for preference.  We're not using ES6 here, so might as well keep everything the same.
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync");
var reload = browserSync.reload;
var cleanCSS = require("gulp-clean-css");
var sourcemaps = require("gulp-sourcemaps");
// This is needed in order to add webpack to gulp.
var shell = require("gulp-shell");

// gulp.task("sass", function () {
//   return (
//     gulp
// In this line you are getting the SASS file.
// Any folder inside the scss folder that has scss files, or any scss file, will get imported and going to get the SASS run on them.
// .src("./src/scss/**/*.scss")
// In this line you are applying SASS to the file.
// This is the SASS that is run on scss files inside the scss folder.
// .pipe(sass().on("error", sass.logError))
// This pipe is for the gulp-autoprefixer.  Before we export the files that have been run through SASS, we want to run them through this pipe.  With these files, before you export them, we want you to run the autoprefixer on them.
// Once SASS is run on the scss files and they are converted into css, we are going to run this other pipe on them, which is going to add all of the vender prefixes to the css files.
// .pipe(
//   autoprefixer({
//     browsers: ["last 2 versions"]
//   })
// )
// Here you are sending the processed CSS to a css folder.
// After the vendor prefixes have been added, we are going to export all of the css files to the /public/css folder.
//       .pipe(gulp.dest("./public/css"))
//   );
// });

// Now we are going to use gulp watch.  This is how you actually watch over files and you see if there are any changes.

// Automatically what we said is that the default task is to run the SASS file, the SASS task. And then, from there, once that is done, and it compiles it to main.css, any changes that we do to the SASS, it will still be waiting there to run SASS again.
// gulp.task("default", ["sass"], function () {
// What we are saying inside of the gulp.watch() arguments is that if any file or any folder that has any files inside of the scss folder, if there are any changes in any file there, we are going to run the sass task.
// Two stars, **, mean any folder inside of this folder.  And then we are saying any file of any folder, or any file inside of the scss folder, **/*, if any changes happen inside of the scss folder, what we are going to do is that we are going to run the styles, which is the sass task.
// If any files change inside of the ./src/scss folder, inside of sass, the sass task is going to run.
//   gulp.watch("./src/scss/**/*", ["sass"]);
// });

// When gulp.watch is running, you'll notice that the cursor in the Terminal or Command Prompt stays blinking.  This means that gulp.watch is just watching, it's waiting for you to make any changes.

// If you run gulp sass, it runs one time and that's it.  If you want it to run constantly, then you actually have to run a watch.  Joe normally likes to just run gulp, so he puts it all on the default.  He basically says "Hey, I want to run my task."  And once the task is done, he wants to be able to be watching all of his files, so that that way he doesn't have to continue pressing gulp and gulp and gulp and gulp.  This way he only does it one time.  Once he wants to turn it off, he just presses Control + C, and that's it, it stops.

gulp.task("webpack", function () {
  return (
    gulp
      // The source is going to be all JavaScript.
      .src("*.js", { read: false })
      // This is going to run webpack as a task.
      // This is going to be like how we've been doing by typing webpack in the Terminal.  But now we have control of it using gulp different tasks.  I have actually been typing yarn webpack because I am using yarn.
      .pipe(
        shell([
          "webpack"
          // 'yarn webpack'
        ])
      )
      // This is to reload the page once everything from webpack is compiled.
      .pipe(browserSync.stream())
  );
});

// Now we are going to add an extra .pipe in here to show you why setting open to true in the server settings in the "browser-sync" gulp task can be annoying.
gulp.task("sass", function () {
  return (
    gulp
      .src("./src/scss/**/*.scss")
      .pipe(sass().on("error", sass.logError))
      .pipe(
        autoprefixer({
          browsers: ["last 2 versions"]
        })
      )
      .pipe(gulp.dest("./public/css"))
      // This .pipe has browserSync reload the page after everything above this .pipe, in the "sass" task, is done.
      .pipe(browserSync.stream())
  );
});

gulp.task("browser-sync", function () {
  browserSync.init({
    // Here we have the location of the files that we are going to use on the server.  The files that we want to use on the server are going to be in the /public folder.
    server: "./public",
    notify: false,
    // We are going to be doing this true for now, but it's up to you if you want to keep it open.  Joe changed this to false on his own starter kit because sometimes he didn't want it to open a new tab every single time that he ran the task.  What this does is basically open up a new Chrome window for you.  This is cool at first, but it can get annoying.  Joe prefers to have just one window open and the first time he runs gulp he reloads the page himself that one time.  If this feature was turned on, every time you even just change the background color and save this, a new window would open up.
    // open: true
    open: false
  });
});

// I think that this gulp task is wrong and doesn't make sense.  That's probably why Joe changed it.  Maybe it's right and makes sense.
// gulp.task("sass:minify", function () {
//   return (
//     gulp
//       .src("./src/scss/**/*.scss")
//       .pipe(sass().on("error", sass.logError))
//       .pipe(
//         autoprefixer({
//           browsers: ["last 2 versions"]
//         })
//       )
//       // Before we send the css to the destination, we're going to basically clean the css, we are going to minify it.  We are going to remove all spaces.
//       .pipe(cleanCSS({ compatibility: "ie8" }))
//       .pipe(gulp.dest("./public/css"))
//   );
// });

// Joe normally likes to use the gulp-sourcemaps, too.

// This is like the task before it but with gulp-sourcemaps.  Joe likes to use gulp-sourcemaps.
// We are going to overwrite everything that is inside of the /public/css folder.
gulp.task("sass:minify", function () {
  return (
    gulp
      .src("./public/css/*.css")
      // We are going to pipe the css through all of these pipes.
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(sourcemaps.write())
      // We're sending the minified css to the same place we found it.
      .pipe(gulp.dest("./public/css"))
  );
});

// In here we are going to run sass, and once we run sass, we are going to say run the browser task, which is the one right above sass:minify.
// When we were able to finally run this, it opened up a Safari window with the message "Cannot GET /" written at the top of the page.  The reason this happned is because we did not have an index.html file yet.
// gulp.task("default", ["sass", "browser-sync"], function () {
//   gulp.watch("./src/scss/**/*", ["sass"]);
// });

// Here we are first going to run sass, then webpack, and finally browser-sync.
gulp.task("default", ["sass", "webpack", "browser-sync"], function () {
  // We are going to run SASS whenever we see any changes inside of the scss folder.
  gulp.watch("./src/scss/**/*", ["sass"]);
  // We are going to run webpack whenever we see any changes inside of the js folder.
  gulp.watch("./src/js/**/*", ["webpack"]);
});

// Joe will normally have the browser window and the text editor side by side so that that way he can see the changes as they happen.

// We say, when we run gulp production, run sass:minify.  After that we should be fine.
gulp.task("production", ["sass:minify"]);

// Now we are going to integrate webpack into gulp.

// You can run the different gulp tasks by typing gulp production, or gulp sass, or gulp and whatever the task name is.  You can also just type gulp and the default task will be run.
