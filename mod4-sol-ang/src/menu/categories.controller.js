(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController)


CategoriesController.$inject = ['categories'];
function CategoriesController(categories) {
  var mainList = this;
  mainList.categories = categories;

}

})();
