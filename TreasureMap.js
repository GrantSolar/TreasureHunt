var size = 5;
var clicked = 0;

emojione.imageType = 'png';
emojione.imagePathPNG = './emojione-master/assets/png/';
emojione.imagePathSVG = './emojione-master/assets/svg/';

var items = [":house:",":church:",":school:",":hospital:",":bank:",":hotel:",":office:",":classical_building:",":stadium:",":department_store:",":european_post_office:",":airplane:",":steam_locomotive:"];

function generate(size){
	console.log("ready");
	var tableSize = size + 1;
	console.log("Size: "+size);
	console.log("Table size: "+tableSize);
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
			var landmark = "";
			if(Math.random() <= 0.25)
			{
				landmark = items[Math.floor(Math.random()*items.length)];
				var landmarkImg = emojione.emojioneList[landmark];
				if(landmarkImg.length > 1)
					landmarkImg = landmarkImg[landmarkImg.length - 1];
				console.log("Using emoji "+landmark+" - "+landmarkImg);
				console.log(landmarkImg.toString().toUpperCase());
				landmarkImg = landmarkImg.toString().toUpperCase();
				grid += "<td style=\"background-image: url("+emojione.imagePathPNG+landmarkImg+".png)\"></td>";
			}
			else
				grid += "<td></td>";
		}
		grid += "</tr>";
	}
	$("#map").html(emojione.shortnameToImage(grid));
	
}


function restart()
{
	$("td").removeAttr('checked');
	//this one seems dangerous
	$("td").removeAttr('style');
	clicked = 0;
}

function resize()
{
	size = parseInt($("#sizeSelect").val());
	console.log(size);
	restart();
	$("#map").html("");
	generate(size);
	startHandler(size);
}

function startHandler(size){
	$("td").click( function(){
		//win state: Make sure that most have been answered first
		//if all but one have been checked, need to make sure that
		//the last one wins
		console.log(size*size*0.75);
		if(clicked >= Math.floor(size * size * 0.75))
		{
			if(Math.random() > 0.7 || clicked == (size*size)-1)
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
			var randImgNo = Math.floor((Math.random()*6) + 1);
			var randImg = "scribble-out"+randImgNo+".png";
			console.log(randImg);
			//$(this).css('background-image','url('+randImg+')');
			$(this).html("<img src=\""+randImg+"\"></img>");
			$(this).attr('checked', '1');
			clicked++;
		}
		console.log(clicked);

	});
}
console.log("loaded it all");

resize();
startHandler();
