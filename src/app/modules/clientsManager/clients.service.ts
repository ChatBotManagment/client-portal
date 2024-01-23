import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

    constructor(private httpClient: HttpClient) {}

    fetchClients() {
        return this.httpClient.get<any[]>('http://localhost:3500/client-info');
    }
}
