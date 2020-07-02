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


  createServers() {
    this.socket.emit('createLobby');
  }

  askServers() {
    this.socket.emit('askLobbies');
  }

  joinServers(id: string) {
    this.socket.emit('joinLobby', {id});
  }

  destroyServers() {
    this.socket.emit('destroyLobby');
  }

  getServers() {
    return this.socket.fromEvent('getLobbies');
  }

  disconnect() {
    return this.socket.fromEvent('disconnect');
  }

}
