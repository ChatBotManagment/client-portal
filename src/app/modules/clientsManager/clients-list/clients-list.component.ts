import {Component, Inject} from '@angular/core';
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
export class ClientsListComponent {
    clients: any[] = [];

    constructor(
        public auth: AuthService,
        private clientsService: ClientsService,
        public dialog: MatDialog
    ) {
    }

    fetchClients() {
        this.clientsService.fetchClients().subscribe((client) => {
            this.clients = client;
            console.log(client);
        });
    }

    ngOnInit(): void {
        this.fetchClients();
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

            console.log('The dialog was closed', result);
        });
    }

    addClient() {

    }
}
