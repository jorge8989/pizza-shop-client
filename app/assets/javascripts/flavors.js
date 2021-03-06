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
      },
      methods: {
        submit: function() {
          var self = this;
          $.ajax({
            type: "POST",
            url: 'http://localhost:3010/api/flavors',
            data: self.flavor,
            dataType: 'JSON',
            success: function(data) {
              self.flavors.push(data);
              self.flavor.name = null;
            }
          });
        },
        destroy: function(id) {
          var self = this;
          $.ajax({
            type: "DELETE",
            url: 'http://localhost:3010/api/flavors/' + id,
            dataType: 'JSON',
            success: function(data) {
              self.flavors = self.flavors.filter(function(fl) {
                return fl.id != id;
              });
            }
          });
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
