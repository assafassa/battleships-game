
export let socket = null;
export let buttonpressed=false
export const initializeWebSocket = (clientId,clientname) => {
    if (!buttonpressed){
        buttonpressed=true
        if ((!socket || socket.readyState === WebSocket.CLOSED)) {
            // Create a new WebSocket instance if not exists or closed
            //socket = new WebSocket(`ws://localhost:8080?clientId=${clientId}&username=${clientname}`);
            socket = new WebSocket(`wss://battleshipsserver.onrender.com?clientId=${clientId}&username=${clientname}`);
            return(socket)
        }
    }

    return socket;
};

export const closeWebSocket = (playerID) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        sendWebSocketMessage('close',false,playerID,{})
        socket.close();
        socket=null
        buttonpressed=false
    }
};

export const sendWebSocketMessage = (subject, readystate,playerID,body) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        let message={
            subject:subject,
            ready:readystate,
            clientId:playerID,
            body:body
        }
        let messeagesrti=JSON.stringify(message)
        socket.send(messeagesrti);
    }
};