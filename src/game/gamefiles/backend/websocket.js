
export let socket = null;

export const initializeWebSocket = (clientId,clientname) => {
    if (!socket || socket.readyState === WebSocket.CLOSED) {
        // Create a new WebSocket instance if not exists or closed
        socket = new WebSocket(`ws://localhost:8080?clientId=${clientId}&username=${clientname}`);
        return(socket)
}

return socket;
};

export const closeWebSocket = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
    }
};

export const sendWebSocketMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
    }
};