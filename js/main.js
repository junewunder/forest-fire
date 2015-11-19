/* jshint -W097 */
/* jshint -W117 */
'use strict';

import ForestFire from './forest-fire.js';

var f = new ForestFire();
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
