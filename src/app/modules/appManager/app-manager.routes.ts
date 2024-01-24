import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import {RoomsComponent} from "./rooms/rooms.component";
import {RoomTemplateComponent} from "./room-template/room-template.component";
import {AppManagerLayoutComponent} from "./app-manager-layout/app-manager-layout.component";

export default [


    {
        path     : ':clientId',
        component: AppManagerLayoutComponent,
        children : [
            {
                path     : 'rooms',
                component: RoomsComponent,
            },
            {
                path     : 'room-templates',
                component: RoomTemplateComponent,
            },
        ],
    },
] as Routes;
