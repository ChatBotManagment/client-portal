import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {RouterLink} from "@angular/router";


@Component({
    selector: 'app-room-template',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatExpansionModule, RouterLink],
    templateUrl: './room-template.component.html',
    styleUrls: ['./room-template.component.scss']
})
export class RoomTemplateComponent  {
    rooms: any[] = [];

}
