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
        abcLIB.drawRectangle(ctx, x, y, canvasWidth, canvasHeight, `rgba(0,0,0,${1/12})`);
        if(timer < 10)
        {
            timer += 1/12;
            setTimeout(drawFirework,1000/fps);
            getFPS();
            let a = n * dtr(divergence);
            let r = c * Math.sqrt(n);
            let drawX = r * Math.cos(a) + x
            let drawY = r * Math.sin(a) + y;
            abcLIB.drawCenterCircle(ctx, drawX, drawY, fireworkDotSize, color);
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
        abcLIB.drawRectangle(ctx, x, y, canvasWidth, canvasHeight, `rgba(0,0,0,${1/12})`);
        if(y >= mouseY)
        {
        x = mouseX;
        //console.log(x, y);
        setTimeout(drawRocket,1000/fps);
        getFPS();
        abcLIB.drawRectangle(ctx, x, y, rocketWidth, rocketHeight, rocketFillStyle);
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

    function getFPS(){
        fpsGroup = document.querySelectorAll("#fps");
        for(let i = 0; i < fpsGroup.length; i++){
            
            if(fpsGroup[i].checked)
            {
                fps = Number(fpsGroup[i].value);
                console.log(fps);
            }
        }
    }

