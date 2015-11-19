/* jshint -W097 */
/* jshint -W117 */
'use strict';

export const DIRECTIONS = [[1, 1], [1, 0], [0, 1], [-1, -1], [-1, 0], [0, -1], [-1, 1], [-1, 1]];

export class Automaton {
  constructor(width, height) {
    this.width = width || Math.floor($('.wrapper').width() / $('#sizeTest').width());
    this.height = height || Math.floor($('.wrapper').height() / $('#sizeTest').height());

    this.map = [];
    this.$mapElem = $('#map');
    this.running = true;

    this.createMap();
    this.createMapElem();
  }

  restart() {
    this.createMap();
    this.createMapElem();
  }

  mainloop() {
    if(this.running) {
      this.update();
      this.render();
    }
    window.setTimeout(() => this.mainloop(), 1000 / 60);
  }

  update() { }

  render() {
    for (let y = 0; i < this.map.length; i++) {
      for (let x = 0; j < this.map[i].length; j++) {
        $(`#tile-${x}-${y}`).html(this.map[y][x].symbol);
      }
    }
  }

  createMap() {
    this.map = [];
    for (let i = 0; i < this.height; i++){
      let row = [];
      for (let j = 0; j < this.width; j++)
        row.push(undefined);
      this.map.push(row);
    }
  }

  iterMap(func) {
    for (var i = 0; i < this.map.length; i++) {
      for (var j = 0; j < this.map[i].length; j++) {
        func(i, j);
      }
    }
  }

  createMapElem() {
    console.log('creating the map element...');
    this.$mapElem.text('');
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        this.$mapElem.append(
          `<span id="tile-${j}-${i}" class="tile">${this.map[i][j].symbol}</span>`
        );
      }
      this.$mapElem.append( '<br>' );
    }
  }
}
