$(function () {
	showLoading("#main-content");
	loadLinsters();
	
});

function loadLinsters(){
	navbarBlur();
};

function navbarBlur(){
	$("#navbarToggle").blur(function(event){
			var screenWidth = window.innerWidth;
			if (screenWidth < 768)
			{
				$("#collapsable-nav").collapse('hide');
			};

		});
};

function showLoading(selector){
	var html = "<div class='text-center'>";
	html += "<img src='images/ajax-loader.gif'/></div>";
	$(selector).html(html);
};




(function(global){

	var dc = {};

	var allCategoriesUrl = "http://davids-restaurant.herokuapp.com/categories.json";
	var categoriesTitleUrl = "snippet/categories-title-snippet.html";
	var categoriesHTML = "snippet/category-snippet.html";

	var menuItemsUrl = "http://davids-restaurant.herokuapp.com/menu_items.json?category=";
	var menuItemsTitleHTML = "snippet/menu-items-title.html";
	var menuItemHTML = "snippet/menu-item.html";

	var insertHtml = function(selector, html) {
		$(selector).html(html);
	};

	var insertProperty = function (string, propName, propValue){
		var propToReplace = "{{" + propName + "}}";
		string = string.replace(new RegExp(propToReplace,"g"),propValue);
		return string;
	};


	dc.loadMain = function(){
		var homeHtml = "snippet/home-snippet.html";
		$ajaxUtils.sendGetRequest(homeHtml,
								  handleMain,
								  false);

		function handleMain(responseText){
			$("#main-content").html(responseText);
		};
	};

	dc.loadMenuCategories = function (){
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(allCategoriesUrl,
								  buildAndShowCategoriesHTML,
								  true);

	};

	dc.loadMenuItems = function (categoryShort){
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(menuItemsUrl+categoryShort,
								  buildAndShowMenuItemHTML,
								  true);

	};

	function buildAndShowCategoriesHTML(categories) {
		
		$ajaxUtils.sendGetRequest(
			categoriesTitleUrl,
			function (categoriesTitleHtml){
				$ajaxUtils.sendGetRequest(
					categoriesHTML,
					function(categoriesHTML){
						switchMenuToActive();
						var categoriesViewHTML =
							buildCategoriesViewHtml(categories,
													categoriesTitleHtml,
													categoriesHTML);
						insertHtml("#main-content",categoriesViewHTML);
					},
					false);
			},
			false);
	};

	function buildCategoriesViewHtml(categories,categoriesTitleHtml,categoriesHTML){
		var finalHtml = categoriesTitleHtml;
		finalHtml += "<section class='row'>";

		for (var i = 0; i < categories.length; i++){
			var html = categoriesHTML;
			var name = "" + categories[i].name;
			var short_name = categories[i].short_name;
			html = insertProperty (html, "name", name);
			html = insertProperty (html,"short_name",short_name)
			finalHtml += html;
		};

		finalHtml += "</section>";
		return finalHtml;

	};


	function buildAndShowMenuItemHTML(categoryMenuItems){
		$ajaxUtils.sendGetRequest(
			menuItemsTitleHTML,
			function(menuItemsTitleHTML){
				$ajaxUtils.sendGetRequest(
					menuItemHTML,
					function(menuItemHTML){
						var menuItemsViewHTML = buildMenuitemsViewHTML(categoryMenuItems,
																	   menuItemsTitleHTML,
																	   menuItemHTML);
						insertHtml("#main-content",menuItemsViewHTML);
					},
					false
				);

			},
			false
		);
	};

	function buildMenuitemsViewHTML(categoryMenuItems,menuItemsTitleHTML,menuItemHTML){
		
		menuItemsTitleHTML = insertProperty(menuItemsTitleHTML,
											"name",
											categoryMenuItems.category.name);
		menuItemsTitleHTML = insertProperty(menuItemsTitleHTML,
											"special_instructions",
											categoryMenuItems.category.special_instructions);

		var finalHTML = menuItemsTitleHTML;
  		finalHTML += "<section class='row'>";

		var menuItems = categoryMenuItems.menu_items;
		var catShortName = categoryMenuItems.category.short_name;

		for (var i =0; i < menuItems.length; i++){
			var html = menuItemHTML;
			html = insertProperty(html,"short_name",menuItems[i].short_name);
			html = insertProperty(html,"catShortName",catShortName);
			html = insertItemPrice(html,"price_small",menuItems[i].price_small);
			html = insertItemPortionName(html,"small_portion_name",menuItems[i].small_portion_name);
			html = insertItemPrice(html,"price_large",menuItems[i].price_large);
			html = insertItemPortionName(html,"large_portion_name",menuItems[i].large_portion_name);
			html = insertProperty(html,"name",menuItems[i].name);
			html = insertProperty(html,"description",menuItems[i].description);

			if (i %2 !=0){
				html += "<div class='clearfix visible-lg-block visible-md-block'></div>";
			};

			finalHTML += html;
		};


		finalHTML += "</section>";
		return finalHTML;

	};

	var insertItemPrice = function (string, pricePropName, priceValue){
		
		if(!priceValue){
			return insertProperty(string, pricePropName, "");
		};

		priceValue = "$" + priceValue.toFixed(2);
		string = insertProperty(string, pricePropName, priceValue);

		return string;
	};

	var insertItemPortionName = function (string, portionPropName, portionValue){
		
		if(!portionValue){
			return insertProperty(string, portionPropName, "");
		};

		string = insertProperty(string, portionPropName, portionValue);

		return string;
	};


	var switchMenuToActive = function (){
		
		$("#navHomeButton").removeClass("active");

		var classes = $('#navMenuButton').attr('class');

		if (classes.indexOf("active") == -1){
			$("#navMenuButton").addClass("active");
		};
		
	};


	dc.loadMain();
	global.$dc = dc;



})(window);