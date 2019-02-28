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
      props: ['orders', 'foods', 'flavors'],
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
            food_id: null,
            flavor_id: null,
            food_name: null,
            sauce: null,
            cheese: null,
            crust: null,
            size: null,
            slices: 8,
            toppings: []
          },
          customizableFields: [
            'flavor_id',
            'sauce',
            'cheese',
            'crust',
            'size',
            'slices'
          ]
        }
      },
      methods: {
        onfoodchange: function() {
          var self = this;
          var food = this.foods.find((food) => {
            return food.id == this.product.food_id;
          });
          this.product.food_name = food.name;
          if (!food.customizable) {
            this.customizableFields.forEach(function(field) {
              self.product[field] = null;
            });
            this.product.topping = [];
          } else {
            this.product.slices = 8;
          }
        },
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
              self.products = [];
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
        'order-form-component': OrderFormComponent,
      },
      data: function() {
        var order = {
          state: 'queued'
        };
        return {
          orders: [],
          order: order,
          flavors: [],
          foods: [],
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
        getFoods: function() {
          var self = this;
          $.ajax({
            method: 'GET',
            url: 'http://localhost:3010/api/foods',
            dataType: 'JSON',
            success: function(data) {
              self.foods = data;
            },
          });
        },
        getFlavors: function() {
          var self = this;
          $.ajax({
            method: 'GET',
            url: 'http://localhost:3010/api/flavors',
            dataType: 'JSON',
            success: function(data) {
              self.flavors = data;
            },
          });
        },
        addorder: function(order) {
          this.orders.unshift(order);
        }
      },
      mounted: function() {
        this.getOrders();
        this.getFoods();
        this.getFlavors();
      }
    });
  }
  init();
}
$( window ).on( "load", function() {
  new OrdersClient();
});
