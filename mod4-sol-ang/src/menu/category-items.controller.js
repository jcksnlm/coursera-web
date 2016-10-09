(function (){
'use strict';

angular.module('MenuApp')
.controller('CategoryItemsController',CategoryItemsController)
;

CategoryItemsController.$inject = ['items']
function CategoryItemsController(items) {
	var itemsCtrl = this;
	itemsCtrl.categoryName = items.category.name;
	itemsCtrl.categoryShortName = items.category.short_name;
	itemsCtrl.items = items.menu_items;
};

})();