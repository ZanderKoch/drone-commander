//stick canvas
stick = document.querySelector("#stick-canvas");
stickCx = stick.getContext("2d");
stickRadius = stick.width / 2;
stickCenterX = stick.width / 2;
stickCenterY = stick.height/ 2;


function grabStick(event){
    stickGrabbed = true;
    updateStick(event);
}

function updateStick(event){
    console.log(stickGrabbed);
    
    if(stickGrabbed === true){
        //get stick coordinates relative to stick center
        stickX = event.offsetX - stickCenterX;
        stickY = 1-(event.offsetY - stickCenterY);

        console.log("stickX: " + stickX + " ,stickY: " + stickY);

        //calculate throttle and yaw
        yaw = stickX / stickRadius;
        throttle = stickY / stickRadius
        
        drawStick();
        send();
    }
}

function unStick(){
    console.log("let go of stick");
    if(stickGrabbed === true){
        stickGrabbed = false;
    }
}


function drawStick(){
    //preparing the context
    stickCx.resetTransform();
    stickCx.clearRect(0, 0, stick.width, stick.height);
    stickCx.strokeStyle = clientColor;
    stickCx.lineWidth = 1.5;
    stickCx.translate(stickCenterX, stickCenterY);
    stickCx.scale(1,-1);

    //drawing a cross (add meausurement lines later)
    stickCx.beginPath();
    stickCx.moveTo(0, stickRadius);
    stickCx.lineTo(0, -stickRadius);
    stickCx.moveTo(stickRadius, 0);
    stickCx.lineTo(-stickRadius, 0);
    stickCx.stroke();

    //drawing a line from the center to the control point
    stickCx.beginPath();
    stickCx.moveTo(0, 0);
    stickCx.lineTo(yaw * stickRadius, throttle * stickRadius);
    stickCx.stroke();
}