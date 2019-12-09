window.onload=initPage;

//Sets the length of the line that is being drawn. Can be configured using (element id) "lscale" range input
var step=5;

var lineWidth=1;



//Drawing line to the coordinates below
var h=5;
var w=5;

var ctx;
var rect;

function initPage(){

    console.log("Logs: init page");

    //Canvas
    var element=document.getElementById("screen");
    ctx=element.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(5,5);

   
  
    rect=element.getBoundingClientRect();



    //Listeners - keyboard and mouse events
    window.onclick=run;
    window.onkeypress=key;
    element.onclick=cursorControl;

    //Custom color confirmation
    const customColorApply=document.getElementById("applyColor");
    customColorApply.onclick=applyColor;

    //Eraser  - activated on double click.
    element.ondblclick=cleanCurrentArea;

    //Listening to Length Scale input
    var lscale=document.getElementById("lscale");
    lscale.onchange=stepconfig;

    //Listening to Width Scale input
    var wscale=document.getElementById("apply");
    wscale.onclick=widthconfig;

    //Creating color buttons (for switching colors by click)
    colors=["yellow","red","blue","green","black","white","purple","orange","teal","pink","magenta","gold","indigo","orchid",
    "seagreen","tomato","navy","deeppink"];

    for(let i=0;i<colors.length;i++){
        console.log(colors[i]);
        newButton=document.createElement("button");
        newButton.className="button";
        newButton.style.backgroundColor=colors[i];

        document.getElementById("colors").appendChild(newButton);
    }


}

//Seting the "step" parameted. "lscale" - range input element.
function stepconfig(){
    console.log("Step length is updated to "+lscale.value);
    step =parseInt(lscale.value);
}

//Setting the line width parameter. "wscale"-numeric input element.
function widthconfig(){
    console.log("Line width is updated to "+wscale.value);
    ctx.lineWidth =parseFloat(wscale.value);
    ctx.beginPath();
    ctx.moveTo(w,h);
}

//Handles cursor clicks. Sets a point on the screen from which a line is being drawn.
function cursorControl(event){
    console.log("Cursor control - active");
    console.log("X: "+((event.clientX-rect.left)/4.34)+", Y: "+((event.clientY-rect.top)/3.34));
    h=(event.clientY-rect.top)/3.34;
    w=(event.clientX-rect.left)/4.34;

    ctx.beginPath();
    ctx.moveTo(w,h);
}

//Delete - work is in progress. Triggered by doubleclick. Eventualy the size of the cleared are should be configurable.
function cleanCurrentArea(event){

    const deletedArea=parseInt(document.getElementById("dscale").value);

    console.log("Delete line - active");
    console.log("X: "+((event.clientX-rect.left)/4.34)+", Y: "+((event.clientY-rect.top)/3.34));
    h=(event.clientY-rect.top)/3.34;
    w=(event.clientX-rect.left)/4.34;

    ctx.lineWidth=deletedArea;

    ctx.beginPath();
    ctx.moveTo(w,h);

    
    ctx.strokeStyle="gainsboro";

    ctx.lineTo(w+deletedArea,h);
    ctx.stroke();
    ctx.lineTo(w-(deletedArea*2),h);
    ctx.stroke();

}

function applyColor(){
    
    const red=parseInt(document.getElementById("redBox").value);
    const blue=parseInt(document.getElementById("blueBox").value);
    const green=parseInt(document.getElementById("greenBox").value);
    console.log("Custom color - applied, "+red+"|"+blue+"|"+green);

    ctx.beginPath();
    ctx.moveTo(w,h);
    ctx.strokeStyle="rgb("+red+","+blue+","+green+")";
     
}

