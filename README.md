Button Full Stack Coding Challenge
============================


First solution to the Button Full Stack Coding Challenge by [Arjun Kannan][0]

Based on the gulp-angular stack scaffolded with the excellent [Gulp Angular generator][1] for [Yeoman][2]

Basic structure
-------------
The code is organized using best practices from John Papa's [structuring guidelines][3] and [code style][4]. All of the source code is in the ```src``` folder, organized by component type.

The built, concatenated and minified version of the files are located in the ```dist``` folder. 

Getting started
-------------
To run the app, just open ```dist/index.html``` in your browser. Use the username ```admin``` and the password ```admin``` to log in and start using the app.

> **Note:**
> - To serve up the source code, you will need to do an ```npm install```, ```bower install``` and ```gulp serve``` inside the app folder

App structure
-------------
The app is structured on a per-component basis.  All the RESTful methods exposed by the [Fake Button API ][5] are exposed via Angular factories for injection and reusability through ```rest.factory.js```, ```user.factory.js```, ```transfer.factory.js``` and ```candidate.factory.js```. 

The corresponding controllers contain the business logic and UI behavior, and their associated partial ```.html``` files contain the display elements. CSS preprocessing and styling is done with Stylus.

The routing in the app is done with UI router which also helps with asynchronously loading dependencies into the associated controllers. 

Testing is facilitated through Karma and Protractor. Currently a few of Karma unit tests exist, with more to be added.

The ```intro.js``` library is used to provide interactive walkthroughs on each page of the app.

JSHint is used for code listing and Gulp is used for building and minification.

Assumptions
-------------

 - Transfers are tied to users. You cannot access a ```transfer``` without going through the ```user``` screen.
	 -  Transfers cannot be deleted without deleting the corresponding user.
 - The list of all candidates is handled through the ```user``` API via a distinct list of candidate names when all users are requested. 
	 - The ```FULLSTACK``` candidate name is currently **not** omitted from the list of candidates.
 - It is possible for an admin to add a new candidate namespace from the initial screen. 
	 - This is done through the ```user``` creation API specifying an 'Admin' user.
 - Authentication is currently handled via an ```AuthenticationFactory``` that provides a fake store for a single username and password.
	 - The assumption is that this will then be plugged into a real authentication API provided by a backedn in production
	 - The authentication is implemented using ```UI Router```, courtesy of [this handy guide][6]
	 - Cookies are used to store authentication state using the ```$cookie``` service
 - A full screen desktop use case is assumed for the optimal use case. The app is responsive but not optimized for the mobile use case


 [0]: https://github.com/arjshiv/
  [1]: https://github.com/Swiip/generator-gulp-angular
  [2]: http://yeoman.io
  [3]: http://www.johnpapa.net/angular-app-structuring-guidelines/
  [4]: https://github.com/johnpapa/angular-styleguide
  [5]: http://fake-button.herokuapp.com/docs/index.html
  [6]: http://www.seanmarchetti.com/authentication_with_angularui_router.html
  [7]: http://bramp.github.io/js-sequence-diagrams/
  [8]: http://adrai.github.io/flowchart.js/
