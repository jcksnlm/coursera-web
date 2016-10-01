(function(){

	'use strict';

	//Please forgive me for this poorly written code.
	//I was in a rush.

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath','http://davids-restaurant.herokuapp.com');
	;
	
	NarrowItDownController.$inject=['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var search = this;
		search.items = new Array();
		search.nothingFound = false;


		search.getItems = function() {
			var promise;
			
			if (search.filter){
				search.nothingFound = false;
			

				promise = MenuSearchService.getMatchedMenuItems(search.filter);


				promise.then(function(response) {
					

					search.items = response;

 					
					if (search.items.length === 0){
						search.nothingFound = true;
					};

				}); 

			}else{
				search.nothingFound = true;
			}
			
		};
		
		search.removeItem = function(index) {
			search.items.splice(index,1);
			if (search.items.length === 0 ){
				search.nothingFound = true;
			}
		};
	

	};


	MenuSearchService.$inject = ["$http","ApiBasePath"];
	function MenuSearchService($http,ApiBasePath) {
		var service = this;

		service.getMatchedMenuItems = function(filter) {

			return $http({
				method: 'GET',
				url: (ApiBasePath + "/menu_items.json")
			}).then(function(response){
				var foundItems = response.data["menu_items"];
				var matchedItems = [];

				foundItems.forEach(function(item){
				
					var desc = item.description;

					if (typeof desc === "string"){
						desc = item.description.toLowerCase();
					};

					if (typeof filter === "string"){
						filter = filter.toLowerCase();
					};


					if (desc.indexOf(filter) !== -1) {
						
						matchedItems.push(item);
					};

				});
				
				return matchedItems;

			});


		};

	};


    
	function FoundItemsDirective() {
		var ddo = {
			templateUrl: '/founditems.template.html',
			scope: {
				items:'<',
				onRemove: "&"
			},
			controller:FoundItemsDirectiveController,
			controllerAs: "found",
			bindToController: true
		};

		return ddo;
	};


	function FoundItemsDirectiveController() {
		var found = this;
	};

   

})();