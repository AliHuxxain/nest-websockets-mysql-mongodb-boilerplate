import { UseGuards } from "@nestjs/common";
import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { SocketGuard } from "src/Authentication/guard/socket.guard";
import config from '../Configuration/config';



@WebSocketGateway(config.socketServerPort, { namespace: 'chat' })
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


	@WebSocketServer()
	server: Server;


	afterInit (server: Server) {
		console.log(`Websocket Initiated`);
	}


	handleConnection (client: Socket) {
		console.log(`Client connected: ${client.id}`);
	}


	handleDisconnect (client: Socket) {
		console.log(`Client disconnected: ${client.id}`);
	}

	
	@UseGuards(SocketGuard)
	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string): void {
		this.server.emit('message', message);
	}


}