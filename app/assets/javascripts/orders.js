var vueRef;
function OrdersClient() {
  function init() {
    Vue.component('products-table-component', {
      template: $('.products-table-template').text(),
      props: ['products']
    });
    var OrdersTableComponent = Vue.extend({
      template: $('.orders-table-template').text(),
      props: ['orders']
    });
    var OrderFormComponent = Vue.extend({
      template: $('.order-form-template').text(),
      props: ['orders'],
      data: function() {
        return {
          cheeses: ['Cheddar', 'American'],
          sauces: ['Tomato', 'Pomodoro'],
          sizes: ['Small', 'Medium', 'Big'],
          crusts: ['Thin', 'Thick', 'Filled with cheese'],
          slices_options: [8, 10, 12, 14, 16],
          order: {
            state: 'queued'
          },
          products: [],
          product: {
            food_id: 1,
            flavor_id: 1,
            food_name: "Pizza",
            sauce: 'Tomato',
            cheese: 'Cheddar',
            crust: 'Thick',
            size: 'Small',
            slices: 8,
            toppings: []
          }
        }
      },
      methods: {
        submit: function() {
          this.products.push(Object.assign({}, this.product));
        },
        makerOrder: function() {
          var body = {
            products_attributes: this.products
          }
          var self = this;
          $.ajax({
            type: "POST",
            url: 'http://localhost:3010/api/orders',
            data: body,
            dataType: 'JSON',
            success: function(data) {
              self.orders.unshift(data);
            }
          });
        }
      }
    });

    vueRef = new Vue({
      el: '.vue-app',
      components: {
        'orders-table-component': OrdersTableComponent,
        'order-form-component': OrderFormComponent
      },
      data: function() {
        var order = {
          state: 'queued'
        };
        return {
          orders: [{id: 1, state: 'q'}, {id: 2, state: 'q'}],
          order: order
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
              self.orders = data;
            },
          });
        },
        addorder: function(order) {
          this.orders.unshift(order);
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
  new OrdersClient();
});
