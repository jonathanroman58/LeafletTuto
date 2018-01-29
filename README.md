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


Tuto 2 Lat-Lon

1.  Install leaflet draw

        npm install leaflet-draw

2. Modidicate tsconfig.json

        "types":[
        "jquery",
        "leaflet",
        "leaflet-draw",
        "leaflet-markercluster"
        ],
3. use command leaflet-draw css

        cp -a node_modules/leaflet-draw/dist/images www/assets/
        cp node_modules/leaflet-draw/dist/leaflet.draw.css www/assets/
        cp node_modules/leaflet-draw/dist/leaflet.draw-src.css www/assets/
4. In page .ts example map.ts use 

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


      

