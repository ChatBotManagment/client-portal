import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-create-update-rooms-dialog',
  standalone: true,
    imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './create-update-rooms-dialog.component.html',
  styleUrls: ['./create-update-rooms-dialog.component.scss']
})
export class CreateUpdateRoomsDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<CreateUpdateRoomsDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    yourForm: FormGroup;

    ngOnInit(): void {
        console.log(this.data);
        this.yourForm = new FormGroup({
            name: new FormControl(this.data.name),
            secret: new FormControl(this.data.secret),
            database: new FormControl(this.data.database),
            openai_api_key: new FormControl(this.data.openai_api_key),
            openai_organization: new FormControl(this.data.openai_organization),
            metadata: new FormControl(JSON.stringify(this.data.metadata)),
            // add other form controls here
        });
    }


    onSubmit() {
        if (this.yourForm.valid) {
            const value = {...this.yourForm.value}
            if(this.data._id)
                value._id = this.data._id;
            try {
                value.metadata = JSON.parse(value.metadata);
            } catch (e) {
                value.metadata = {};
            }

            this.dialogRef.close( value);
        }
    }


    onNoClick() {
        this.dialogRef.close();
    }
}
