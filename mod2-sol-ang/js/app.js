(function(){

	'use strict';

	angular.module('ShoppingListCheckOff',[])
	.controller('ToBuyShoppingController',ToBuyShoppingController)
	.controller('AlreadyBoughtShoppingController',AlreadyBoughtShoppingController)
	.service('ShoppingListCheckOffService',ShoppingListCheckOffService);
	;

	

	ToBuyShoppingController.$inject=['ShoppingListCheckOffService'];
	function ToBuyShoppingController(ShoppingListCheckOffService) {
		var toBuy = this;
		toBuy.items = ShoppingListCheckOffService.toBuy;

		toBuy.buy = function(index) {
			ShoppingListCheckOffService.buy(index);
		};
		
	};

	AlreadyBoughtShoppingController.$inject=['ShoppingListCheckOffService'];
	function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
		var bought = this;
		bought.items = ShoppingListCheckOffService.bought;

	};

	function ShoppingListCheckOffService(){
		this.toBuy = [
			{name: "Cookies", quantity: 10},
			{name: "Cars", quantity: 5},
			{name: "Houses", quantity: 6},
			{name: "Jet ski", quantity: 7},
			{name: "Koalas", quantity: 8}
		];

		this.bought = [];

		this.buy = function (index) {
			this.bought.push(this.toBuy.splice(index,1)[0]);
		};
	};


})();
