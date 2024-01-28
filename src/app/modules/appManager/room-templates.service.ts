import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environments";
import {BehaviorSubject, tap} from "rxjs";
import {AuthService} from "../../core/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoomTemplatesService {

    constructor(private httpClient: HttpClient, private auth: AuthService) {
        this.auth.isAuthenticated$.subscribe((claims) => {
            if (claims) {
                this.token = this.auth.accessToken;
                this.fetchAll(this.clientId)
            }
        });
    }

    private roomTemplates$ub: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get roomTemplates$() {
        return this.roomTemplates$ub.asObservable();
    }

    token: string = '';
    clientId: string = '';

    apiUrl = `${environment.chatbotApiUrl}/api/v1/room-template`;

    fetchAll(clientId: string) {
        this.clientId = clientId;
        if (this.token && clientId)
            this.httpClient.get<any[]>(this.apiUrl, {
                headers: {
                    'Client-Id': clientId,
                    'Authorization': `Bearer ${this.token}`
                }
            }).pipe(
                tap((clients) => {
                    this.roomTemplates$ub.next(clients);
                })
            ).subscribe();

    }

    getRoom(id: string, clientId: string) {
        if (this.token && clientId)
        return this.httpClient.get<any[]>(`${this.apiUrl}/${id}`, {
            headers: {
                'Client-Id': clientId,
                'Authorization': `Bearer ${this.token}`
            }}
        );
    }

    updateClients(client: any, clientId: string) {
        if (this.token && clientId)
        return this.httpClient.patch<any[]>(`${this.apiUrl}/${client._id}`, client, {
            headers: {
                'Client-Id': clientId,
                'Authorization': `Bearer ${this.token}`
            }}).pipe(
            tap((clients) => {
                this.fetchAll(clientId);
            })
        );
    }

    createClients(client: any, clientId: string) {
        if (this.token && clientId)
        return this.httpClient.post<any[]>(this.apiUrl, client, {
            headers: {
                'Client-Id': clientId,
                'Authorization': `Bearer ${this.token}`
            }}).pipe(
            tap((clients) => {
                this.fetchAll(clientId);
            })
        );
    }

    deleteClients(id: string, clientId: string) {
        if (this.token && clientId)
        return this.httpClient.delete<any[]>(`${this.apiUrl}/${id}`, {
            headers: {
                'Client-Id': clientId,
                'Authorization': `Bearer ${this.token}`
            }}).pipe(
            tap((clients) => {
                this.fetchAll(clientId);
            })
        );
    }
}
