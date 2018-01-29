# LeafletTuto
Basic Leaflet Ionic 3

1. install

        npm install leaflet --save
        
2. command CSS Leaflet

        cp -a node_modules/leaflet/dist/images www/assets/
        cp node_modules/leaflet/dist/leaflet.css www/assets/

3. Import css in /www/index.html and src/index.html

        <link href="build/main.css" rel="stylesheet"> 
        <link href="assets/leaflet.css" rel="stylesheet"> 
            
4. In ionic page example map.ts

            import * as Leaflet from 'leaflet';
            
5. Use this code in map.ts


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
       }
  
6. in html page example map.html use

        <ion-content [attr.noScroll]="shouldScroll">
        <div id="map"></div>
        </ion-content>

7. in scss example map.scss use

        page-map {
          [noScroll] {
            overflow: hidden;
          }

          #map {
            height: 100%;
            width: 100%;
          }
        }



