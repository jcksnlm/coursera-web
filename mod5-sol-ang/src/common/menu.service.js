(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath', '$rootScope'];
function MenuService($http, ApiPath, $rootScope) {
  var service = this;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (shortName) {
    var config = {};
    if (shortName) {
      config.params = {category: shortName};
    }

    return $http.get(ApiPath + '/menu_items.json', config ).then(function (response) {
      return response.data;
    });
  }


  service.getCategory = function (shortName) {
    return $http.get(ApiPath + '/categories/' + shortName + '.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItem = function(shortName) {
    
    return $http.get(ApiPath + '/menu_items/' + shortName + '.json').then(function(response) {
      return response.data;
    });
  };


  service.saveMenuItem = function (menuItem) {
    return $http.put(ApiPath + '/menu_items/' + menuItem.short_name, menuItem)
    .then(function (response) {
      return response.data;
    });
  };


    //simulate some kind of persistence
  service.saveUserInfo = function (user){
    
    $rootScope.firstName = user.firstName;
    $rootScope.lastName = user.lastName;
    $rootScope.email = user.email;
    $rootScope.phone = user.phone;
    $rootScope.dish = user.dish;

  };

  service.loadUserInfo = function (){
    var user = {};

    if ($rootScope.firstName){
      user.firstName = $rootScope.firstName;
      user.lastName = $rootScope.lastName;
      user.email = $rootScope.email;
      user.phone = $rootScope.phone;
      user.dish = $rootScope.dish;
    };

    return user;

  };

}



})();
