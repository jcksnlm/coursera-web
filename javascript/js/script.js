var company = new Object();

company.name = "facebook";
company.ceo = new Object();
company.ceo.name = "mark";
company.ceo.age = 34;
atr = "name";


function makeMultiplier(multiplier) {
  var myFunc = function (x) {
    return multiplier * x;
  };

  return myFunc;
};

var multiplyBy3 = makeMultiplier(3);

//console.log(multiplyBy3(4));



function doOperation(x, operation) {
	return operation(x);
}

var result = doOperation(5,multiplyBy3);
//console.log(result);


var a = {x: 7};

var b = a;

//console.log(a.x);

b.x = 0;

//console.log(a.x);








function Circle(radius) {
	this.radius = radius;
};

Circle.prototype.getArea = function() {
	return Math.PI * Math.pow(this.radius, 2) ;
};

var myCircle = new Circle(10);

//console.log(myCircle.getArea());




var literalCircle = {
	                 	radius:10,
                     	getArea:function () {
                     		var self = this;
                     		var increaseRadius = function(){
                     			this.radius = 20; // don't work because it will point to the root scope
                     			self.radius = 20;
                     		};
                     		increaseRadius();
                     		return Math.PI * Math.pow(this.radius, 2);
                     	}
                 	}



//console.log(literalCircle.getArea());



var array = new Array();

array[0] = "nome";
array[1] = 4;
array[2] = function(name){
							console.log("hueheuhe " + name)
						};
array[3] = {course: " HTML, CSS & JS"};


//console.log(array);
//array[2](array[0]);
//console.log(array[3].course);


var names = ["123",
            "asd",
            "!@#"];


for (var i=0; i < names.length; i++) {
	//console.log(names[i]);
}

names[100] = "100th name"


for (i=0; i < names.length; i++) {
	//console.log(names[i]);
}

var myObj = {
	name: "enoismano",
	course: "webdev",
	plataform:"web"
}

for (var atr in myObj){
	//console.log(atr + ": " + myObj[atr])
}

names.atr = "testeatr";

for (name in names){
	//console.log("nome é:" + names[name]);
}




function makeMultiplierB(multiplier) {
	
	function b() {
		console.log("multiplier is : " + multiplier);
	};
	b();

	return (
			function(x) {
				return multiplier * x;
			}
		);
};

var doubleAll = makeMultiplierB(2);
console.log(doubleAll(10));



