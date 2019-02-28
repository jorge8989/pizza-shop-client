var vueRef;
function OrdersClient() {
  function init() {
    console.log('init');
    var OrdersTableComponent = Vue.extend({
      template: $('.orders-table-template').text(),
      props: ['orders']
    });

    vueRef = new Vue({
      el: '.vue-app',
      components: {
        'orders-table-component': OrdersTableComponent
      },
      data: function() {
        return {
          orders: [{id: 1, state: 'q'}, {id: 2, state: 'q'}]
        };
      },
      methods: {
        getOrders: function() {
          var self = this;
          $.ajax({
            method: 'GET',
            url: 'http://localhost:3010/api/orders',
            dataType: 'JSON',
            success: function(data) {
              console.log(data);
              self.orders = data;
            },
          });
        }
      },
      mounted: function() {
        this.getOrders();
      }
    });
  }
  init();
}
$( window ).on( "load", function() {
  console.log('load');
  new OrdersClient();
});
