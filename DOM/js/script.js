document.addEventListener("DOMContentLoaded",
	function(event){

		function sayHello(event){

			console.log(event);
			this.textContent = "Said it!";
			var name =  document.getElementById("name").value;
			var msg = "<h2>hello "+ name +"<h2>";
			//document.getElementById("content").textContent = msg;
			document.getElementById("content").innerHTML = msg;

			if (name === "student") {
				var title = document.querySelector("#title")
				                    .textContent;

				title += " and stupid";
				document.querySelector("h1").textContent = title;
			}

		}





		 //document.querySelector("button")
		 //        .addEventListener("click",sayHello);
		document.querySelector("button").onclick = sayHello;

		document.querySelector("body").addEventListener("mousemove",
			function(event) {
				if (event.shiftKey) {
					console.log("X:" + event.clientX);
					console.log("Y:" + event.clientY);
				};
			}
		);


	}

);
