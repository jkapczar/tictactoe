import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {SocketService} from '../services/socket.service';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrls: ['./pregame.component.css']
})
export class PregameComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService,
              private socketService: SocketService) {}

  servers: {id: string, host: string, members: string[]}[] = [];
  validUserNameSubmitted = false;

  ngOnInit(): void {
    this.socketService.getServers().subscribe((data: {id: string, host: string, members: string[]}[]) => {
      console.log(data);
      this.servers = data;
    });
  }
/*
  submitUsername(form: NgForm) {
    if (form.valid) {
      this.userService.username = form.value.username;
      this.validUserNameSubmitted = true;
      console.log(form.value.username);
      this.router.navigate(['/game']);
    }
  }
*/
  joinLobby(id: string) {
    this.socketService.joinServers(id);
  }

  listLobbies() {
    this.socketService.askServers();
  }

}
