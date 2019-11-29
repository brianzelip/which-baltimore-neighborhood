# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.10.0] 2019-11-29

- branch: error-handling
- description:
  - provide error messages to user
    1. JavaScript is disabled
    2. your browser doesn't support geolocation
    3. your os appears to have disabled location services for your browser
    4. you appear to be outside the city of Baltimore

### Updated

- index.html: Add `<noscript>`
- main.js:
  - Check for geo navigator feature
  - if no self coordinates return, throw error
  - if coords are not found in any Bmore neighborhood, throw outside city error

## [v0.9.0] 2019-11-25

- branch: topography-bg
- description: Add a svg background to the body via [Hero Patterns](http://www.heropatterns.com/)
  - use the Topography pattern, adapted for my design
  - dynamically set the svg's fill color based on app theme

### Added

- topography.js: create es6 module that exports a function that returns a string representing a css background-image url of a data encoded svg 🎉

### Updated

- main.js
  - import { dataImageUrl } from topography.js
  - set body.style.backgroundImage to default dark mode
  - update body.style.backgroundImage on color mode toggle click

## [v0.8.0] 2019-11-23

- branch: inline-css
- description:
  - refactor the css from inlined in the source index.html to an external css file to be inlined into the built index.html. This was spawned because I didn't like html being the project's main language as depicted via github. The reason the html file is so large is because of the css. So extracting it out to its own file will change that. For perf reasons, I'm going to inline the css into the built index.html file that is served via netlify.
  - the effect of using this inliner plugin also inlines the JS, so that the app is wholy contained in the built index.html file. I'll have to compare the fully served netlify files (ie: the state of bmore.space after merging this branch with master) to get the real numbers for before/after comparison

### Perf comparison analysis

This analysis was committed after bumping the version to v0.8.0.

#### Before inlining external css and js

- index.html: 1.88kb transferred, 37ms
- main.{PARCEL STRING}.js: 2.54kb transferred, 85ms

total: 4.42kb transferred, ~122ms

#### After inlining external css and js

- index.html: 3.94kb transferred, 39ms

total: 3.94kb transferred, ~39ms

#### Results

Inlining external css and js FTW 🎉

By the way - now GitHub lists css as the main language associated with the project :)

### Added

- dev dependency: [parcel-plugin-inliner](https://github.com/shff/parcel-plugin-inliner)
- css/hood.css: copy css from index.html

### Updated

- index.html: remove css, link to hood.css
- package.json: add `--public-url .` to build script via the inliner plugin docs:

> Very important!
>
> You have to run the build step in Parcel with the --public-url . option for the inliner to actually find the files. If you leave this out the default is /, and the inliner won't be able to look for the files in the right location.
>
> Example:
>
> `parcel build app/index.html --public-url .`

## [v0.7.0] 2019-11-23

- branch: color-themes
- description: Make a button to change the color theme

### Updated

- index.html: Add button w/ svg via jxnblk
- main.js: Add color theme selection logic

## [0.6.0] 2019-11-23

- branch: responsive
- description: Add responsive design

### Updated

- index.html: Add responsive styles to all UI

## [0.5.1] 2019-11-23

- branch: master
- description: Update UI design

### Updated

- readme: check some todos
- index.html
  - decrease `--shadow-thickness` for neighborhood name
  - removed the self-referential link at the top of the document
  - added a wrapper around the neighborhood text for adding some emphasis on the app's punchline. make the wrapper an anchor so the hood name's box-shadow remains only as wide as the name text
  - set neighborhood colors according to the theme
- main.js:
  - implement new neighborhood wrapper logic

## [0.5.0] 2019-11-22

- branch: basic styling
- description:
  - update styling
  - update markup
  - update app logic accordingly

### Added

- humans.text

### Updated

- index.html
  - add style tag to head
  - add metadata in head
  - add footer
  - update markup
- main.js
  - update logic according to new markup and class names
  - animate the rendering of neighborhood name and coordinates
  - copy the coordinates on click (only works in FF, chrome, android, opera)
  - make the neighborhood name into a link that searches wikipedia for the neighborhood, often leading directly to the neighborhood's wiki page

### Removed

- css/hood.css - deleted in favor of writing styles in index.html head

## [0.4.1] - 2019-11-21

- branch: d3
- description: Import only `polygonContains` from d3-polygon to decrease bundle size

### Updated

- main.js: Refactor import and usage of d3-polygon

### Performance result

This decreased the netlify-served js bundle from 2.46kb transferred to 2.30kb transferred 🎉

## [0.4.0] - 2019-11-20

- branch: master
- description: experiment on js bundle delivery

### Added

- parcel as dev-dependency
- d3-polygon as dependency

### Updated

- index.html: Removed the d3-polygon import
- main.js: Import d3-polygon
- .gitignore: Ignore Parcel output

### Experimentation 1 results

- local serving via http-server of the v0.3.0 js bundles:

  - d3-polygon: 1.33kb transferred
  - main.js: 1.85kb transferred

- w/ parcel that only bundles main.js

  - d3-polygon: 1.33kb transferred
  - main.{PARCEL STRING}.js: 2.20kb transferred

- w/ parcel that bundles both d3-polygon and main.js
  - main.{PARCEL STRING}.js: 5.71kb transferred

### Experimentation 1 analysis

Fuck parcel in this case! I find it so wack that introducing parcel nearly doubles the size of the bundle, even if it decreases the js bundle downloads from 2 to 1.

Here's another question: which is worse, 2 download bundles, each < 2kb, or 1 download bundle of 5.71kb?

Let's experiment!

### Experimentation 2 results

- 2 js bundle downloads, served via http-server, @ v0.3.0 state

  - d3-polygon: 1.33kb transferred, 32ms, 147ms, 27ms, 84ms, 136ms
  - main.js: 1.85kb transferred, 1ms, 1ms, 1ms, 1ms, 1ms

- 1 js bundle download, served via http-server, via parcel build

  - main.{PARCEL STRING}.js: 5.71kb transferred, 1ms, 2ms, 1ms, 1ms, 1ms

### Experimentation 2 analysis

The comparison of the two approaches is:

- the parcel route which yields a 5.71kb transferred bundle size, but only 1 bundle download, in only 1ms
- the index.html route which yields a 3.18kb transferred bundle size, but with 2 bundle downloads, in an average total time of 85ms

I'm inclined to decide not to use parcel, for the sake of prioritizing overall file size download on mobile over the matter of milliseconds that is at stake here.

However, I also want to use postcss in order to use autoprefixer for my future css work. Then there is also the future service worker implementation, which will be another js bundle. So perhaps I should go with parcel.

## [0.3.0] - 2019-11-19

- branch: master
- description: wire up [custom domain](https://bmore.space) w/ https via netlify

## [0.2.0] - 2019-11-19

- branch: master
- description: get d3-polygon working to filter neighborhoods by the user's geolocation

### Added

- changelog.md
- package-lock.json: via npm i, really just to be able to use my bump library which, as it currently stands, requires a lock file

### Updated

- index.html: import d3-polygon library
- main.js:
  - move all geolocation logic to the XHR.onload scope
  - given the user's geolocation coords, filter the neighborhood multipolygons for the neighborhood that contains the coords.

## [0.1.0] - 2019-11-18

- branch: master
- description: get basic functionality working
  - get geolocation
  - get neighborhood data from city

### Added

- data/
- index.html
- main.js
- readme.md
