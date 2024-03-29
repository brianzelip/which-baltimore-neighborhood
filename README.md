# which baltimore neighborhood

![GitHub package.json version](https://img.shields.io/github/package-json/v/brianzelip/which-baltimore-neighborhood) [![Netlify Status](https://api.netlify.com/api/v1/badges/f1aa9d24-1645-4d71-b2d1-299d022913ae/deploy-status)](https://app.netlify.com/sites/which-bmore-hood/deploys)

Geolocation progressive web app that tells you which Baltimore neighborhood you're in.

https://which-bmore-hood.netlify.app/

## Road map to v1.0.0

- [x] make it pretty 💅
- [ ] progressive web app-ify it 💪
- [ ] provide feedback to the user about the 4 classes of errors
  1. JavaScript is disabled
  2. your browser doesn't support geolocation
  3. your os appears to have disabled location services for your browser
  4. you appear to be outside the city of Baltimore
- [x] add an about modal or attribution links

## Data source

The geospatial data used in this project comes from the [_Neighborhoods_ dataset](https://data.baltimorecity.gov/datasets/baltimore::neighborhoods-3/about) published via [Open Baltimore](https://data.baltimorecity.gov/), the City of Baltimore's open data initiative. The _Neighborhoods_ dataset is described as

> Polygon feature representing the boundaries of Baltimore City's neighborhoods as of the year 2010.

See also the [developer docs for their new API](https://developers.arcgis.com/rest/services-reference/enterprise/query-feature-service-layer-.htm).
