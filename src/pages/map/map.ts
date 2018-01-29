import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as Leaflet from 'leaflet';
import 'leaflet-draw';

declare const L: any; 

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

map: any;
data: any;
estado: any;

  constructor(public navCtrl: NavController) {

  }

  ngOnInit():void{
    this.drawMap();
  }

  drawMap(): void {
    this.map = Leaflet.map('map').setView([-0.1836298, -78.4821206], 13);
    Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'AppTuto',
      maxZoom: 18
    }).addTo(this.map);

    var drawnItems = new L.FeatureGroup().addTo(this.map);
    var drawControl = new L.Control.Draw({
      draw: {
        polygon: {
        showArea: true,
        shapeOptions: {
          color: 'red'
        },
        },
        polyline: {
        shapeOptions: {
          color: 'red'
        },
        },
        rect: {
        shapeOptions: {
          color: 'green'
        },
        },
        circle: {
        shapeOptions: {
          color: 'steelblue'
        },
        },
      },
      edit: {
        featureGroup: drawnItems
      }
});
this.map.addControl(drawControl);
this.map.on(L.Draw.Event.CREATED, function (event) {
const layer = event.layer;

drawnItems.addLayer(layer);
this.data = drawnItems.toGeoJSON();
console.log(this.data);
});

Leaflet.polygon([
  [-0.126332,-78.491907],
  [-0.12878,-78.48856],
  [-0.13922,-78.485727],
  [-0.147082,-78.483796],
  [-0.156362,-78.485341],
  [-0.154815,-78.48753],
  [-0.14734,-78.489847],
  [-0.145536,-78.491521,],
  [-0.135096,-78.493323],
  [-0.126332,-78.491907]
]).addTo(this.map);

    var map = this.map;

     //web location
     map.locate({ setView: true});

     //when we have a location draw a marker and accuracy circle
     function onLocationFound(e) {
       var radius = e.accuracy / 2;
 
       Leaflet.marker(e.latlng).addTo(map)
           .bindPopup("Estás dentro de los " + radius + "metros desde este punto").openPopup();
 
       Leaflet.circle(e.latlng, radius).addTo(map);
     }
     map.on('locationfound', onLocationFound);

    //alert on location error
    function onLocationError(e) {
      alert(e.message);
    }

    this.map.on('locationerror', onLocationError);
  }

  MostrarLatLon(){
    var map = this.map;
    var popup = L.popup();

      function onMapClick(e) {
          popup
              .setLatLng(e.latlng)
              .setContent("Hiciste clic en el mapa en " + e.latlng.toString())
              .openOn(map);
      }

      if(this.estado == 1){
      map.on('click', onMapClick);
      this.estado = 0;
    }else{
      map.off('click');
      this.estado = 1;
     
    }
    
  }

}
