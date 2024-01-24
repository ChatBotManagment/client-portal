import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthHttpInterceptor} from "@auth0/auth0-angular";
import {AuthInterceptor} from "./interceptor/auth.interceptor";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [RouterOutlet],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class AppComponent {
    /**
     * Constructor
     */
    constructor() {
    }
}
