# which baltimore neighborhood

![GitHub package.json version](https://img.shields.io/github/package-json/v/brianzelip/which-baltimore-neighborhood) [![Netlify Status](https://api.netlify.com/api/v1/badges/f1aa9d24-1645-4d71-b2d1-299d022913ae/deploy-status)](https://app.netlify.com/sites/which-bmore-hood/deploys)

Work in progress geolocation web app that tells you which Baltimore neighborhood you're in.

https://bmore.space

## Road map to v1.0.0

- [ ] make it pretty 💅
- [ ] progressive web app-ify it 💪
- [ ] provide feedback to the user about the 3 classes of errors
  1. your browser doesn't support geolocation
  2. your os appears to have disabled location services for your browser
  3. you appear to be outside the city of Baltimore
- [ ] add an about modal or attribution links

## Data source

The geospatial data used in this project comes from [Open Baltimore Neighborhoods dataset](https://data.baltimorecity.gov/Neighborhoods/Neighborhoods/5cni-ybar), a "polygon feature representing the boundaries of Baltimore City's neighborhoods as of the year 2010".

See the [dev docs for this dataset](https://dev.socrata.com/foundry/data.baltimorecity.gov/h3fx-54q3).
