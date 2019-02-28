var foodVueRef;
function FoodsClient() {
  function init() {
    var FoodsTableComponent = Vue.extend({
      template: $('.foods-table-template').text(),
      props: ['foods'],
    });

    foodVueRef = new Vue({
      el: '.foods-vue-app',
      components: {
        'foods-table-component': FoodsTableComponent
      },
      data: function() {
        return {
          foods: [],
        };
      },
      methods: {
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
      },
      mounted: function() {
        this.getFoods();
      }
    });
  }
  init();
}
$( window ).on( "load", function() {
  new FoodsClient();
});
