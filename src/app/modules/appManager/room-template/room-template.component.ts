import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
    CreateUpdateRoomTemplateModuleComponent
} from "./create-update-room-template-module/create-update-room-template-module.component";
import {RoomTemplatesService} from "../room-templates.service";


@Component({
    selector: 'app-room-template',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatExpansionModule, RouterLink],
    templateUrl: './room-template.component.html',
    styleUrls: ['./room-template.component.scss']
})
export class RoomTemplateComponent {
    roomTemplates: any[] = [];
    clientId: string = '';
    dialogRef: MatDialogRef<CreateUpdateRoomTemplateModuleComponent, any>;

    constructor(
        private roomTemplatesService: RoomTemplatesService,
        public dialog: MatDialog,
        private _activatedRoute: ActivatedRoute,
    ) {
    }


    ngOnInit(): void {
        this.roomTemplatesService.roomTemplates$.subscribe((roomTemplates) => {
            setTimeout(() => {
                this.roomTemplates = roomTemplates;

            }, 0);
        });
        this.clientId = this._activatedRoute.snapshot.parent.params.clientId;
        this.roomTemplatesService.fetchAll(this.clientId);

    }

    openEditDialog(client: any) {
        this.dialogRef = this.dialog.open(CreateUpdateRoomTemplateModuleComponent,
            {
                maxWidth: '700px',
                width: '100%',
                height: '95%',
                panelClass: 'p-0',
                data: client,
            });

        this.dialogRef.afterClosed().subscribe((result) => {
            console.log('dialog result', result);
            if (result._id) {
                this.roomTemplatesService.updateClients(result, this.clientId).subscribe();
            } else {
                this.roomTemplatesService.createClients(result, this.clientId).subscribe();
            }
        });
    }


    delete(client: any) {
        this.roomTemplatesService.deleteClients(client._id, this.clientId).subscribe();
    }

    prepareRoom(room: any) {
        return {
            ...room,
            conversation: room.conversation.length,
            configuration: {}
        };

    }
}
