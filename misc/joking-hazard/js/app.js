(function(){

	'use strict';

	angular.module('lunchCheckerApp',[])
		.controller('CheckerController',CheckerController);

	CheckerController.$inject=['$scope', '$http'];

	function CheckerController($scope, $http) {
		$scope.gottenImage = [];

		$scope.go = function(){
            $http.get('http://explosm.net/rcg/view/').then(function (response) {
                var gottenHtml = response.data;
                var a = $(gottenHtml);
                for (var i = 0; i <=3 ; i++) {
                    $scope.gottenImage.push(a.find('img[src^="https://rcg-cdn.explosm.net/panels/"]')[i].src)
                }

                //debugger;
                console.log(gottenHtml);
            });


		};

	};


})();
