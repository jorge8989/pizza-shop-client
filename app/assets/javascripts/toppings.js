var toppingVueRef;
function ToppingsClient() {
  function init() {
    var ToppingsTableComponent = Vue.extend({
      template: $('.toppings-table-template').text(),
      props: ['toppings'],
      data: function() {
        return {
          topping: {
            name: ''
          }
        }
      }
    });

    toppingVueRef = new Vue({
      el: '.toppings-vue-app',
      components: {
        'toppings-table-component': ToppingsTableComponent
      },
      data: function() {
        return {
          toppings: [],
        };
      },
      methods: {
        getToppings: function() {
          var self = this;
          $.ajax({
            method: 'GET',
            url: 'http://localhost:3010/api/toppings',
            dataType: 'JSON',
            success: function(data) {
              self.toppings = data;
              console.log(data);
            },
          });
        },
      },
      mounted: function() {
        this.getToppings();
      }
    });
  }
  init();
}
$( window ).on( "load", function() {
  new ToppingsClient();
});
