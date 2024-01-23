import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
    selector: 'app-edit-client-dialog',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatInputModule, MatButtonModule],
    templateUrl: './edit-client-dialog.component.html',
    styleUrls: ['./edit-client-dialog.component.scss']
})
export class EditClientDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<EditClientDialogComponent>,
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
            try {
                value.metadata = JSON.parse(value.metadata);
            } catch (e) {
                value.metadata = {};
            }
            this.dialogRef.close(this.yourForm.value);
        }
    }


    onNoClick() {
        this.dialogRef.close();
    }
}
