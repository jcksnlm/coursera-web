(function () {
'use strict';

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['menuItems'];
function SignupController() {
  var SignupCtrl = this;

  //SignupCtrl.menuItems = menuItems;

  //console.log(SignupCtrl.menuItems);


  SignupCtrl.submit = function () {
    //signup.completed = true;
  };
}

})();