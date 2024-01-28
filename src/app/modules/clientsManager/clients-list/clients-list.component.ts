import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {RouterLink} from "@angular/router";
import {ClientsService} from "../clients.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditClientDialogComponent} from "../edit-client-dialog/edit-client-dialog.component";

@Component({
    selector: 'app-clients-list',
    standalone: true,
    imports: [CommonModule, MatIconModule, MatButtonModule, MatExpansionModule, RouterLink],
    templateUrl: './clients-list.component.html',
    styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
    clients: any[] = [];

    constructor(
        private clientsService: ClientsService,
        public dialog: MatDialog
    ) {
    }


    ngOnInit(): void {
        this.clientsService.clients$.subscribe((clients) => {
            this.clients = clients.map((client) => {
                const client1 = {...client};
                delete client1['walletLog'];
                client1.walletLogLength = client?.walletLog?.length || 0;
                return client1;
            });
        });
        this.clientsService.fetchClients().subscribe();

    }

    openEditDialog(client: any) {
        let dialogRef: MatDialogRef<EditClientDialogComponent, any>;
        dialogRef = this.dialog.open(EditClientDialogComponent,
            {
                maxWidth: '700px',
                width: '100%',
                data: client,
            });

        dialogRef.afterClosed().subscribe((result) => {
            if (result._id) {
                this.clientsService.updateClients(result).subscribe();
            } else {
                this.clientsService.createClients(result).subscribe();
            }
        });
    }


    delete(client: any) {
        this.clientsService.deleteClients(client._id).subscribe();
    }
}
