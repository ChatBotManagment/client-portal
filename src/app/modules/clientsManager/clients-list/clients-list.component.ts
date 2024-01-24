import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule, DOCUMENT} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {AuthService} from "@auth0/auth0-angular";
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
        public auth: AuthService,
        private clientsService: ClientsService,
        public dialog: MatDialog
    ) {
    }


    ngOnInit(): void {
        this.clientsService.clients$.subscribe((clients) => {
            this.clients = clients;
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
