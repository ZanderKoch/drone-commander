package nu.te4.dronecommander.StateEntities;

/**
 *
 * @author Zander Koch
 */
public class Plane {
    private float posX;
    private float posY;
    private double heading; //rads
    private String color; //'#' followed by 6 digit hexadecimal
    
    private float velocity = 0; //units/timestep
    private double rotationRate = 0; //rads that heading will change by each timestep
    
    //performance variables, ways to change them could be implemented later
    private double maxRotationRate = Math.toRadians(45);
    private float engineForce = 10; //multipier for positive throttle
    private float airbrakeForce = 5; //drag multiplier negative throttle
    private float dragCoef = 0.1f;
    
    
}
