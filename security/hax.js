

function submitScore(score, thegrid, name){
    


    var request = new XMLHttpRequest();
    request.open("POST", "https://agile-coast-94400.herokuapp.com/submit", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function(){
        if (request.readyState == 4){

        }
    }  
    request.send("username=" + name + "&score=" + score + "&grid=" + thegrid);
}

submitScore(10, 0, "Zoosmell");