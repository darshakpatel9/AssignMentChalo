import React from 'react';
import { GoogleMap, LoadScript, Polyline } from '@react-google-maps/api';
import { connect } from 'react-redux';
const containerStyle = {
  width: '100%',
  height: '600px',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

class Map extends React.Component {
  componentDidUpdate = () => {
    console.log(this.props.selectedRoutesCord);
  };
  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyAUq5AvYt0S4uG86QRy6uA0t7i0JOqpx-c">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={3}>
          {this.props.selectedRoutesCord &&
            this.props.selectedRoutesCord.map(path => {
              const color =
                '#' + Math.floor(Math.random() * 16777215).toString(16);
              return (
                <Polyline
                  path={path}
                  options={{
                    strokeColor: color,
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: color,
                    fillOpacity: 0.35,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    visible: true,
                    radius: 30000,
                    paths: path,
                    zIndex: 1,
                  }}
                />
              );
            })}
        </GoogleMap>
      </LoadScript>
    );
  }
}
const mapStateToProps = state => {
  return {
    selectedRoutesCord: state.selectedRoutesCord,
  };
};
export default connect(mapStateToProps)(Map);
