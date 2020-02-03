(function(){

	'use strict';

	angular.module('lunchCheckerApp',[])
		.controller('CheckerController',CheckerController);

	CheckerController.$inject=['$scope', '$http'];

	function CheckerController($scope, $http) {
		$scope.gottenImage='';

		$scope.go = function(){
            $http.get('http://explosm.net/rcg/view/').then(function (response) {
                var gottenHtml = response.data;
                var a = $(gottenHtml);
                var b = a.find('img[src^="https://rcg-cdn.explosm.net/panels/"]')[0].src;
                $scope.gottenImage = b;

                //debugger;
                console.log(gottenHtml);
            });


		};

	};


})();
