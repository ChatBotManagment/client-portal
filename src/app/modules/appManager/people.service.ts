import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environments";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
    private people$ub: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    get People$() {
        return this.people$ub.asObservable();
    }

  constructor(private httpClient: HttpClient) { }

    apiUrl = `${environment.chatbotApiUrl}/people`;
    fetchAll() {
        return this.httpClient.get<any[]>(this.apiUrl).pipe(
            tap((clients) => {
                this.people$ub.next(clients);
            })
        );
    }
    getOne(id: string) {
        return this.httpClient.get<any[]>(`${this.apiUrl}/${id}`);
    }

    updateClients(client: any) {
        return this.httpClient.patch<any[]>(`${this.apiUrl}/${client._id}`, client).pipe(
            tap((clients) => {
                this.fetchAll().subscribe();
            })
        );
    }
    createClients(client: any) {
        return this.httpClient.post<any[]>(this.apiUrl, client).pipe(
            tap((clients) => {
                this.fetchAll().subscribe();
            })

        );
    }

    deleteClients(id: string) {
        return this.httpClient.delete<any[]>(`${this.apiUrl}/${id}`).pipe(
            tap((clients) => {
                this.fetchAll().subscribe();
            })
        );
    }
}
