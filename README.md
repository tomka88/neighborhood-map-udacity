# neighborhood-map-udacity

### Overview

This project my 5th project for the Front End Nanondegree course at Udacity. The project shows a map and a list of popular burger places in Berlin. The user can search for the particular burger places he/she is interested in. By clicking on the list items the user can see further information about the burger joints.


### Dependencies and Libraries:
- Bootstrap
- JQuery
- Knockout Js

Please look at the [package.json](package.json) file for more details

### APIs used
- Google Maps API
- Foursquare API

### Building the Project

The project is using `node modules`, `gulp` and `bower`
1. Install the latest Node version through terminal:
	Click [here](https://nodejs.org/en/download/package-manager/#osx) for more info
	`brew install node`

2. Pull all the dependendcies from the package.json by running:
	`npm install`

3. Gulp is used for minifying the JS files in the `dist` folder and creating the CSS file from SASS. Run gulp in the terminal:
	`gulp`

4. Gulp creates the a minified js file in the [dist](dist/all.min.js) folder for the project.

5. Open [index.html](app/index.html) in your browser.


### References:

https://discussions.udacity.com/t/handling-google-maps-in-async-and-fallback/34282

http://knockoutjs.com/documentation/introduction.html

https://codepen.io/prather-mcs/pen/KpjbNN?editors=0010

https://codepen.io/SittingFox/pen/NGwZvm?editors=1010

https://stackoverflow.com/questions/19268196/wiring-an-ajax-call-in-knockout-js

https://stackoverflow.com/questions/38746416/ajax-data-binding-using-knockout-js

https://github.com/Pooja0131/FEND-Neighbourhood-Project5a

https://github.com/kacymckibben/project-5-app

https://stackoverflow.com/questions/12722925/google-maps-and-knockoutjs

http://jsfiddle.net/schmidlop/5eTRV/10/

https://stackoverflow.com/questions/32899466/using-knockout-js-and-google-maps-api

https://stackoverflow.com/questions/31970927/binding-knockoutjs-to-google-maps-infowindow-content

https://stackoverflow.com/questions/31970927/binding-knockoutjs-to-google-maps-infowindow-content

https://stackoverflow.com/questions/20718183/adding-google-maps-with-knockoutjs

http://www.hoonzis.com/knockoutjs-and-google-maps-binding/

http://jsfiddle.net/Wt3B8/23/

http://jsfiddle.net/stesta/2T3Db/

http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/
