import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "@auth0/auth0-angular";
import {RoomsService} from "../rooms.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {EditClientDialogComponent} from "../../clientsManager/edit-client-dialog/edit-client-dialog.component";
import {CreateUpdateRoomsDialogComponent} from "./create-update-rooms-dialog/create-update-rooms-dialog.component";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-rooms',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatExpansionModule, RouterLink],
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {
    rooms: any[] = [];
    clientId: string = '';
    constructor(
        public auth: AuthService,
        private roomsService: RoomsService,
        public dialog: MatDialog,
        private _activatedRoute: ActivatedRoute,
    ) {
    }


    ngOnInit(): void {
        this.roomsService.rooms$.subscribe((clients) => {
            this.rooms = clients;
        });
        debugger
        this.clientId =  this._activatedRoute.snapshot.parent.params.clientId;

        this.roomsService.fetchAll( this.clientId);

    }

    openEditDialog(client: any) {
        let dialogRef: MatDialogRef<CreateUpdateRoomsDialogComponent, any>;
        dialogRef = this.dialog.open(CreateUpdateRoomsDialogComponent,
            {
                maxWidth: '700px',
                width: '100%',
                data: client,
            });

        dialogRef.afterClosed().subscribe((result) => {
            if (result._id) {
                this.roomsService.updateClients(result, this.clientId).subscribe();
            } else {
                this.roomsService.createClients(result, this.clientId).subscribe();
            }
        });
    }


    delete(client: any) {
        this.roomsService.deleteClients(client._id, this.clientId).subscribe();
    }
}
