# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
