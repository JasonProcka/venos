(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'v-navigation',
      templateUrl: '/www/partials/navigation.html'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));