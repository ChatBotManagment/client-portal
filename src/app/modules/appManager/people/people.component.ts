import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";


import {ActivatedRoute, RouterLink} from "@angular/router";
import {PeopleService} from "../people.service";
import {CreateEditPeopleDialogComponent} from "./create-edit-people-dialog/create-edit-people-dialog.component";

@Component({
  selector: 'app-people',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatExpansionModule, RouterLink],
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
    people: any[] = [];
    clientId: string = '';
    dialogRef: MatDialogRef<CreateEditPeopleDialogComponent, any>;

    constructor(
        private peopleService: PeopleService,
        public dialog: MatDialog,
        private _activatedRoute: ActivatedRoute,
    ) {
    }


    ngOnInit(): void {
        this.peopleService.people$.subscribe((people) => {
            setTimeout(() => {
                this.people = people;

            }, 0);
        });
        this.clientId = this._activatedRoute.snapshot.parent.params.clientId;
        this.peopleService.fetchAll(this.clientId);

    }

    openEditDialog(client: any) {
        this.dialogRef = this.dialog.open(CreateEditPeopleDialogComponent,
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
                this.peopleService.updateClients(result, this.clientId).subscribe();
            } else {
                this.peopleService.createClients(result, this.clientId).subscribe();
            }
        });
    }


    delete(client: any) {
        this.peopleService.deleteClients(client._id, this.clientId).subscribe();
    }


}
