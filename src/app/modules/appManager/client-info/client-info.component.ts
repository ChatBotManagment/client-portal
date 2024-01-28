import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {ClientInfoService} from "../client-info.service";

@Component({
    selector: 'app-client-info',
    standalone: true,
    imports: [CommonModule, MatButtonModule],
    templateUrl: './client-info.component.html',
    styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {

    constructor(private clientInfoService: ClientInfoService) {
    }

    client: any;
    walletLog: any;

    ngOnInit(): void {

        this.clientInfoService.client$.subscribe((client) => {
            this.client = {...client};
            delete this.client['walletLog'];
            this.client['walletLog'] = 'length: '+ (client?.walletLog?.length || 0 )  ;
            this.walletLog = client.walletLog;
            console.log(client);
        });
    }

}
