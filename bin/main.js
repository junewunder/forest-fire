/* jshint -W097 */
/* jshint -W117 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Forest = (function () {
  function Forest(width, height) {
    _classCallCheck(this, Forest);

    this.width = width || Math.floor($('.wrapper').width() / $('#sizeTest').width());
    this.height = height || Math.floor($('.wrapper').height() / $('#sizeTest').height());
    this.map = [];
    this.$mapElem = $('#map');

    this.createMap();
    this.createMapElem();

    this.loseFireProb = 0.1;
    this.catchFireProb = 0.1;
    this.spreadTreeProb = 0.0025;
    this.spreadFireProb = 0.1;
    this.newTreeProb = 0.0001;
    this.newFireProb = 0.00001;
  }

  _createClass(Forest, [{
    key: 'restart',
    value: function restart() {
      this.createMap();
      this.createMapElem();
    }
  }, {
    key: 'createMap',
    value: function createMap() {
      console.log('creating the map...');
      this.map = [];
      for (var i = 0; i < this.height; i++) {
        var row = [];
        for (var j = 0; j < this.width; j++) {
          row.push(new Tree());
        }this.map.push(row);
      }
    }
  }, {
    key: 'createMapElem',
    value: function createMapElem() {
      console.log('creating the map element...');
      this.$mapElem.text('');
      for (var i = 0; i < this.map.length; i++) {
        for (var j = 0; j < this.map[i].length; j++) {
          this.$mapElem.append('<span id="tree-' + j + '-' + i + '">' + this.map[i][j].symbol + '</span>');
        }
        this.$mapElem.append('<br>');
      }
    }
  }, {
    key: 'update',
    value: function update() {
      var _this = this;

      // console.log('updating');
      for (var i = 0; i < this.map.length; i++) {
        for (var j = 0; j < this.map[i].length; j++) {

          this.randomSpawns(j, i);

          switch (this.map[i][j].id) {
            case TreeInfo.Empty.id:
              break;

            case TreeInfo.Burning.id:
              this.spreadFires(j, i);

              if (Math.random() < this.loseFireProb) this.map[i][j].destroy();

              break;
            case TreeInfo.Heating.id:
              if (Math.random() < this.catchFireProb) this.map[i][j].burn();

              break;
            case TreeInfo.Tree.id:
              this.speadTrees(j, i);
              break;
          }

          this.render(j, i);
        }
      }
      window.setTimeout(function () {
        return _this.update();
      }, 1000 / 60);
    }
  }, {
    key: 'randomSpawns',
    value: function randomSpawns(x, y) {
      if (Math.random() < this.newTreeProb) {
        this.map[y][x].plant();
        // this.render(x, y);
      }

      if (Math.random() < this.newFireProb) {
        if (this.map[y][x].id == TreeInfo.Tree.id) {
          this.map[y][x].heat();
          // this.render(x, y);
        }
      }
    }
  }, {
    key: 'speadTrees',
    value: function speadTrees(x, y) {
      var positions = [[1, 1], [1, 0], [0, 1], [-1, -1], [-1, 0], [0, -1], [-1, 1], [-1, 1]];
      // var positions = [[2, 2], [2, 0], [0, 2], [-2, -2], [-2, 0], [0, -2], [-2, 2], [-2, 2]];
      for (var i = 0; i < positions.length; i++) {
        if (Math.random() < this.spreadTreeProb) {
          var xN = x + positions[i][0];
          var yN = y + positions[i][1];

          try {
            if (this.map[yN][xN].state == TreeInfo.Empty.state) this.map[yN][xN].plant();
          } catch (e) {}

          // this.render(x, y);
        }
      }
    }
  }, {
    key: 'spreadFires',
    value: function spreadFires(x, y) {
      var positions = [[1, 1], [1, 0], [0, 1], [-1, -1], [-1, 0], [0, -1], [-1, 1], [-1, 1]];
      for (var i = 0; i < positions.length; i++) {
        if (Math.random() < this.spreadFireProb) {
          var xN = x + positions[i][0];
          var yN = y + positions[i][1];

          try {
            if (this.map[yN][xN].state == TreeInfo.Tree.state) this.map[yN][xN].heat();
          } catch (e) {}

          // this.render(x, y);
        }
      }
    }
  }, {
    key: 'render',
    value: function render(x, y) {
      // console.log(`rendering (${x}, ${y})`);
      $('#tree-' + x + '-' + y).text(this.map[y][x].symbol);
    }
  }]);

  return Forest;
})();

var Tree = (function () {
  function Tree() {
    _classCallCheck(this, Tree);

    this.info = TreeInfo.Empty;
  }

  _createClass(Tree, [{
    key: 'destroy',
    value: function destroy() {
      this.state = TreeInfo.Empty;
    }
  }, {
    key: 'plant',
    value: function plant() {
      this.state = TreeInfo.Tree;
    }
  }, {
    key: 'heat',
    value: function heat() {
      this.state = TreeInfo.Heating;
    }
  }, {
    key: 'burn',
    value: function burn() {
      this.state = TreeInfo.Burning;
    }
  }, {
    key: 'id',
    get: function get() {
      return this.info.id;
    }
  }, {
    key: 'state',
    get: function get() {
      return this.info.state;
    },
    set: function set(thing) {
      this.info = thing;
    }
  }, {
    key: 'symbol',
    get: function get() {
      return this.info.symbol;
    }
  }]);

  return Tree;
})();

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
  }
};

var f = new Forest();
f.update();

var gui = new dat.GUI();
gui.add(f, 'loseFireProb', 0, 0.1);
gui.add(f, 'catchFireProb', 0, 0.1);
gui.add(f, 'spreadTreeProb', 0, 0.1);
gui.add(f, 'spreadFireProb', 0, 0.1);
gui.add(f, 'newTreeProb', 0, 0.1);
gui.add(f, 'newFireProb', 0, 0.1);
gui.add(f, 'restart');
//# sourceMappingURL=main.js.map
