var $          = require('jquery')
    , Backbone = require('backbone');

Backbone.$ = $;

var routes = {
  index: require('./routes/index.js')
};

var Router = Backbone.Router.extend({
  routes: {
    '': function () {
      routes.index.init();
    }
  }
});

var router = new Router();
Backbone.history.start();