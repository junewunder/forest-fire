(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* jshint -W097 */
/* jshint -W117 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DIRECTIONS = exports.DIRECTIONS = [[1, 1], [1, 0], [0, 1], [-1, -1], [-1, 0], [0, -1], [-1, 1], [-1, 1]];

var Automaton = exports.Automaton = (function () {
  function Automaton(width, height) {
    _classCallCheck(this, Automaton);

    this.width = width || Math.floor($('.wrapper').width() / $('#sizeTest').width());
    this.height = height || Math.floor($('.wrapper').height() / $('#sizeTest').height());

    this.map = [];
    this.$mapElem = $('#map');
    this.running = true;

    this.createMap();
    this.createMapElem();
  }

  _createClass(Automaton, [{
    key: 'restart',
    value: function restart() {
      this.createMap();
      this.createMapElem();
    }
  }, {
    key: 'mainloop',
    value: function mainloop() {
      var _this = this;

      if (this.running) {
        this.update();
        this.render();
      }
      window.setTimeout(function () {
        return _this.mainloop();
      }, 1000 / 60);
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'render',
    value: function render() {
      for (var y = 0; i < this.map.length; i++) {
        for (var x = 0; j < this.map[i].length; j++) {
          $('#tile-' + x + '-' + y).html(this.map[y][x].symbol);
        }
      }
    }
  }, {
    key: 'createMap',
    value: function createMap() {
      this.map = [];
      for (var _i = 0; _i < this.height; _i++) {
        var row = [];
        for (var _j = 0; _j < this.width; _j++) {
          row.push(undefined);
        }this.map.push(row);
      }
    }
  }, {
    key: 'iterMap',
    value: function iterMap(func) {
      for (var i = 0; i < this.map.length; i++) {
        for (var j = 0; j < this.map[i].length; j++) {
          func(i, j);
        }
      }
    }
  }, {
    key: 'createMapElem',
    value: function createMapElem() {
      console.log('creating the map element...');
      this.$mapElem.text('');
      for (var _i2 = 0; _i2 < this.map.length; _i2++) {
        for (var _j2 = 0; _j2 < this.map[_i2].length; _j2++) {
          this.$mapElem.append('<span id="tile-' + _j2 + '-' + _i2 + '" class="tile">' + this.map[_i2][_j2].symbol + '</span>');
        }
        this.$mapElem.append('<br>');
      }
    }
  }]);

  return Automaton;
})();

},{}],2:[function(require,module,exports){
/* jshint -W097 */
/* jshint -W117 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForestFire = undefined;

var _base = require('./base.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ForestFire = exports.ForestFire = (function (_Automaton) {
  _inherits(ForestFire, _Automaton);

  function ForestFire(width, height) {
    _classCallCheck(this, ForestFire);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ForestFire).call(this, width, height));

    _this.loseFireProb = 0.1;
    _this.catchFireProb = 0.1;
    _this.spreadTreeProb = 0.0025;
    _this.spreadFireProb = 0.05;
    _this.newTreeProb = 0.00001; // oringinal: 0.0001
    _this.newFireProb = 0.00001; // oringinal: 0.00001
    return _this;
  }

  _createClass(ForestFire, [{
    key: 'createMap',
    value: function createMap() {
      var _this2 = this;

      _get(Object.getPrototypeOf(ForestFire.prototype), 'createMap', this).call(this);
      this.iterMap(function (i, j) {
        return _this2.map[i][j] = false;
      });

      // this.map = [];
      // for (let i = 0; i < this.height; i++){
      //   let row = [];
      //   for (let j = 0; j < this.width; j++)
      //     row.push(new Tree());
      //   this.map.push(row);
      // }
    }
  }, {
    key: 'update',
    value: function update() {
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
    }
  }, {
    key: 'randomSpawns',
    value: function randomSpawns(i, j) {
      if (Math.random() < this.newTreeProb) {
        this.map[i][j].plant();
      }

      if (Math.random() < this.newFireProb) {
        if (this.map[i][j].id == TreeInfo.Tree.id) {
          this.map[i][j].heat();
        }
      }
    }
  }, {
    key: 'speadTrees',
    value: function speadTrees(x, y) {
      for (var i = 0; i < _base.DIRECTIONS.length; i++) {
        if (Math.random() < this.spreadTreeProb) {
          var xN = x + _base.DIRECTIONS[i][0];
          var yN = y + _base.DIRECTIONS[i][1];

          try {
            if (this.map[yN][xN].state == TreeInfo.Empty.state) this.map[yN][xN].plant();
          } catch (e) {}
        }
      }
    }
  }, {
    key: 'spreadFires',
    value: function spreadFires(x, y) {
      for (var i = 0; i < _base.DIRECTIONS.length; i++) {
        if (Math.random() < this.spreadFireProb) {
          var xN = x + _base.DIRECTIONS[i][0];
          var yN = y + _base.DIRECTIONS[i][1];

          try {
            if (this.map[yN][xN].state == TreeInfo.Tree.state) this.map[yN][xN].heat();
          } catch (e) {}
        }
      }
    }
  }]);

  return ForestFire;
})(_base.Automaton);

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

},{"./base.js":1}],3:[function(require,module,exports){
/* jshint -W097 */
/* jshint -W117 */
'use strict';

var _forestFire = require('./forest-fire.js');

var _forestFire2 = _interopRequireDefault(_forestFire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var f = new _forestFire2.default();
f.mainloop();

var gui = new dat.GUI();
gui.add(f, 'loseFireProb', 0, 0.1);
gui.add(f, 'catchFireProb', 0, 0.1);
gui.add(f, 'spreadTreeProb', 0, 0.1);
gui.add(f, 'spreadFireProb', 0, 0.1);
gui.add(f, 'newTreeProb', 0, 0.001);
gui.add(f, 'newFireProb', 0, 0.001);
gui.add(f, 'restart');
gui.add(f, 'running');

},{"./forest-fire.js":2}]},{},[3]);
