import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";
import {environment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class ClientInfoService {
    private selectedClientId: string;
    constructor(private httpClient: HttpClient) {
    }
   private selectedClient$ub : BehaviorSubject<any> =  new BehaviorSubject<any>({});
    get client$() {
        return this.selectedClient$ub.asObservable();
    }


    // public readonly selectedClientId$ub: BehaviorSubject<string> =  new BehaviorSubject<string>('');


    apiUrl = `${environment.chatbotApiUrl}/client-info`;

    fetchClient(id: string) {
        this.selectedClientId = id;
        return this.httpClient.get<any>(this.apiUrl+ '/' + id).pipe(
            tap((client) => {
                this.selectedClient$ub.next(client);
            })
        );
    }

/*    getClient(id: string) {
        return this.httpClient.get<any[]>(this.apiUrl + '/' + id);
    }*/

    updateClients(client: any) {
        return this.httpClient.patch<any[]>(`${this.apiUrl}/${this.selectedClientId}`, client).pipe(
            tap((clients) => {
                this.fetchClient(this.selectedClientId).subscribe();
            })
        );
    }



  /*  deactivateClients(id: string) {
        return this.httpClient.delete<any[]>(`${this.apiUrl}/${id}`).pipe(
            tap((clients) => {
                this.fetchClient(this.selectedClientId).subscribe();
            })
        );
    }*/
}
