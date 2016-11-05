(function () {
'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userInfo','MenuService','$rootScope','ApiPath'];
function MyInfoController(userInfo,MenuService,$rootScope,ApiPath) {
  var MyInfoCtrl = this;
  MyInfoCtrl.user = userInfo;
  MyInfoCtrl.basePath = ApiPath;
  var dishes = {};


	(function (){
  		if($rootScope.firstName){
  			MyInfoCtrl.submitted = true;
  		}
  		else {
  			MyInfoCtrl.submitted = false;
  		}

	})
  ();



}

})();
