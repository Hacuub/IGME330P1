import './abcLIB.js';
"use strict";
	const canvasWidth = 400, canvasHeight = 300;
	let ctx;
    let n = 20;
    const c = 6;
    const divergence = 147.7;
    let x = 0;
    let y = 0;
    let mouseX = 0;
    let mouseY = 0;
    let timer = 0;
    let rocketWidth = 5;
    let rocketHeight = 10;
    let rocketFillStyle = "white";
    let color = "white";
    let fps = 12;
    let rocketSpeed = 5
    let fireworkDotSize = 5;
    let fpsGroup = [];
    let fadeRate = 12;
    let colorGroup = [];
    let colorStyle = "random";

    window.onload = init;

	function init(){
		ctx = canvas.getContext("2d");
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        canvas.onclick = canvasClicked;
	}

    // helpers
    
	function dtr(degrees){
		return degrees * (Math.PI/180);
    }
    
    function drawFirework(){
        abcLIB.drawRectangle(ctx, x, y, canvasWidth, canvasHeight, `rgba(0,0,0,${1/fadeRate})`);
        if(timer < 10)
        {
            timer += 1/12;
            setTimeout(drawFirework,1000/fps);
            getFPS();
            getFadeRate();
            getColor();
            getSize();
            let a = n * dtr(divergence);
            let r = c * Math.sqrt(n);
            let drawX = r * Math.cos(a) + x
            let drawY = r * Math.sin(a) + y;
            abcLIB.drawCenterCircle(ctx, drawX, drawY, fireworkDotSize, colorStyle);
            n++;
        }
        else
        {
            abcLIB.drawRectangle(ctx, x, y, canvasWidth, canvasHeight, `rgba(0,0,0,1)`);
        }
    }

    //  fades out
    //  draw rocket moving up until hits clicked Y value
    //  starts firework
    function drawRocket(){
        abcLIB.drawRectangle(ctx, x, y, canvasWidth, canvasHeight, `rgba(0,0,0,${1/fadeRate})`);
        if(y >= mouseY)
        {
        x = mouseX;
        //console.log(x, y);
        setTimeout(drawRocket,1000/fps);
        getFPS();
        getFadeRate();
        getColor();
        abcLIB.drawRectangle(ctx, x, y, rocketWidth, rocketHeight, colorStyle);
        y -= rocketSpeed;
        }
        else
        {
            mouseY = canvasHeight;
            drawFirework();
            //console.log("firework boom");
        }
    }

    //  onclick gets mouse position and starts rocket
    function canvasClicked(e){
        abcLIB.drawRectangle(ctx, x, y, canvasWidth, canvasHeight, `rgba(0,0,0,1)`);
        n = 0;
        timer = 0;
        let rect = e.target.getBoundingClientRect();
        mouseX = e.clientX;
        mouseY = e.clientY;
        //console.log(mouseX, mouseY);
        y = canvasHeight;
        drawRocket();
    }

    //method to get the new fps
    function getFPS(){
        fpsGroup = document.querySelectorAll("#fps");
        for(let i = 0; i < fpsGroup.length; i++){
            
            if(fpsGroup[i].checked)
            {
                fps = Number(fpsGroup[i].value);
            }
        }
    }

    //method to change the fade rate
    function getFadeRate(){
        document.querySelector("#slider").onchange = function(e){
            let rate = Number(document.querySelector("#slider").value) * -1;
            fadeRate = rate;
        }
    }

    //method to change the fade rate
    function getSize(){
        document.querySelector("#sliderForSize").onchange = function(e){
            fireworkDotSize = Number(document.querySelector("#sliderForSize").value);
        }
    } 

    //method to make pick a color // make rainbow probably with a timer
    function getColor(){
        colorGroup = document.querySelectorAll("#color");
        console.log("color");
        for(let i = 0; i < colorGroup.length; i++)
        {
            if(colorGroup[i].checked)
            {
                if(colorGroup[i].value == "random")
                {
                    colorStyle = abcLIB.getRandomColor();
                }
                else if(colorGroup[i].value == "yellow")
                {
                    //colorStyle = abcLIB.getRandomColorRange(50, 65, 90, 100, 65, 80);
                    colorStyle = "yellow"
                }
                else if(colorGroup[i].value == "blue")
                {
                    //colorStyle = abcLIB.getRandomColorRange(220, 240, 90, 100, 65, 80);
                    colorStyle = "blue";
                }
                else if(colorGroup[i].value == "red")
                {
                    colorStyle = "red";
                }
                else if(colorGroup[i].value == "green")
                {
                    colorStyle = "green";
                }
                else if(colorGroup[i].value == "purple")
                {
                    colorStyle = "purple";
                }
                else if(colorGroup[i].value == "orange")
                {
                    colorStyle = "orange";
                }
                else if(colorGroup[i].value == "pink")
                {
                    colorStyle = "pink";
                }
            }
        }
    }

