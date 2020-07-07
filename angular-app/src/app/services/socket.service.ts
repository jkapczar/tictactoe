import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {map} from 'rxjs/operators';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  constructor(private socket: Socket,
              private userService: UserService) {}
  private payload: { message: string; username: string };

  sendMessage(msg: string){
    this.payload = {username: this.userService.username, message: msg};
    this.socket.emit('message', this.payload);
  }

  getMessage() {
    return this.socket
      .fromEvent('message');
      //.pipe(map( (data) => console.log(data)));
  }


  createServer(username: string) {
    this.socket.emit('createServer', {username});
    this.askServers();
  }

  askServers() {
    this.socket.emit('askServers');
  }

  joinServer(id: string, username: string) {
    this.socket.emit('joinServer', {id, username});
  }

  destroyServer() {
    this.socket.emit('destroyServer');
  }

  getServers() {
    return this.socket.fromEvent('getServers');
  }

  disconnect() {
    return this.socket.fromEvent('disconnect');
  }

}
