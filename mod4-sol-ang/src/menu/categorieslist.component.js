(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: ['TemplatesPath', function(TemplatesPath) {
  	return TemplatesPath + 'categorieslist.template.html'
  }],
  bindings: {
    categories: '<'
  }
});

})();
