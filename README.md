# react-leaflet-d3-hexbin
React wrapper for the Hexbin layer from @Asymmetrik/leaflet-d3

Highly influenced by [mhasbie/react-leaflet-d3](https://github.com/mhasbie/react-leaflet-d3) but without limiting the input to GeoJson Data

I made it because I wanted to mimmic the behaviour of [Open Data Stuttgart Air Polution map](http://opendata-stuttgart.github.io/feinstaub-map/#2/0.0/0.0) but in a react application


Props: 
```
data: PropTypes.array, // The data points that need to be visualized
tooltip: PropTypes.object, // The tooltip object to be provided to the leaflet-d3 layer
colorScaleRange: PropTypes.array, // The range of the colors for the hexbin
colorScaleDomain: PropTypes.array, // The domain definition of the colors for the hexbin
colorValueFunc: PropTypes.func, // Function that returns the intensity of a single hexgram. 
                                // By default it's the count of points but can be changed 
                                // to be based on the data provided for the items inside the hexagon.
radiusValueFunc: PropTypes.func, // How the radius of the hexagon changes
latFunc: PropTypes.func.isRequired, // How to extract the lattitude from a data point
lngFunc: PropTypes.func.isRequired  // How to extract the longityde from a data point
```
