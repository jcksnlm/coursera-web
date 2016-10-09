(function () {
'use strict';

angular.module('MenuApp')
.component('categoryItemsList', {
  templateUrl: ['TemplatesPath', function(TemplatesPath) {
  	return TemplatesPath + 'category-itemslist.template.html'
  }],
  bindings: {
    items: '<'
  }
});

})();
