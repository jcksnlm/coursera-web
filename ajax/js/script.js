// Event handling
document.addEventListener("DOMContentLoaded",
  function (event) {
    
    // Unobtrusive event binding
    document.querySelector("button")
      .addEventListener("click", function () {
        
        // Call server to get the name
        $ajaxUtils
          .sendGetRequest("http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=almirante+tamandare", 
                          fillContent,
                          true);
        //if not json
        /*
        function fillContent(text){
          var name = text;

              document.querySelector("#content")
                .innerHTML = name;
        };

        /*JSON*/

        function fillContent(JSONObj){
          var message = JSONObj.results[0].address_components[0].short_name;

              document.querySelector("#content")
                .innerHTML = message;
        }

        
      });
  }
);





