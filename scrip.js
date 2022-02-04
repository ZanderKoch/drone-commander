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


window.onload = init;