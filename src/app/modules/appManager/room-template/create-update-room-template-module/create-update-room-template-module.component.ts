import {Component, Inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-create-update-room-template-module',
  standalone: true,
    imports: [CommonModule, FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './create-update-room-template-module.component.html',
  styleUrls: ['./create-update-room-template-module.component.scss']
})
export class CreateUpdateRoomTemplateModuleComponent {
    constructor(
        public dialogRef: MatDialogRef<CreateUpdateRoomTemplateModuleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    yourForm: FormGroup;

    ngOnInit(): void {
        console.log(this.data);
        const prompt = this.data.prompt;
        const templateData = {...this.data};
        delete templateData.prompt;
        delete templateData.createdBy;
        delete templateData.createdAt;
        delete templateData.updatedAt;
        delete templateData.__v;
        delete templateData._id;



        this.yourForm = new FormGroup({
            prompt: new FormControl(prompt),
            templateData: new FormControl(JSON.stringify(templateData, null, 4)),
        });
    }


    onSubmit() {
        if (this.yourForm.valid) {
            let value: any ;
            const valueData = this.yourForm.value.templateData;
            try {
                value = JSON.parse(valueData);
            } catch (e) {
                value = undefined;
            }
            if(!value) return;

         if(this.data._id)
                value._id = this.data._id;

            value.prompt = this.yourForm.value.prompt;
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
            name: "",
            description: "",
            group: "",
            groupSlug: "",
            defaultParties: [],
            bots: [
                {
                    personTemplateId: "",
                    name: "anyName",
                    type: "bot",
                    gender: "female",
                    age: "16",
                    profilePic: "https://picsum.photos/id/497/200",
                    description: "",
                    metaData: {
                        "anydata": "asd"
                    }
                }
            ],
            memory: "",
            metaData: {
                "any": "asd"
            }
        };

        this.yourForm.controls.templateData.setValue(
          JSON.stringify(defaultValue, null, 4)
        );
    }
}
