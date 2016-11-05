(function () {
'use strict';

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['menuItems','MenuService','$rootScope'];
function SignupController(menuItems,MenuService,$rootScope) {
  var SignupCtrl = this;
  SignupCtrl.menuItems = menuItems;
  var dishes = {};

  function prepareDishes() {
  	SignupCtrl.menuItems.menu_items.forEach(function(dish) {
  		dishes[dish.short_name] = true;
  	});
  };
  
  SignupCtrl.submit = function () {
  	SignupCtrl.invalidDish = false;
  	SignupCtrl.user.dish = SignupCtrl.user.dish.toUpperCase();
  	
  	if(!dishes[SignupCtrl.user.dish]){
  		SignupCtrl.invalidDish = true;
  		return;
  	};

  	MenuService.saveUserInfo(SignupCtrl.user);
  	SignupCtrl.submitted = true;

  };

	(function (){
  		if($rootScope.firstName){
  			SignupCtrl.submitted = true;
  		}
  		else {
  			SignupCtrl.submitted = false;
  			prepareDishes();
  		}


	})
  	();



}

})();
