import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Circle, Fill, Style, Icon } from 'ol/style';
import { Feature, Map, Overlay, View } from 'ol/index';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Point } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import * as olProj from 'ol/proj';
import OverlayPositioning from 'ol/OverlayPositioning';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit {
  map: Map;
  constructor(private routerArgs: ActivatedRoute) {}
  ngOnInit(): void {
    const place = olProj.fromLonLat([
      this.routerArgs.snapshot.params.long,
      this.routerArgs.snapshot.params.lat,
    ]);
    const point = new Point(place);
    this.map = new Map({
      target: 'paperchase-map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(point)],
          }),
          style: new Style({
            // image: new Circle({
            //   radius: 9,
            //   fill: new Fill({color: 'red'}),
            // }),
            image: new Icon({
              anchor: [0.5, 46],
              anchorXUnits: IconAnchorUnits.FRACTION,
              anchorYUnits: IconAnchorUnits.PIXELS,
              src: environment.path + '/assets/place.png',
            }),
          }),
        }),
      ],

      view: new View({
        center: place,
        zoom: 18,
      }),
    });

    this.map.addOverlay(
      new Overlay({
        positioning: OverlayPositioning.BOTTOM_CENTER,
        stopEvent: false,
        offset: [100, 0],
      })
    );
  }
}
