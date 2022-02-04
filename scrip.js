//websocket connection
let url;
let ws;

//radar canvas
let radar;
let radarCx;
let radarCenterX;
let radarCenterY;

//stick canvas
let stick;
let stickCx;
let stickRadius
let stickCenterX;
let stickCenterY;

//client state
let stickGrabbed;
/**stick's current x coordinate relative to it's center */
let stickX;
/**stick's current x coordinate relative to it's center, positive axis is up*/
let stickY;
let yaw;
let throttle;

let clientColor; 


function init(){
    //websocket connection
    url = "ws://localhost:8080/dronecommander/DronecommanderEndpoint";
    ws = new WebSocket(url);
    
    //radar canvas
    radar = document.querySelector("#radar-canvas");
    radarCx = radar.getContext("2d");
    console.log(radar);
    radarCenterX = radar.width / 2;
    radarCenterY = radar.height/ 2;

    //stick canvas
    stick = document.querySelector("#stick-canvas");
    stickCx = stick.getContext("2d");
    stickRadius = stick.width / 2;
    stickCenterX = stick.width / 2;
    stickCenterY = stick.height/ 2;

    //client state
    stickGrabbed = false;
    yaw = 0;
    throttle = 0;

    clientColor = "#FFFFFF"; //for testing

    //initialize UI
    //setCanvasSizes();
    drawStick();

    stick.addEventListener("mousedown", e => grabStick(e));
    stick.addEventListener("mousemove", e => updateStick(e));
    stick.addEventListener("mouseup", unStick);
    //stick.addEventListener("mouseout", unStick);

    ws.addEventListener("message", e => receiveMessage(e))
}

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

//network functions
function receiveMessage(messageEvent){
    if(stickGrabbed === false){
        const data = JSON.parse(messageEvent.data);
    
        yaw = data.yaw;
        throttle = data.throttle;
        drawStick()  
    }
}

function send(){
    ws.send(`{"yaw":${yaw},"throttle":${throttle}}`);
}


//graphics functions//

/**sets the sizes of all canvases to be equal to their parent element*/
/* function setCanvasSizes(){
    radar.width = document.getElementById("radar").get;
} */

function drawStick(){
    //preparing the context
    stickCx.resetTransform();
    stickCx.clearRect(0, 0, stick.width, stick.height);
    stickCx.strokeStyle = clientColor;
    stickCx.lineWidth = 1.5;
    stickCx.translate(stickCenterX, stickCenterY);
    stickCx.scale(1,-1);

    //drawing a circle to show the usable radar area
    /* 
    stickCx.beginPath();
    stickCx.arc(0, 0, stickRadius, 0, 2 * Math.PI);
    stickCx.stroke();
    */

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

window.onload = init;