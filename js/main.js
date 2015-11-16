/* jshint -W097 */
/* jshint -W117 */
'use strict';

const DIRECTIONS = [[1, 1], [1, 0], [0, 1], [-1, -1], [-1, 0], [0, -1], [-1, 1], [-1, 1]];

class Forest {
  constructor(width, height) {
    this.width = width || Math.floor($('.wrapper').width() / $('#sizeTest').width());
    this.height = height || Math.floor($('.wrapper').height() / $('#sizeTest').height());
    this.map = [];
    this.$mapElem = $('#map');
    this.running = true;

    this.createMap();
    this.createMapElem();

    this.loseFireProb = 0.1;
    this.catchFireProb = 0.1;
    this.spreadTreeProb = 0.0025;
    this.spreadFireProb = 0.05;
    this.newTreeProb = 0.00001; // oringinal: 0.0001
    this.newFireProb = 0.00001; // oringinal: 0.00001
  }

  restart() {
    this.createMap();
    this.createMapElem();
  }

  createMap() {
    console.log('creating the map...');
    this.map = [];
    for (let i = 0; i < this.height; i++){
      let row = [];
      for (let j = 0; j < this.width; j++)
        row.push(new Tree());
      this.map.push(row);
    }
  }

  createMapElem() {
    console.log('creating the map element...');
    this.$mapElem.text('');
    for (let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        this.$mapElem.append(
          `<span id="tree-${j}-${i}" class="emj">${this.map[i][j].symbol}</span>`
        );
      }
      this.$mapElem.append( '<br>' );
    }
  }

  update() {
    // console.log('updating');
    if (this.running) {
      for (let i = 0; i < this.map.length; i++) {
        for (let j = 0; j < this.map[i].length; j++) {

          this.randomSpawns(j, i);

          switch (this.map[i][j].id) {
            case TreeInfo.Empty.id:
              break;

            case TreeInfo.Burning.id:
              this.spreadFires(j, i);

              if (Math.random() < this.loseFireProb)
                this.map[i][j].destroy();

              break;
            case TreeInfo.Heating.id:
              if (Math.random() < this.catchFireProb)
                this.map[i][j].burn();

              break;
            case TreeInfo.Tree.id:
              this.speadTrees(j, i);
              break;
          }

          this.render(j, i);
        }
      }
    }
    window.setTimeout(() => this.update(), 1000 / 60);
  }

  randomSpawns(x, y) {
    if (Math.random() < this.newTreeProb) {
      this.map[y][x].plant();
    }

    if (Math.random() < this.newFireProb) {
      if (this.map[y][x].id == TreeInfo.Tree.id) {
        this.map[y][x].heat();
      }
    }
  }

  speadTrees(x, y) {
    for (let i = 0; i < DIRECTIONS.length; i++) {
      if (Math.random() < this.spreadTreeProb) {
        let xN = x + DIRECTIONS[i][0];
        let yN = y + DIRECTIONS[i][1];

        try {
          if (this.map[yN][xN].state == TreeInfo.Empty.state)
            this.map[yN][xN].plant();
        } catch (e) { }
      }
    }
  }

  spreadFires(x, y) {
    for (let i = 0; i < DIRECTIONS.length; i++) {
      if (Math.random() < this.spreadFireProb) {
        let xN = x + DIRECTIONS[i][0];
        let yN = y + DIRECTIONS[i][1];

        try {
          if (this.map[yN][xN].state == TreeInfo.Tree.state)
            this.map[yN][xN].heat();
        } catch (e) { }
      }
    }
  }

  render(x, y) {
    // console.log(`rendering (${x}, ${y})`);
    $(`#tree-${x}-${y}`).html(this.map[y][x].symbol);
  }
}

class Tree {
  constructor() {
    this.info = TreeInfo.Empty;
  }

  get id() {
    return this.info.id;
  }

  get state() {
    return this.info.state;
  }

  set state(thing) {
    this.info = thing;
  }

  get symbol() {
    return this.info.symbol;
  }

  destroy() {
    this.state = TreeInfo.Empty;
  }
  plant() {
    this.state = TreeInfo.Tree;
  }
  heat() {
    this.state = TreeInfo.Heating;
  }
  burn() {
    this.state = TreeInfo.Burning;
  }
}

var TreeInfo = {
  Empty: {
    id: 0,
    state: 'empty',
    symbol: '🍂'
  },
  Tree: {
    id: 1,
    state: 'tree',
    symbol: '🌲'
  },
  Heating: {
    id: 2,
    state: 'heating',
    symbol: '🍁'
  },
  Burning: {
    id: 3,
    state: 'burning',
    symbol: '🔥'
  },
};


var f = new Forest();
f.update();

var gui = new dat.GUI();
gui.add(f, 'loseFireProb', 0, 0.1);
gui.add(f, 'catchFireProb', 0, 0.1);
gui.add(f, 'spreadTreeProb', 0, 0.1);
gui.add(f, 'spreadFireProb', 0, 0.1);
gui.add(f, 'newTreeProb', 0, 0.001);
gui.add(f, 'newFireProb', 0, 0.001);
gui.add(f, 'restart');
gui.add(f, 'running');
