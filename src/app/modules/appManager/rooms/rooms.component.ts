import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomsService} from "../rooms.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
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
    dialogRef: MatDialogRef<CreateUpdateRoomsDialogComponent, any>;

    constructor(
        private roomsService: RoomsService,
        public dialog: MatDialog,
        private _activatedRoute: ActivatedRoute,
    ) {
    }


    ngOnInit(): void {
        this.roomsService.rooms$.subscribe((clients) => {
            setTimeout(() => {
                this.rooms = clients;
            }, 1);
        });
        this.clientId = this._activatedRoute.snapshot.parent.params.clientId;
        this.roomsService.fetchAll(this.clientId);

    }

    openEditDialog(client: any) {
        this.dialogRef = this.dialog.open(CreateUpdateRoomsDialogComponent,
            {
                maxWidth: '700px',
                width: '100%',
                height: '95%',
                data: client,
            });

        this.dialogRef.afterClosed().subscribe((result) => {
            if (result?._id) {
                this.roomsService.updateClients(result, this.clientId).subscribe();
            } else {
                this.roomsService.createClients(result, this.clientId).subscribe();
            }
        });
    }


    delete(client: any) {
        this.roomsService.deleteClients(client._id, this.clientId).subscribe();
    }

    prepareRoom(room: any) {
        return {
            ...room,
            conversation: room.conversation?.length,
            configuration: {}
        };

    }
}
