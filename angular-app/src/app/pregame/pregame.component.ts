import { Component, OnInit } from '@angular/core';
import {SocketService} from '../services/socket.service';
import {Form, NgForm} from '@angular/forms';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrls: ['./pregame.component.css']
})
export class PregameComponent implements OnInit {

  constructor(private socketService: SocketService) {}

  messages = '';

  ngOnInit(): void {
    this.socketService.getMessage().subscribe((data: {clientid: string, msg: string}) => {
      this.messages += data.clientid + ': ' + data.msg + '\n';
    });
  }

  sendMessage(form: NgForm) {
    this.socketService.sendMessage(form.value.msg);
  }

}
