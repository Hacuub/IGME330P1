console.log("loaded");

(function(){
    let abcLIB = {
        getRandomColor(){
           /*function getByte(){
            return 55 + Math.round(Math.random() * 200);
            }*/
            let getByte = (e) => 55 + Math.round(Math.random() * 200);
            //return "rgba(" + getByte() + "," + getByte() + "," + getByte() + ",.8)";
            return `rgba(${getByte()},${getByte()},${getByte()},1`;
        },

        getRandomColorRange(min1, max1, min2, max2, min3, max3){
             let getByte1 = (e) => 55 + Math.round((Math.random() * (max1 - min1)));
             let getByte2 = (e) => 55 + Math.round((Math.random() * (max2 - min2)));
             let getByte3 = (e) => 55 + Math.round((Math.random() * (max3 - min3)));
             //return "rgba(" + getByte() + "," + getByte() + "," + getByte() + ",.8)";
             return `hsl(${getByte1()}, 100%, 50%`;
         },

        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        drawCenterCircle(ctx, x, y, l, color = "white")
        {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, l/2, 0, Math.PI * 2, false);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        },

        drawRectangle(ctx, x, y, w, h, fillStyle = "black", lineWidth = 0, strokeStyle = "black"){
            ctx.fillStyle = fillStyle;
            ctx.save();
            ctx.beginPath();
            ctx.rect(x - w/2, y - h/2, w, h);
            ctx.closePath();
            ctx.fill();
            if(lineWidth > 0)
            {
                ctx.lineWidth = lineWidth;
                ctx.strokeStyle = strokeStyle;
                ctx.stroke();
            }
            ctx.restore();
        }
    };

    if(window){
        window["abcLIB"] = abcLIB;
    }
    else{
        throw "'window' is not defined!";
    }
})();