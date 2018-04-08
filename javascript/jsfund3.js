var new_person = "Spencer";

console.log(personConstructor(new_person));

function personConstructor(name){
    var person = {
        name:name,
        distance_traveled : 0,
        say_name : function(){
            console.log(person.name);
        },
        say_something : function(phrase){
            console.log(person.name,"says",phrase);
        },
        walk : function(){
            console.log(person.name,"is walking.");
            person.distance_traveled += 3;
        },
        run : function(){
            console.log(person.name,"is running.");
            person.distance_traveled += 10;
        },
        crawl : function(){
            console.log(person.name,"is crawling.");
            person.distance_traveled += 1;
        }
    }
    return person;
}
var new_ninja;
function ninjaConstructor(name,cohort){
    var ninja_obj = {
        name:name,
        cohort:cohort,
        belt:'none',
        levelup : function(){
            if(ninja_obj.belt == "none"){
                ninja_obj.belt = "Yellow Belt";
            } else if (ninja_obj.belt == "Yellow Belt"){
                ninja_obj.belt = "Red Belt";
            } else if (ninja_obj.belt == "Red Belt"){
                ninja_obj.belt = "Black Belt";
            } else if (ninja_obj.belt == "Black Belt"){
                ninja_obj.belt = "Master";
            }
        }
    }
    return ninja_obj;
}

new_ninja = ninjaConstructor("Spencer","January");
console.log(new_ninja);
new_ninja.levelup();
console.log(new_ninja.belt);

new_ninja.levelup();
console.log(new_ninja.belt);
new_ninja.levelup();
console.log(new_ninja.belt);

new_ninja.levelup();
console.log(new_ninja.belt);

new_ninja.levelup();
console.log(new_ninja.belt);
