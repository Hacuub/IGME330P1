import './abcLIB.js';
"use strict";
	const canvasWidth = 400, canvasHeight = 300;
	let ctx;
    let n = 20;
    let c = 6;
    let divergence = 147.7;
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
    let fadeRate = 12;
    let colorGroup = [];
    let colorStyle = "random";
    let explosionTime = 10;
    let divergenceGroup = [];
    let clockwise = true;
    let randomIndex = 9;

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
        abcLIB.drawRectangle(ctx, 0, 0, canvasWidth * 2, canvasHeight * 2, `rgba(0,0,0,${1/fadeRate})`);
        if(timer < explosionTime)
        {
            timer += 1/12;
            if(colorGroup[randomIndex].checked)
            {
                colorStyle = abcLIB.getRandomColor();
            }
            setTimeout(drawFirework,1000/fps);
            let a = n * dtr(divergence);
            let r = c * Math.sqrt(n);
            let drawX = r * Math.cos(a) + x
            let drawY = r * Math.sin(a) + y;
            abcLIB.drawCenterCircle(ctx, drawX, drawY, fireworkDotSize, colorStyle);
            n++;
        }
        else
        {
            abcLIB.drawRectangle(ctx, 0, 0, canvasWidth*2, canvasHeight*2, `rgba(0,0,0,1)`);
        }
    }

    //  fades out
    //  draw rocket moving up until hits clicked Y value
    //  starts firework
    function drawRocket(){
        abcLIB.drawRectangle(ctx, 0, 0, canvasWidth * 2, canvasHeight * 2, `rgba(0,0,0,${1/fadeRate})`);
        if(y >= mouseY)
        {
        x = mouseX;
        //console.log(x, y);
        if(colorGroup[randomIndex].checked)
        {
            colorStyle = abcLIB.getRandomColor();
        }
        setTimeout(drawRocket,1000/fps);
        abcLIB.drawRectangle(ctx, x, y, rocketWidth, rocketHeight, colorStyle);
        y -= rocketSpeed;
        }
        else
        {
            mouseY = canvasHeight;
            timer = 0;
            drawFirework();
            //console.log("firework boom");
        }
    }

    //  onclick gets mouse position and starts rocket
    function canvasClicked(e){
        abcLIB.drawRectangle(ctx, 0, 0, canvasWidth*2, canvasHeight*2, `rgba(0,0,0,1)`);
        n = 0;
        timer = 13;
        let rect = e.target.getBoundingClientRect();
        mouseX = e.clientX;
        mouseY = e.clientY;
        getFPS();
        getFadeRate();
        getColor();
        getExplosion();
        getDivergence();
        getClockwise();
        //console.log(mouseX, mouseY);
        y = canvasHeight;
        drawRocket();
    }

    //method to get the new fps
    function getFPS(){
            fps = Number(document.querySelector("#fps").value);
    }

        //method to get the new divergence
        function getDivergence(){
            divergenceGroup = document.querySelectorAll("#divergence");
            for(let i = 0; i < divergenceGroup.length; i++){
                
                if(divergenceGroup[i].checked)
                {
                    divergence = Number(divergenceGroup[i].value);
                }
            }
        }


    //method to change the fade rate
    function getFadeRate(){
            let rate = Number(document.querySelector("#slider").value) * -1;
            fadeRate = rate;
    }

    //method to change the fade rate
    function getSize(){
            fireworkDotSize = Number(document.querySelector("#sliderForSize").value);
    } 

    //method to change the exposion size
    function getExplosion(){
            explosionTime = Number(document.querySelector("#sliderForExplosion").value);
    } 

    //method to change direction of spin
    function getClockwise(){
        document.querySelector("#clockwiseCheck").onchange = function(e){
            clockwise = !clockwise;
        }
        if(!clockwise)
        {
            divergence = -divergence;
        }
    }

    //method to make pick a color // make rainbow probably with a timer
    function getColor(){
        colorGroup = document.querySelectorAll("#color");
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
                else if(colorGroup[i].value == "white")
                {
                    colorStyle = "white";
                }
            }
        }
    }

