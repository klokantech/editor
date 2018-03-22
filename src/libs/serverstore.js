import request from 'request'

import tilehosting from './../config/tilehosting.json';
const configUrl = tilehosting.url + '/maps/style-editor/config.json';
import { loadStyleUrl } from './urlopen'


export class ServerStore {
  constructor(opts) {
    this.mapStyles = [];
    this.datasets = [];
    this.latestStyle = null;
  }

  init(cb) {
    request(configUrl, (error, response, body) => {
      if (!error && body && response.statusCode === 200) {
        const config = JSON.parse(body);
        this.mapStyles = config.maps;
        this.latestStyle = this.mapStyles[0];
        this.datasets = config.datasets;
        cb(null);
      } else {
        cb(new Error('Can not connect to style API'));
      }
    })
  }

  loadLatestStyle(cb) {
    if(this.latestStyle) {
      loadStyleUrl(this.latestStyle.style_url, cb);
    } else {
      throw new Error('No latest style available.');
    }
  }

  // Find the last edited style
  loadById(styleId, cb) {
    const styleInfo = this.getStyleInfo(styleId);

    if (styleInfo) {
      this.latestStyle = styleInfo;
      loadStyleUrl(styleInfo.style_url, cb);
    } else {
      this.loadLatestStyle(cb);
    }
  }

  // Find the last edited style
  knowsId(styleId) {
    return !!this.getStyleInfo(styleId);
  }

  // Find the last edited style
  getStyleInfo(styleId) {
    return this.mapStyles.find((style) => style.map_uid===styleId);
  }

  // Save current style replacing previous version
  save(mapStyle, cb) {
    const info = this.getStyleInfo(mapStyle.id);
    if(!info) {
      cb(new Error('Unknown style ID '+mapStyle.id));
    } else {
      request.put({
        url: info.style_url,
        json: true,
        body: mapStyle
      }, (error, response, body) => {
        cb(error);
      });
    }
  }

  purge() {
  }
}
