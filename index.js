import './abcLIB.js';
import "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.0/howler.js";
"use strict";
	let canvasWidth = 959, canvasHeight = 700;
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
    let rocketSound = new Howl({src: ['rocket.wav'],
    volume: .125
    });
    let fireWorkSound = new Howl({src: ['firework.wav'], 
    volume: .175
    });
    let groupFireWorks = [];
    let groupFireWorkCounter = 0;

    class fireWork {
        constructor (X, Y, fireWorkHeight, Timer){
            this.x = X;
            this.y = Y
            this.offSet = X;
            this.height = fireWorkHeight;
            this.timer = Timer
        }

        drawFirework(){
            if(this.timer == 0)
            {
                fireWorkSound.play();
            }
            if(this.timer < explosionTime)
            {
                this.timer += 1/12;
                if(colorGroup[randomIndex].checked)
                {
                    colorStyle = abcLIB.getRandomColor();
                }
                let a = n * dtr(divergence);
                let r = c * Math.sqrt(n);
                let drawX = r * Math.cos(a) + this.offSet;
                let drawY = r * Math.sin(a) + this.height;
                abcLIB.drawCenterCircle(ctx, drawX, drawY, fireworkDotSize, colorStyle);
                n++;
            }
        }

        
        drawRocket(){
            let random = abcLIB.getRandomInt(0,2);
            //console.log(x);
            if(random==0)
            {
                this.x-=2;
            }
            else if(random ==2)
            {
                this.x+=2;
            }
            if(this.y >= this.height)
            {
                //console.log(x, y);
                if(colorGroup[randomIndex].checked)
                {
                    colorStyle = abcLIB.getRandomColor();
                }
                abcLIB.drawRectangle(ctx, this.x, this.y, rocketWidth, rocketHeight, colorStyle);
                this.y -= rocketSpeed;
            }
            else
            {
                this.timer = 0;
                this.drawFirework();
            }
        }
    }

    window.onload = init;

	function init(){
        ctx = canvas.getContext("2d");
        canvasWidth = window.innerWidth/2;
        canvasHeight = window.innerHeight;
		canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
        canvas.onclick = canvasClicked;
        loop();
	}

    // helpers

    function loop(){
        setTimeout(loop, 1000/fps);
        abcLIB.drawRectangle(ctx, 0, 0, canvasWidth * 2, canvasHeight * 2, `rgba(0,0,0,${1/fadeRate})`);
    }
    
	function dtr(degrees){
		return degrees * (Math.PI/180);
    }

    //  onclick gets mouse position and starts rocket
    function canvasClicked(e){
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
        getSize();
        groupFireWorkCounter++;
        groupFireWorks.push(new fireWork(mouseX, canvasHeight, mouseY, timer));
        rocketSound.play();
        //console.log(mouseX, mouseY);
        //y = canvasHeight;
        //let fire = new Firework();
        //fire.drawRocket();
        //x = mouseX;
        //drawRocket();
        drawNewFireWorks();
    }

    //method to draw a fire work //multipe at the same time
    function drawNewFireWorks(){
        setTimeout(drawNewFireWorks, 1000/fps);
        
        //loop through the array and cycle to draw them
        if(groupFireWorkCounter > 0)
        {
            for(let i = 0; i < groupFireWorkCounter; i++)
            {
                groupFireWorks[i].drawRocket();
            }
        }
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

    /*function drawRocket(){
        let random = abcLIB.getRandomInt(0,2);
        //console.log(x);
        if(random==0)
        {
            x-=2;
        }
        else if(random ==2)
        {
            x+=2;
        }
        if(y >= mouseY)
        {
            //console.log(x, y);
            if(colorGroup[randomIndex].checked)
            {
                colorStyle = abcLIB.getRandomColor();
            }
            console.log("about to call again");
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
    function drawFirework(){
        if(timer ==0)
        {
            fireWorkSound.play();
        }
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
            let drawX = r * Math.cos(a) + x;
            let drawY = r * Math.sin(a) + y;
            abcLIB.drawCenterCircle(ctx, drawX, drawY, fireworkDotSize, colorStyle);
            n++;
        }
    }*/


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
                else if(colorGroup[i] == "rainbow")
                {
                    colorStyle = "white";
                    //colorStyle = `hsl(${a/divergence * 10},100%,50%)`;
                }
            }
        }
    }