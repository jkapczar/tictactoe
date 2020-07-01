import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  messages = '';


  ngOnInit(): void {
    this.socketService.getMessage().subscribe((data: {clientid: string, username: string , msg: string}) => {
      console.log(data);
      this.messages += data.username + ': ' + data.msg + '\n';
    });
    this.socketService.disconnect().subscribe((data: {clientid: string}) => {
      console.log('disconnected');
      this.messages += data.clientid + ' is disconnected!' + '\n';
    });
  }

  sendMessage(form: NgForm) {
    this.socketService.sendMessage(form.value.msg);
  }

}
