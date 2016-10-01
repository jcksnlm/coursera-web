(function(){

	'use strict';

	//Please forgive me for this poorly written code.
	//I was in a rush.

	angular.module('NarrowItDownApp',[])
	.controller('SearchController',SearchController)
	.service('SearchServive', SearchServive)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath','http://davids-restaurant.herokuapp.com');
	;
	
	SearchController.$inject=['SearchServive'];
	function SearchController(SearchServive) {
		var search = this;
		search.items = new Array();
		search.nothingFound = false;


		search.getItems = function() {
			var promise;
			
			if (search.filter){
				search.nothingFound = false;
				promise = SearchServive.getItems(search.filter);

				promise.then(function(response) {
					var menuItems = response.data["menu_items"];

					search.items = SearchServive.getMatchedMenuItems(menuItems,search.filter);

					if (search.items.length === 0){
						search.nothingFound = true;
					};

				}); 

			}else{
				search.nothingFound = true;
			}
			
		};
		
		search.removeItem = function(index) {
			SearchServive.removeItem(search.items,index);
			if (search.items.length === 0 ){
				search.nothingFound = true;
			}
		};
	

	};


	SearchServive.$inject = ["$http","ApiBasePath"];
	function SearchServive($http,ApiBasePath) {
		var service = this;

		service.getItems = function(filter) {

			var response = $http({
				method: 'GET',
				url: (ApiBasePath + "/menu_items.json")
			})

			return response;

		};


		service.getMatchedMenuItems = function(data,filter) {
	    var filteredItems = new Array();
			
			data.forEach(function(item){
				
				var desc = item.description;

				if (typeof desc === "string"){
					desc = item.description.toLowerCase();
				};

				if (typeof filter === "string"){
					filter = filter.toLowerCase();
				};


				if (desc.indexOf(filter) !== -1) {
					
					filteredItems.push(item);
				};

			});
			
			return filteredItems;

		};

		service.removeItem = function(items,index) {
			items.splice(index,1);
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