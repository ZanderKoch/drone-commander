package nu.te4.dronecommander;

import java.util.ArrayList;
import nu.te4.dronecommander.StateEntities.Plane;

/**
 * 
 * @author Zander Koch
 */
public class State{
    private final float battlefieldRadius = 450;
    //determined by client app's radar canvas
    private ArrayList<Plane> planes = new ArrayList();

    public State() {
    }
    
    /**
     * !!TODO!!: implement
     * takes inputs sent from client and updates the planes list appropriately
     * @param yaw
     * @param throttle
     * @param Color 
     */
    public void executeInputs(float yaw, float throttle, String Color){
        // check if plane with that color exists already
        if(getPlane(Color) != null){
            //if yes update said plane's yaw and throttle to those given
            getPlane(Color).updateYaw(yaw);
            getPlane(Color).updateThrottle(throttle);
        }
        
        
        
        //if no add plane, initialize all planes, and publish new state
    }
    
    /**
     * attempts to get a plane with specified color
     * @param color the color of the plane to be searched for
     * @return the plane with provided color if that exists, or a null object
     */
    private Plane getPlane(String color){
        for (Plane plane : planes){
            if(plane.getColor() == color){
                return plane;
            }
        }
        return null;
    }
}
