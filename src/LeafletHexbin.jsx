import L from 'leaflet';
import { MapLayer } from 'react-leaflet';
import '@asymmetrik/leaflet-d3';
import PropTypes from 'prop-types';

export default class LeafletHexbin extends MapLayer {
	static propTypes = {
		data: PropTypes.array,
		tooltip: PropTypes.object,
		colorScaleRange: PropTypes.array,
		colorScaleDomain: PropTypes.array,
		colorValueFunc: PropTypes.func,
		radiusValueFunc: PropTypes.func,
		latFunc: PropTypes.func.isRequired,
		lngFunc: PropTypes.func.isRequired
	}

	createLeafletElement( props ) {
		const {
			tooltip,
			colorScaleRange,
			colorScaleDomain,
			colorValueFunc,
			radiusValueFunc,
			latFunc,
			lngFunc
		} = props;

		let manualColorScaleDomain = false;

		if( colorScaleDomain ) {
			manualColorScaleDomain = true;
		}


		let hexLayer = L.hexbinLayer({ manualColorScaleDomain, ...props });

		this._setupHexLayerFromProps( hexLayer, {
			colorScaleRange,
			colorScaleDomain,
			colorValueFunc,
			radiusValueFunc,
			latFunc,
			lngFunc,
			tooltip
		});

		return hexLayer;
	}

	updateLeafletElement( fromProps, toProps ) {
		this._setupHexLayerFromProps( this.leafletElement, toProps );

		if( toProps.data ) {
			this.leafletElement.data( toProps.data );
		}
		else {
			this.leafletElement.data( null );
		}
	}

	componentDidMount() {
		const { layerContainer } = this.context;
		const { data } = this.props;

		this.leafletElement.addTo( layerContainer );
		if ( data.length ) {
			this.leafletElement.data( data );
		}
	}

	componentWillUnmount() {
		const { layerContainer, map } = this.context;
		this.leafletElement.data( null );
		map.removeLayer( this.leafletElement );
		layerContainer.removeLayer( this.leafletElement );
	}

	_setupHexLayerFromProps ( hexLayer, props ) {
		const {
			colorScaleRange,
			colorScaleDomain,
			colorValueFunc,
			radiusValueFunc,
			latFunc,
			lngFunc,
			tooltip
		} = props;


		if( tooltip ) {
			hexLayer.hoverHandler( L.HexbinHoverHandler.tooltip( tooltip ) );
		}

		if( lngFunc ) {
			hexLayer.lng( lngFunc );
		}

		if( latFunc ) {
			hexLayer.lat( latFunc );
		}

		if( colorScaleRange ) {
			hexLayer.colorScale().range( colorScaleRange );
		}

		if( colorScaleDomain ) {
			hexLayer.colorScale().domain( colorScaleDomain );
		}

		if( radiusValueFunc ) {
			hexLayer.radiusValue( radiusValueFunc );
		}

		if( colorValueFunc ) {
			hexLayer.colorValue( colorValueFunc );
		}

		hexLayer.redraw();
	}
}
