(function(){

	'use strict';

	angular.module('lunchCheckerApp',[])
		.controller('CheckerController',CheckerController);

	CheckerController.$inject=['$scope'];

	function CheckerController($scope) {
		$scope.msg='';

		$scope.check = function(){
			var counter = 0;
			var items = ($scope.list || "").split(',');

			items.forEach(function (item) {
				if (item)
					counter ++;
			});

			switch (true) {
				case counter == 0:
					$scope.msg = "Please enter data first"
					isValid(false);
					break;
				case counter <= 3:
					$scope.msg = "Enjoy!"
					isValid(true);
					break;
				default:
					$scope.msg = "Too much!"
					isValid(true);
			};

			function isValid(valid){
				if(valid){
					$scope.divStyle={color:'green'};
					$scope.textStyle={borderColor:'green'};
				}
				else{
					$scope.divStyle={color:'red'};
					$scope.textStyle={borderColor:'red'};
				};
			};

		};

	};


})();
