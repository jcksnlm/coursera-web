(function(){

	'use strict';

	angular.module('lunchCheckerApp',[])
		.controller('CheckerController',CheckerController);

	CheckerController.$inject=['$scope', '$http'];

	function CheckerController($scope, $http) {

        $scope.images = [];
        $scope.pageAmt;

		$scope.go = function(){
            $http.get('http://localhost:2000/getYesImages').then(function (response) {
                $scope.images = response.data;
                $scope.pageAmt = Math.ceil($scope.images.length / 9);
                $scope.loaded = true;
            });
		};
        $scope.range = function(n) {
            return Array.from(Array(n).keys());
        };


        (function() {
            $scope.go();
        }());


	};


})();
