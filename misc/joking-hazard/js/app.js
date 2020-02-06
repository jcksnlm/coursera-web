(function(){

	'use strict';

	angular.module('lunchCheckerApp',[])
		.controller('CheckerController',CheckerController);

	CheckerController.$inject=['$scope', '$http'];

	function CheckerController($scope, $http) {
		$scope.gottenImage = '';


		$scope.go = function(){
            $http.get('http://localhost:2000/getnextimage').then(function (response) {
                $scope.gottenImage = response.data;

            });
		};

        $scope.classifyYes = function(){
            classify(true);
		};

        $scope.classifyNo = function(){
            classify(false);
		};

        function classify(vote) {
            var obj = {
                imgName: $scope.gottenImage,
                vote: vote
            };

            $http.post('http://localhost:2000/classify', obj).then(function (response) {
                $scope.go();
            });
        }

        (function() {
            $scope.go();

        }());


	};


})();
