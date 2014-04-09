var Class         = require('./utils/Class')
  , observable = require('./utils/observable');

var Base = Class.extend({
  init: function () {
    this.something = observable();
    this.something.observe(function () {
      console.log(123);
    })
  }
});

var base = new Base();
var base2 = new Base();

base.something(123);
