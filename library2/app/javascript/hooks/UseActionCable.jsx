import consumer from "../channels/consumer";
import {useState} from "react";

//hash of path vs message corresponding to each message
let messageHash = {
    "tcp://0.tcp.ngrok.io:10971": "",
    "path2": "",
    "path3": ""
}
const [messages, setMessages] = useState(messageHash);

//function to create connection to the rails server action cable
function createCableConnection(path){
    let connection =  consumer.subscriptions.create(path, {
        received: receivedDataHandlers[path]
    });
    return connection;
}

//hash of path vs handlers to handle the data receiveed from the path
let receivedDataHandlers = {
    "tcp://0.tcp.ngrok.io:10971": (data) => {
        windows.alert(data.message);
        setMessages((data) => {
            messages["tcp://0.tcp.ngrok.io:10971"] = data.message;
        });
    },
    "path2": (data) => {},
    "path3": (data) => {}
};

//Action Cable custom hook
export default useActionCable = (path) => {
  
    let defaultPath = "tcp://0.tcp.ngrok.io:10971/cable";
    var connection;
    if(path.length === 0){
        connection = createCableConnection(defaultPath);
    }else{
        connection = createCableConnection(path);
    }
    return {
        send: (data) => {
            connection.send(data);
        },
        data: messageHash[path]
    };
}