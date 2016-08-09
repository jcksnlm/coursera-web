var names = ["Yaakov", 
             "John", 
             "Jen", 
             "Jason", 
             "Paul", 
             "Frank", 
             "Larry", 
             "Paula", 
             "Laura", 
             "Jim"];

var firstLetter;
for (name in names) {
  firstLetter = names[name].substr(0,1);
  
  if (firstLetter.toUpperCase() == 'J' ) {
    byeSpeaker.speak(names[name]);
  } else {
    helloSpeaker.speak(names[name]);
  }
}
