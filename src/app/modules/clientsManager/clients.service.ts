import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, tap} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClientsService {

    constructor(private httpClient: HttpClient) {
    }
    clients$ub : BehaviorSubject<any[]> =  new BehaviorSubject<any[]>([]);
    get clients$() {
        return this.clients$ub.asObservable();
    }


    public readonly selectedClient$ub: BehaviorSubject<string> =  new BehaviorSubject<string>('');


    apiUrl = `${environment.chatbotApiUrl}/client-info`;

    fetchClients() {
        return this.httpClient.get<any[]>(this.apiUrl).pipe(
            tap((clients) => {
                this.clients$ub.next(clients);
            })
        );
    }

    fetchClient(id: string) {
        return this.httpClient.get<any[]>(this.apiUrl + '/' + id);
    }

    updateClients(client: any) {
        return this.httpClient.patch<any[]>(`${this.apiUrl}/${client._id}`, client).pipe(
            tap((clients) => {
                this.fetchClients().subscribe();
            })
        );
    }

    createClients(client: any) {
        return this.httpClient.post<any[]>(this.apiUrl, client).pipe(
            tap((clients) => {
                this.fetchClients().subscribe();
            })

        );
    }

    deleteClients(id: string) {
        return this.httpClient.delete<any[]>(`${this.apiUrl}/${id}`).pipe(
            tap((clients) => {
                this.fetchClients().subscribe();
            })
        );
    }
}
