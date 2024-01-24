import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environments";
import {BehaviorSubject, tap} from "rxjs";
import {AuthService} from "@auth0/auth0-angular";

@Injectable({
    providedIn: 'root'
})
export class RoomsService {
    token: string = '';
    clientId: string = '';

    constructor(private httpClient: HttpClient, private auth: AuthService) {
        this.auth.idTokenClaims$.subscribe((claims) => {
            if (claims) {
                this.token = claims.__raw;
                this.fetchAll(this.clientId)
            }
        });
    }

    private rooms$ub: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    get rooms$() {
        return this.rooms$ub.asObservable();
    }


    apiUrl = `${environment.chatbotApiUrl}/api/v1/room`;

    fetchAll(clientId: string) {
        debugger
        this.clientId = clientId;
        this.httpClient.get<any[]>(this.apiUrl, {
            headers: {
                'Client-Id': clientId,
                'Authorization': `Bearer ${this.token}`
            }
        }).pipe(
            tap((clients) => {
                this.rooms$ub.next(clients);
            })
        ).subscribe();

    }

    getRoom(id: string, clientId: string) {
        return this.httpClient.get<any[]>(`${this.apiUrl}/${id}`, {headers: {'Client-Id': clientId}});
    }

    updateClients(client: any, clientId: string) {
        return this.httpClient.patch<any[]>(`${this.apiUrl}/${client._id}`, client, {headers: {'Client-Id': clientId}}).pipe(
            tap((clients) => {
                this.fetchAll(clientId);
            })
        );
    }

    createClients(client: any, clientId: string) {
        return this.httpClient.post<any[]>(this.apiUrl, client, {headers: {'Client-Id': clientId}}).pipe(
            tap((clients) => {
                this.fetchAll(clientId);
            })
        );
    }

    deleteClients(id: string, clientId: string) {
        return this.httpClient.delete<any[]>(`${this.apiUrl}/${id}`, {headers: {'Client-Id': clientId}}).pipe(
            tap((clients) => {
                this.fetchAll(clientId);
            })
        );
    }
}
