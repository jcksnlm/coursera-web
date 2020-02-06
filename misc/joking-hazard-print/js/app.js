(function(){

	'use strict';

	angular.module('lunchCheckerApp',[])
		.controller('CheckerController',CheckerController);

	CheckerController.$inject=['$scope', '$http'];

	function CheckerController($scope, $http) {

        $scope.images = [];

		$scope.go = function(){
            $http.get('http://localhost:2000/getAll').then(function (response) {
                $scope.images = response.data.slice(1,20);
            });
		};


        (function() {
            $scope.go();
        }());


	};


})();
