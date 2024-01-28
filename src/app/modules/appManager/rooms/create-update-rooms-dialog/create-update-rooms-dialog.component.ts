import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
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

        const prompt = this.data?.configuration?.prompt || '';
        const roomData = {...this.data};
        delete roomData.configuration?.prompt;
        delete roomData.conversation;
        delete roomData.createdBy;
        delete roomData.createdAt;
        delete roomData.updatedAt;
        delete roomData.__v;
        delete roomData._id;
        if (roomData.configuration) {
            delete roomData.configuration.createdBy;
            delete roomData.configuration.createdAt;
            delete roomData.configuration.updatedAt;
            delete roomData.configuration.__v;
        }

        // configuration
        // conversation
        // createdAt
        // createdBy
        // parties
        // title
            this.yourForm = new FormGroup({
                prompt: new FormControl(prompt),
                roomData: new FormControl(JSON.stringify(roomData, null, 4)),
            });

    }


    onSubmit() {
        if (this.yourForm.valid) {
            let value: any;
            const valueData = this.yourForm.value.roomData;
            try {
                value = JSON.parse(valueData);
            } catch (e) {
                value = undefined;
            }
            if (!value) return;

            if (this.data._id)
                value._id = this.data._id;
            if (!value.configuration)
                value.configuration = {};
            if (this.data?.configuration?.createdBy)
                value.configuration.createdBy = this.data.configuration.createdBy;
            if (this.data?.configuration?.createdAt)
                value.configuration.createdAt = this.data.configuration.createdAt;
            if (this.data?.configuration?.updatedAt)
                value.configuration.updatedAt = this.data.configuration.updatedAt;


            value.configuration.prompt = this.yourForm.value.prompt;


            this.dialogRef.close(value);
        }
    }


    onNoClick() {
        this.dialogRef.close();
    }


    resetData() {
        const defaultValue = {
            "configuration": {
                // _id: "65a35411ebe02be943dc0d7a",
                name: "",
                title: "",
                description: "",
                group: "",
                groupSlug: "",
                defaultParties: [],
                bots: [
                    {
                        "personTemplateId": "",
                        "name": "Sonia",
                        "type": "bot",
                        "gender": "female",
                        "age": "16",
                        "profilePic": "https://picsum.photos/id/497/200",
                        "description": "",
                        "metaData": {
                            "anydata": "asd"
                        }
                    }
                ],
                memory: "",
                metaData: {
                    any: ""
                }
            },
            parties: []
        };

        this.yourForm.controls.roomData.setValue(
            JSON.stringify(defaultValue, null, 4)
        );
    }
}
