import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    return (
      <div style={{ position: 'relative', width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden' }}>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: 26.8006, // IIIT Lucknow
            lng: 81.0253
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Marker position={{ lat: 26.8006, lng: 81.0253 }} name="IIIT Lucknow BloodBank Center" />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_GOOGLE_MAPS_API_KEY' // Replace with actual or keep mock
})(MapContainer);
