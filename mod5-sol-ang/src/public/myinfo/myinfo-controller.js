(function () {
'use strict';

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userInfo','MenuService','$rootScope','ApiPath','menuItem'];
function MyInfoController(userInfo,MenuService,$rootScope,ApiPath,menuItem) {
  var MyInfoCtrl = this;
  MyInfoCtrl.user = userInfo;
  MyInfoCtrl.basePath = ApiPath;
  MyInfoCtrl.menuItem = menuItem;


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
