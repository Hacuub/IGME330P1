import './abcLIB.js';
import "https://cdnjs.cloudflare.com/ajax/libs/howler/2.2.0/howler.js";
"use strict";
	let canvasWidth = 959, canvasHeight = 700;
	let ctx;
    let n = 20;
    let c = 6;
    let mouseX = 0;
    let mouseY = 0;
    let timer = 0;
    let fps = 12;
    let rocketSpeed = 5
    let fadeRate = 12;
    let colorGroup = [];
    let divergenceGroup = [];
    let clockwise = true;
    let rocketSound = new Howl({src: ['rocket.wav'],
    volume: .125
    });
    let fireWorkSound = new Howl({src: ['firework.wav'], 
    volume: .175
    });
    let groupFireWorks = [];
    let groupFireWorkCounter = 0;

    class fireWork {
        constructor (X, Y, fireWorkHeight, Timer, Clockwise, N){
            this.x = X;
            this.y = Y
            this.n = N
            this.height = fireWorkHeight;
            this.timer = Timer
            this.exploding = true;
            this.explosionTime = getExplosion();
            this.divergence = getDivergence();
            this.clockwise = Clockwise;
            this.fireworkDotSize = getSize();
            this.colorStyle = getColor();
            this.rocketWidth = getRocketSize();
            this.rocketHeight = getRocketSize()*2;

            if(!this.clockwise)
            {
                this.divergence = -this.divergence;
            }
        }

        drawFirework(){
            //console.log(this.timer);
            if(this.timer == 0)
            {
                fireWorkSound.play();
            }
            if(this.timer < this.explosionTime)
            {
                this.timer += 1/12;

                let a = this.n * dtr(this.divergence);
                let r = c * Math.sqrt(this.n);
                let drawX = r * Math.cos(a) + this.x;
                let drawY = r * Math.sin(a) + this.height;
                if(this.colorStyle == "random")
                {
                    abcLIB.drawCenterCircle(ctx, drawX, drawY, this.fireworkDotSize, abcLIB.getRandomColor());
                }
                else
                {

                    abcLIB.drawCenterCircle(ctx, drawX, drawY, this.fireworkDotSize, this.colorStyle);
                }
                this.n++;
            }
            else{
                this.exploding = false;
            }
        }

        
        drawRocket(){
            if(this.exploding)
            {
                let random = abcLIB.getRandomInt(0,2);
                //console.log(x);
                if(this.y >= this.height)
                {
                    if(random==0)
                    {
                        this.x-=2;
                    }
                    else if(random ==2)
                    {
                        this.x+=2;
                    }

                    //console.log(x, y);
                    if(this.colorStyle == "random")
                    {
                        abcLIB.drawRectangle(ctx, this.x, this.y, this.rocketWidth, this.rocketHeight, abcLIB.getRandomColor());
                    }
                    else
                    {
                        abcLIB.drawRectangle(ctx, this.x, this.y, this.rocketWidth, this.rocketHeight, this.colorStyle);
                    }
                    this.y -= rocketSpeed;
                }
                else
                {
                    this.drawFirework();
                }
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
        drawNewFireWorks();
	}

    // helpers

    function loop(){
        getClockwise();
        getFPS();
        getFadeRate();
        setTimeout(loop, 1000/fps);
        abcLIB.drawRectangle(ctx, 0, 0, canvasWidth * 2, canvasHeight * 2, `rgba(0,0,0,${1/fadeRate})`);
    }
    
	function dtr(degrees){
		return degrees * (Math.PI/180);
    }

    //  onclick gets mouse position and starts rocket
    function canvasClicked(e){
        n = 0;
        let rect = e.target.getBoundingClientRect();
        mouseX = e.clientX;
        mouseY = e.clientY;
        groupFireWorkCounter++;
        groupFireWorks.push(new fireWork(mouseX, canvasHeight, mouseY, timer, clockwise, n));
        rocketSound.play();
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
                return Number(divergenceGroup[i].value);
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
            return Number(document.querySelector("#sliderForSize").value);
    } 

    //method to change the fade rate
    function getRocketSize(){
        return Number(document.querySelector("#sliderForRocketSize").value);
    } 

    //method to change the exposion size
    function getExplosion(){
            return Number(document.querySelector("#sliderForExplosion").value);
    } 

    //method to change direction of spin
    function getClockwise(){
        document.querySelector("#clockwiseCheck").onchange = function(e){
            clockwise = !clockwise;
        }

    }

    //method to make pick a color // make rainbow probably with a timer
    function getColor(){
        colorGroup = document.querySelectorAll("#color");
        let colorStyle;
        for(let i = 0; i < colorGroup.length; i++)
        {
            if(colorGroup[i].checked)
            {
                colorStyle = colorGroup[i].value
            }
        }
        return colorStyle;
    }