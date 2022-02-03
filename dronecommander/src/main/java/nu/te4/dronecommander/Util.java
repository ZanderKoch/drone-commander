/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nu.te4.dronecommander;

import java.io.IOException;
import java.util.Iterator;
import java.util.Set;
import javax.websocket.Session;

/**
 *
 * @author Zander Koch
 */
public class Util{
    /**
     * sends message to all sessions in Set recipients
     * @param recipients
     * @param message 
     */
    public static void publish(Set<Session> recipients, String message){
        if(recipients.isEmpty()){
            System.out.println("Error trying to publish message \"" + message
                    + "\" to list of sessions, recipients is empty");
        }
        try{
            Iterator<Session> iterator = recipients.iterator();
                    while(iterator.hasNext()){
                        iterator.next().getBasicRemote().sendText(message);
                    }
        }
        catch(IOException exception){
            System.out.println("Error \"" + exception.getMessage() + "\" trying to publish message \"" + message
                    + "\" to list of sessions");
        }
        
    }
}
