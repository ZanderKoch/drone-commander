/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package nu.te4.dronecommander;

import java.util.HashSet;
import java.util.Set;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import nu.te4.dronecommander.Util;

/**
 *
 * @author Zander Koch
 */
@ServerEndpoint("/DronecommanderEndpoint")
public class DronecommanderEndpoint{

    static Set<Session> sessions = new HashSet<>();
    
    @OnMessage
    public void onMessage(String message){
        System.out.println("recieved message:" + message); 
        //Util.publish(sessions, message);
    }
    
    @OnOpen
    public void open(Session session){
        sessions.add(session);
        System.out.println("a connection was established");
    }
    
    @OnClose
    public void close(Session session){
        sessions.remove(session);
    }
}
