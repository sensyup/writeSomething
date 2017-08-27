var canvasWidth=Math.min(600 , $(window).width() - 40);
var canvasHeight=canvasWidth;

var canvas=document.getElementById("mycanvas");
var clearbtn=document.getElementById("clear");
var context=canvas.getContext("2d");

clearbtn.onclick = function(e){
	context.clearRect(0,0,canvas.width,canvas.height);  
	drawGrid();
}

canvas.width=canvasWidth;
canvas.height=canvasHeight;
$("#outside").css("width",canvasWidth+"px");
var lastX,lastY,X,Y;
var last,current;
var lastW=-1;

drawGrid();
var isMouseDown=false;
canvas.onmousedown = function(e){
	e.preventDefault();
	last=new Date().getTime();
	lastX=e.clientX-Math.round(canvas.getBoundingClientRect().left);
	lastY=e.clientY-Math.round(canvas.getBoundingClientRect().top);
	isMouseDown=true;
}
canvas.onmouseup = function(e){
	e.preventDefault();
	isMouseDown=false;
	lastW=-1;
}
canvas.onmouseout = function(e){
	e.preventDefault();
	isMouseDown = false;
}
canvas.onmousemove = function(e){
	
	context.beginPath();
	current=new Date().getTime();
	X=e.clientX-Math.round(canvas.getBoundingClientRect().left);
	Y=e.clientY-Math.round(canvas.getBoundingClientRect().top);
	var dis=distance(X,Y,lastX,lastY);
	speed=dis/(current-last);
	var line=width(speed);
	
	if(isMouseDown){

		context.strokeStyle="#fff";
		context.lineWidth=line;
		context.lineCap="round";
		context.lineJoin="round";
		context.moveTo(lastX,lastY);
		context.lineTo(X,Y);
		context.stroke();
		lastW=line;
	}

	context.closePath();
	lastX=X;
	lastY=Y;
	last=current;
	
}
function width(speed){
	var mywidth=0;
	if(speed<=0.05){
		mywidth=30;
	}
	else if(speed>=10){
		mywidth=1;
	}
	else{
		var a=(speed-0.05)/(10-0.05);
		mywidth=30-30*a;
	}
	// console.log(lastW);
	if(lastW === -1){
		return mywidth;
	}
	else{
		return lastW*2/3+mywidth*1/3;	
	}
	
}
function distance(X,Y,lastX,lastY){
	var dis=Math.sqrt((X-lastX)*(X-lastX)+(Y-lastY)*(Y-lastY));
	return dis;
}
function drawGrid(){
	context.save();
	context.strokeStyle="rgb(230,11,9)";
	context.lineWidth=6;

	context.beginPath();
	context.moveTo(3,3);
	context.lineTo(canvasWidth-3,3);
	context.lineTo(canvasWidth-3,canvasHeight-3);
	context.lineTo(3,canvasHeight-3);
	context.closePath();

	context.stroke();

	context.beginPath();
	context.moveTo(canvasWidth/2,0);
	context.lineTo(canvasWidth/2,canvasHeight);
	context.moveTo(0,canvasHeight/2);
	context.lineTo(canvasWidth,canvasHeight/2);
	context.lineWidth=1;

	context.stroke();
	context.restore();
}

canvas.addEventListener('touchstart',function(e){
	e.preventDefault();
	touch=e.touches[0];
	last=new Date().getTime();
	lastX=touch.pageX-Math.round(canvas.getBoundingClientRect().left);
	lastY=touch.pageY-Math.round(canvas.getBoundingClientRect().top);
	isMouseDown=true;
});

canvas.addEventListener("touchmove",function(e){
	e.preventDefault();
	touch=e.touches[0];
	context.beginPath();
	current=new Date().getTime();
	X=touch.pageX-Math.round(canvas.getBoundingClientRect().left);
	Y=touch.pageY-Math.round(canvas.getBoundingClientRect().top);
	var dis=distance(X,Y,lastX,lastY);
	speed=dis/(current-last);
	var line=width(speed);
	
	if(isMouseDown){

		context.strokeStyle="#fff";
		context.lineWidth=line;
		context.lineCap="round";
		context.lineJoin="round";
		context.moveTo(lastX,lastY);
		context.lineTo(X,Y);
		context.stroke();
		lastW=line;
	}

	context.closePath();
	lastX=X;
	lastY=Y;
	last=current;
})