//Drawing with arrows (1,2,3,4,6,7,8,9)
function key(event){

    kpressed=event.key;
    console.log("Logs: "+kpressed);

    //Get current coordinates
     if(kpressed=='q'){
        //controled=document.getElementById("object");
        console.log("X: "+w+", Y: "+h);
        
      
        //controled.style.left=controled.getBoundingClientRect().left+20+"px";
        
    }

    //Right
    if(kpressed=='6'){
        //controled=document.getElementById("object");
        console.log("Move right");
        
        w=w+step;
        ctx.lineTo(w,h);
        ctx.stroke();
        //controled.style.left=controled.getBoundingClientRect().left+20+"px";
        
    }

    //Left
    else  if(kpressed=='4'){
       // controled=document.getElementById("object");
        console.log("Move left ");
        
        w=w-step;
        ctx.lineTo(w,h);
        ctx.stroke();

        //controled.style.left=controled.getBoundingClientRect().left-20+"px";
        
    }

    //Down+Right
    else  if(kpressed=='3'){
        // controled=document.getElementById("object");
         console.log("Move left ");
         
         w=w+step;
         h=h+step;
         ctx.lineTo(w,h);
         ctx.stroke();
 
         //controled.style.left=controled.getBoundingClientRect().left-20+"px";
         
     }

    //Down+Left
    else  if(kpressed=='1'){
        // controled=document.getElementById("object");
         console.log("Move left ");
         
         w=w-step;
         h=h+step;
         ctx.lineTo(w,h);
         ctx.stroke();
 
         //controled.style.left=controled.getBoundingClientRect().left-20+"px";
         
     }

       //Up+Left
    else  if(kpressed=='7'){
        // controled=document.getElementById("object");
         console.log("Move left ");
         
         w=w-step;
         h=h-step;
         ctx.lineTo(w,h);
         ctx.stroke();
 
         //controled.style.left=controled.getBoundingClientRect().left-20+"px";
         
     }

    //Up+Right
    else  if(kpressed=='9'){
        // controled=document.getElementById("object");
         console.log("Move left ");
         
         w=w+step;
         h=h-step;
         ctx.lineTo(w,h);
         ctx.stroke();
 
         //controled.style.left=controled.getBoundingClientRect().left-20+"px";
         
     }
 

    //Down
    else if(kpressed=='2'){
        //controled=document.getElementById("object");
        console.log("Move down");
        //controled.style.top=controled.getBoundingClientRect().top+20+"px";
        h=h+step;
        ctx.lineTo(w,h);
        ctx.stroke();
    }

    //Up
    else if(kpressed=='8'){
       // controled=document.getElementById("object");
        console.log("Move up");
        //controled.style.top=controled.getBoundingClientRect().top-20+"px";
        h=h-step;
        ctx.lineTo(w,h);
        ctx.stroke();
    }

    //Keyboard - red 
    else if(kpressed=='r'){
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="red";
    }

    //Keyboard - blue
    else if(kpressed=='b'){
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="blue";
    }

}


///Switching colors by mouse click
function run(event){

    console.log(event.target);
    el=event.target;
    
    if(el.style.backgroundColor=="yellow"){
        console.log("Yellow");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="yellow";

    } 
    else if(el.style.backgroundColor=="red"){
        console.log("Red");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="red";

    }    

    else if(el.style.backgroundColor=="blue"){
        console.log("Blue");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="blue";

    }  
    
    else if(el.style.backgroundColor=="green"){
        console.log("Green");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="green";

    }  

    else if(el.style.backgroundColor=="black"){
        console.log("Black");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="black";

    }
    else if(el.style.backgroundColor=="white"){
        console.log("White");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="white";

    }
    else if(el.style.backgroundColor=="purple"){
        console.log("Purple");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="purple";

    }
    else if(el.style.backgroundColor=="orange"){
        console.log("Orange");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="orange";

    }
    else if(el.style.backgroundColor=="teal"){
        console.log("teal");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="teal";

    }

    else if(el.style.backgroundColor=="pink"){
        console.log("pink");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="pink";

    }

    else if(el.style.backgroundColor=="magenta"){
        console.log("magenta");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="magenta";

    }

    else if(el.style.backgroundColor=="gold"){
        console.log("gold");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="gold";

    }

    else if(el.style.backgroundColor=="indigo"){
        console.log("indigo");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="indigo";

    }

    else if(el.style.backgroundColor=="orchid"){
        console.log("orchid");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="orchid";

    }

    else if(el.style.backgroundColor=="seagreen"){
        console.log("seagreen");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="seagreen";

    }

    else if(el.style.backgroundColor=="tomato"){
        console.log("tomato");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="tomato";

    }

    else if(el.style.backgroundColor=="navy"){
        console.log("navy");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="navy";
      //  ctx.strokeStyle="rgba(255, 99, 71, 0.5)";
      // ctx.strokeStyle="#0B2743";

    }

    else if(el.style.backgroundColor=="deeppink"){
        console.log("deeppink");
        ctx.beginPath();
        ctx.moveTo(w,h);
        ctx.strokeStyle="deeppink";

    }
   

    
}