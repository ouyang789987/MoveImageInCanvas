window.onload = function () {



    var ctx;
    var canvas;
    var altura;
    var arrastrar=false;
    var delta = new Object();
    var img = new Image();
    var X=0, Y=0;
    var mult;
    var ratio;
    var offset;




    function inicio(){

        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');

        img.src = 'https://lh5.googleusercontent.com/-jUUrgrtRzAI/AAAAAAAAAAI/AAAAAAAAACs/NiBIYukBmoM/photo.jpg';
        img.onload = function(){


            canvas.height = img.height / 2;
            canvas.width = img.width;

            ratio = img.height / img.width;
            console.log("RATIO:" + ratio);
            mult = canvas.width /  img.width;

            offset = - ( canvas.height - canvas.width * ratio);
            console.log("OFFSET: "+ canvas.width + "/"+canvas.width * ratio+"=" + offset);
            altura = canvas.height * ratio;

          draw();
        };
    }


    function draw(coorY){
        ctx.clearRect(0,0,X,Y);
        // ctx.drawImage(img, 0, coorY);

        if (!coorY)coorY = 0;



        ctx.drawImage(img, 0, coorY,img.width * mult,canvas.width* ratio);
    }

    function oMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {// devuelve un objeto
            //x: Math.round(evt.clientX - rect.left),
            y: (evt.clientY - rect.top)
        }
    }

    canvas.onmousedown = function(e){
        console.log("mousedown");
        var mousePos = oMousePos(canvas, e);
        draw(Y);
        arrastrar=true;
        delta.y = Y - mousePos.y;
    };

    canvas.onmousemove = function(evt){

        var mousePos = oMousePos(canvas, evt);


        if (arrastrar) {
            ctx.clearRect(0,0,canvas.width, canvas.height);
            Y = mousePos.y + delta.y;
            console.log("y: "+Y);
            console.log("ALTURA: "+altura);
            //var altura =  img.height/2;



            //
            if(Y>0){
                Y=0;

                //console.log((-300)<(-250));
                //console.log(Y<(-altura));

            }else if(Y<-(offset)){
                //Y=-img.height/2;
                console.log("else");
                Y=-(offset);
            }
            console.log(offset);

            draw(Y);


        }
    };

    canvas.onmouseup = function(){
        console.log("mouseup");
        arrastrar = false;
    };

    canvas.onmouseout = function(){
        arrastrar = false;
    };


    inicio();




};