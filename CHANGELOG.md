# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2019-11-19

### Meta

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

### Meta

- branch: master
- description: get basic functionality working
  - get geolocation
  - get neighborhood data from city

### Added

- data/
- index.html
- main.js
- readme.md
