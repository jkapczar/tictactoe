import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PregameComponent } from './pregame/pregame.component';
import { GameComponent } from './game/game.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {FormsModule} from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import {TableModule} from 'primeng';

const config: SocketIoConfig = { url: 'http://localhost:8080', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    PregameComponent,
    GameComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
