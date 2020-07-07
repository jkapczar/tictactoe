import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {SocketService} from '../services/socket.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pregame',
  templateUrl: './pregame.component.html',
  styleUrls: ['./pregame.component.css']
})
export class PregameComponent implements OnInit {

  @ViewChild('joinModalWindow', { static: false }) joinModalWindow;

  constructor(private router: Router,
              private userService: UserService,
              private socketService: SocketService,
              private modalService: NgbModal) {}

  servers: {id: string, host: string, members: string[]}[] = [];
  validUserNameSubmitted = false;
  createMode = false;
  selectedServerId: string;

  ngOnInit(): void {
    this.listLobbies();
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
  openModalDialog() {
    this.modalService.open(this.joinModalWindow);
  }

  selectLobby(id: string) {
    this.selectedServerId = id;
    this.openModalDialog();
  }

  createServer() {
    this.selectedServerId = null;
    this.openModalDialog();
  }

  listLobbies() {
    this.socketService.askServers();
  }

  enterGame(form: NgForm) {
    if (this.selectedServerId) {
      this.socketService.joinServer(this.selectedServerId, form.value.username);
    } else {
      console.log(form.value.username);
      this.socketService.createServer(form.value.username);
    }
    this.modalService.dismissAll();
  }

}
