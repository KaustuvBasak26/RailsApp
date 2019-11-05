import React, {useState, useEffect} from 'react';
import { createConsumer } from "@rails/actioncable";


const useActionCable = (path, channel) =>  {
    const [connected, setStatus] = useState(false);
    const [consumers, addConsumer] =  useState({});
    const [subscriptions, addSubscription] =  useState({});
    const [messages, addMessage] =  useState([]);
  
    useEffect(() => {
      const  received = ({message})  => {        
        addMessage([...messages, 
            {...JSON.parse(message), _path: path, _channel: channel}]);
      }      
      const connected = () => {
        setStatus(true);
      }
      const disconnected = () => {
        setStatus(false);
      }
      const consumer = createConsumer(`ws://localhost:3000/${path}` );
      addConsumer({...consumers,[path]: consumer})
      const subscription = consumer.subscriptions.create({channel},{received, connected, disconnected});
       
      addSubscription({...subscriptions, [channel]: subscription});

      return () => {
        consumer.subscriptions.remove(subscription)
        consumer.disconnect();
      };ActionCableContext
    },[]);
  
    const send = (...args) => {
        consumers[path].send.apply(consumers[path],args)
    }
    return {
        messages, 
        send,
        connected
    };
  }


 export const ActionCableContext = React.createContext(useActionCable);
