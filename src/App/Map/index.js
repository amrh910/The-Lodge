import {Gmaps, Marker} from 'react-gmaps';
import React, { Component } from 'react';

const params = {key: '*token*'};

export default class Map extends Component {
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd = (e) => {
    console.log('onDragEnd', e);
  }

  onCloseClick = () => {
    console.log('onCloseClick');
  }

  onClick = (e) => {
    console.log('onClick', e);
  }

  render() {
    return (
    <Gmaps width={'250px'} height={'250px'} lat={this.props.lat} lng={this.props.long} zoom={14} params={params} onMapCreated={this.onMapCreated} scrollwheel={true}>
      <Marker lat={this.props.lat} lng={this.props.long} draggable={false} />
    </Gmaps>
    );
  }
}