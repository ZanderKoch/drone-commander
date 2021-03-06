package nu.te4.dronecommander.StateEntities;

/**
 *
 * @author Zander Koch
 */
public class Plane {
    private double posX;
    private double posY;
    private double heading; //rads
    private String color; //'#' followed by 6 digit hexadecimal
    
    private float velocity = 0; //units/timestep
    private double rotationRate = 0; //rads that heading will change by each timestep
    
    //performance variables, ways to change them could be implemented later
    private double maxRotationRate = Math.toRadians(45);
    private double rudder = Math.toRadians(9); //yaw multiplier 
    private float engine = 10; //multipier for positive throttle
    private float airbrake = 5; //drag multiplier for negative throttle
    private float dragCoef = 0.1f;
    
    //latest recieved inputs from client
    private float yaw = 0;
    private float throttle = 0;

    public Plane(String color) {
        this.color = color;
    }
    
    /**
     * updates plane's yaw value while ensuring -1 <= yaw <= 1
     * @param yawInput
     * @return plane's updated yaw
     */
    public float updateYaw(float yawInput){
        if(yawInput > 1){
            this.yaw = 1;
        }
        else if(yawInput < -1){
            this.yaw = -1;
        }
        return this.yaw;
    }
    
    /**
     * updates plane's throttle value while ensuring -1 <= throttle <= 1
     * @param throttleInput
     * @return plane's updated throttle
     */
    public float updateThrottle(float throttleInput){
        if(throttleInput > 1){
            this.yaw = 1;
        }
        else if(throttleInput < -1){
            this.yaw = -1;
        }
        return this.throttle;
    }
    
    /**
     * updates the plane's state into the next timestep
     */
    public void update(){
        
    }
    
    /**
     * initilizes plane, placing it at a specified angle and distance from 
     * battlefield's center and facing the center
     * @param angle
     * @param distance 
     */
    public void initialize(double angle, float distance){
        this.posX = Math.cos(angle) * distance;
        this.posY = Math.sin(angle) * distance;
        this.heading = angle - Math.PI;
        this.velocity = 0;
        this.rotationRate = 0;
    }

    public String getColor(){
        return color;
    }
    
    
}
