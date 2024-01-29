import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from 'app/app.component';
import { appConfig } from 'app/app.config';
import {environment} from "./app/environments/environment";

bootstrapApplication(AppComponent, appConfig)
    .catch(err => console.error(err));

console.log(environment.chatbotApiUrl)
