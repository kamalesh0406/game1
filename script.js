var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var text = document.getElementById("angle");
var fire =  document.getElementById("fire");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var tankHeight = 35;
var tankWidth = 40;
var player1X = canvas.width/5;
var player1Y = canvas.height-76;
var player2X = canvas.width -60;
var player2Y = canvas.height-76;
var Xend =0 ; var Yend =0;
var dx = 8; 
var dy =-4;
var fired = false;
var ballX = Xend;
var ballY = Yend;
var score= 0;
var music = document.createElement("audio");
music.src ="Bomb.mp3"
music.setAttribute("preload","auto");
music.setAttribute("controls","none");
music.style.display = "none";
document.body.appendChild(music);

function drawFire(){
	if(fired){
		ctx.fillStyle = "rgb(0,0,255)";
		ctx.arc(ballX,ballY,6,0,2*Math.PI ,true);
		ctx.fill();
		ctx.restore();
		ballX+=(Math.sin((Math.PI/2)-(angle*Math.PI/180))*dx);
		ballY+=dy;
		if(ctx.getImageData(ballX+3,ballY+3,3,3).data[1]===255){
			fired = false;
			dx = 8;
			dy =-4;
		}
		if(ballY<canvas.height/3.5 && ballX>canvas.width/2){
			dy = 2;
			dx = 6;
		}
		if(ballX>player2X && ballX <player2X+tankWidth && ballY<player2Y && ballY >player2Y-tankHeight){
			

			music.play();
			fired = false;
			dx = 8;
			dy =-4;
			score++;
		}

	}
}
function drawMountain(){
	ctx.beginPath();
	ctx.moveTo(0,canvas.height-40)
	ctx.lineTo(canvas.width/3,canvas.height-40)
	ctx.lineTo(canvas.width/2,canvas.height/3.5);
	ctx.lineTo(3*canvas.width/4,canvas.height-40);
	ctx.lineTo(canvas.width, canvas.height-40);
	ctx.lineTo(canvas.width, canvas.height);
	ctx.lineTo(0,canvas.height);
	
	ctx.fillStyle = "rgb(0,255,0)";
	ctx.fill();
	ctx.closePath();
}
function drawGun(angle){

	ctx.save();
	ctx.beginPath();
	ctx.strokeStyle = "blue"
	ctx.lineWidth = 6;
	ctx.moveTo(player1X,player1Y);
	Xend = player1X + (Math.sin((Math.PI/2)-angle*Math.PI/180)*tankWidth);
	Yend = player1Y - (Math.cos((Math.PI/2)-angle*Math.PI/180)*tankWidth);
	ctx.lineTo(Xend,Yend);
	ctx.rotate((angle*Math.PI/180));
	ctx.stroke()
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}
function drawTanks(){

	ctx.beginPath();
	ctx.rect(player1X,player1Y,tankWidth,tankHeight);
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.rect(player2X,player2Y,tankWidth,tankHeight);
	ctx.fillStyle = "blue";
	ctx.fill();
	ctx.closePath();
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);

	drawMountain();
	drawTanks();

	angle = text.value;

	drawGun(angle);
	drawFire();

	ctx.strokeStyle="white";
	ctx.font ="30px Arial";
	ctx.strokeText("Score "+score,30,40);
	window.requestAnimationFrame(draw);
}

draw();
fire.addEventListener("click",function(){
	ballX = Xend;
	ballY = Yend;
	fired = true;
})
