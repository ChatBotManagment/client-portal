import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-create-edit-people-dialog',
  standalone: true,
    imports: [CommonModule, MatButtonModule, MatExpansionModule, FormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './create-edit-people-dialog.component.html',
  styleUrls: ['./create-edit-people-dialog.component.scss']
})
export class CreateEditPeopleDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<CreateEditPeopleDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    yourForm: FormGroup;

    ngOnInit(): void {
        console.log(this.data);
        const prompt = this.data.description;
        const personData = {...this.data};
        delete personData.prompt;
        delete personData.createdBy;
        delete personData.createdAt;
        delete personData.updatedAt;
        delete personData.__v;
        delete personData._id;



        this.yourForm = new FormGroup({
            prompt: new FormControl(prompt),
            personData: new FormControl(JSON.stringify(personData, null, 4)),
        });
    }


    onSubmit() {
        if (this.yourForm.valid) {
            let value: any ;
            const valueData = this.yourForm.value.personData;
            try {
                value = JSON.parse(valueData);
            } catch (e) {
                value = undefined;
            }
            if(!value) return;

            if(this.data._id)
                value._id = this.data._id;

            value.description = this.yourForm.value.prompt;
            /*  value.createdBy = this.data.createdBy;
                 value.createdAt = this.data.createdAt;
                 value.updatedAt = this.data.updatedAt;
                 value.__v = this.data.__v;*/



            this.dialogRef.close( value);
        }
    }


    onNoClick() {
        this.dialogRef.close();
    }

    resetData() {
        const defaultValue = {
            // "creditLog": [],
            // "_id": "65a5ccd8dc608866fd87f3f8",
            "name": "",
            "credentialIds": [],
            "type": "user",
            "gender": "male",
            "age": "16",
            "profilePic": "",
            "description": "",
            "metaData": {
                "anydata": "asd"
            },
            // "createdBy": "auth0|65a2fd07de0857c1cb95d20d",
            // "createdAt": "2024-01-16T00:24:56.436Z",
            // "updatedAt": "2024-01-16T00:24:56.436Z",
            // "__v": 0
        };

        this.yourForm.controls.personData.setValue(
            JSON.stringify(defaultValue, null, 4)
        );
    }
}
