window.onload = function () {


    var ctx;
    var canvas;
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    var arrastrar=false;
    var delta = new Object();
    var img = new Image();
    var X=0, Y=0;

    function inicio(){
        img.src = 'http://1.bp.blogspot.com/_uNR32GxwiMA/TJDGwckZqTI/AAAAAAAAA78/E_d7wbd3xHk/s1600/tecla+cualkiera.jpg';
        img.onload = function(){
            canvas.height = img.height / 2;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
        };
    }

    inicio();


    function draw(coorY){
        ctx.clearRect(0,0,X,Y);
        ctx.drawImage(img, 0, coorY);
    }

    function oMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {// devuelve un objeto
            x: Math.round(evt.clientX - rect.left),
            y: Math.round(evt.clientY - rect.top)
        }
    }

    canvas.onmousedown = function(e){
        console.log("mousedown");
        var mousePos = oMousePos(canvas, e);
        draw(Y);
        arrastrar=true;
        delta.x = X - mousePos.x;
        delta.y = Y - mousePos.y;
    };

    canvas.onmousemove = function(evt){

        var mousePos = oMousePos(canvas, evt);

        console.log("antes del if Y: "+Y+" img.height "+img.height);

        if (arrastrar) {
            ctx.clearRect(0,0,canvas.width, canvas.height);
            X = mousePos.x + delta.x;
            Y = mousePos.y + delta.y;
            console.log("x: "+X);
            console.log("y: "+Y);
            var altura =  img.height/2;
            if(Y>0){
                Y=0;
                console.log(altura);
                console.log((-300)<(-250));
                console.log(Y<(-altura));
            }else if(Y<(-(img.height/2))){
                //Y=-img.height/2;
                console.log("else");
                Y=-altura;
            }
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


};