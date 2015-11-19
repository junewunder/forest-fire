/* jshint -W097 */
/* jshint -W117 */
'use strict';

import { Automaton, DIRECTIONS } from './base.js';

export class ForestFire extends Automaton {
  constructor(width, height) {
    super(width, height);

    this.loseFireProb = 0.1;
    this.catchFireProb = 0.1;
    this.spreadTreeProb = 0.0025;
    this.spreadFireProb = 0.05;
    this.newTreeProb = 0.00001; // oringinal: 0.0001
    this.newFireProb = 0.00001; // oringinal: 0.00001
  }

  createMap() {
    super.createMap();

    this.iterMap((i, j) => {
      this.map[i][j] = new Tree();
    });
  }

  update() {
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
      }
    }
  }

  randomSpawns(i, j) {
    if (Math.random() < this.newTreeProb) {
      this.map[i][j].plant();
    }

    if (Math.random() < this.newFireProb) {
      if (this.map[i][j].id == TreeInfo.Tree.id) {
        this.map[i][j].heat();
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
