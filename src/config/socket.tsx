import { io } from 'socket.io-client';

const socket = io('http://localhost:8080', {
    transports: ['websocket', 'polling'], // Adicione 'polling' como transporte de fallback
  });

socket.on('connect', () => {
    console.log('Connected to server');
});

export default socket
