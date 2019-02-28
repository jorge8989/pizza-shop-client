var flavorVueRef;
function FlavorsClient() {
  function init() {
    var FlavorsTableComponent = Vue.extend({
      template: $('.flavors-table-template').text(),
      props: ['flavors'],
      data: function() {
        return {
          flavor: {
            name: ''
          }
        }
      }
    });

    flavorVueRef = new Vue({
      el: '.flavors-vue-app',
      components: {
        'flavors-table-component': FlavorsTableComponent
      },
      data: function() {
        return {
          flavors: [],
        };
      },
      methods: {
        getFlavors: function() {
          var self = this;
          $.ajax({
            method: 'GET',
            url: 'http://localhost:3010/api/flavors',
            dataType: 'JSON',
            success: function(data) {
              self.flavors = data;
              console.log(data);
            },
          });
        },
      },
      mounted: function() {
        this.getFlavors();
      }
    });
  }
  init();
}
$( window ).on( "load", function() {
  new FlavorsClient();
});
