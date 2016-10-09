(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider','TemplatesPath'];
function RoutesConfig($stateProvider, $urlRouterProvider,TemplatesPath) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: TemplatesPath + 'home.template.html'
  })
  .state('categories', {
    url: '/category-list',
    templateUrl: TemplatesPath + 'categories.template.html',
    controller: 'CategoriesController as catCtrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService){
        return MenuDataService.getAllCategories();
      }]
    }
  })
  .state('categoryItem',{
    url: '/category-items/{short_name}',
    templateUrl: TemplatesPath + 'category-items.template.html',
    controller: 'CategoryItemsController as itemsCtrl',
    resolve: {
      items: ['MenuDataService','$stateParams', function (MenuDataService,$stateParams){
        return MenuDataService.getItemsForCategory($stateParams.short_name);
      }]
    }
  })
  ;

}

})();
