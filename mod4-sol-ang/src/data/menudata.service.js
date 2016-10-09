(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);


MenuDataService .$inject = ['$http','ApiBasePath'];
function MenuDataService ($http,ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {

    return $http({
        method: 'GET',
        url: (ApiBasePath + "/categories.json")
      }).then(function(response){
        var categories = response.data;

        return categories;

      });
  };

  service.getItemsForCategory = function(categoryShortName){
    return $http({
        method: 'GET',
        url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
      }).then(function(response){
        var items = response.data;
        return items;
      });
  };

};

})();
