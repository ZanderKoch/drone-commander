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
     * takes inputs sent from client and 
     * @param yaw
     * @param throttle
     * @param Color 
     */
    public void executeInputs(float yaw, float throttle, String Color){
        // check if plane with that color exists already
        
        //if yes update said plane's yaw and throttle to those given
        
        //if no add plane, initialize all planes, and publish new state
    }
}
