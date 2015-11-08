var mapSize = 5;
var tableSize = mapSize + 1;
var clicked = 0;

console.log("ready");
var grid = "";
grid += "<tr><th></th>";
for(var i = 1; i<tableSize; i++)
{
    grid += "<th>"+i+"</th>";
}
grid += "</tr>";
for(var i = 1; i<tableSize; i++)
{
    grid += "<tr><th>"+String.fromCharCode(i+64)+"</th>";
    for(var j = 1; j<tableSize; j++)
    {
    	grid += "<td></td>";
    }
    grid += "</tr>";
}

$("#map").html(grid);


function restart()
{
	$("td").removeAttr('checked');
	//this one seems dangerous
	$("td").removeAttr('style');
	clicked = 0;
}

$("td").click( function(){
    //win state: Make sure that most have been answered first
    //if all but one have been checked, need to make sure that
    //the last one wins
    if(clicked >= mapSize * mapSize * 0.8)
    {
        if(Math.random() > 0.7 || clicked == (mapSize*mapSize)-1)
        {
            //do something to win
        	$(this).css('background-image', 'url(http://img3.wikia.nocookie.net/__cb20130119235936/cityville/images/9/94/Viral_doublerainbow_pot_of_gold_64x64.png)');
            alert('nice one');
            //this is a hack to get around things
            $(this).attr('checked','1');
        }
    }
    if($(this).attr('checked') != 'checked')
    {
        console.log('doing it');
		var randImgNo = Math.floor((Math.random()*3) + 1);
		var randImg = "scribble-out"+randImgNo+".png";
		console.log(randImg);
    	$(this).css('background-image','url('+randImg+')');
        $(this).attr('checked', '1');
    	clicked++;
    }
    console.log(clicked);

});

console.log("loaded it all");