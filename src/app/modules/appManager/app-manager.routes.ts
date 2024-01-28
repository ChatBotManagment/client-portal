import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import {RoomsComponent} from "./rooms/rooms.component";
import {RoomTemplateComponent} from "./room-template/room-template.component";
import {AppManagerLayoutComponent} from "./app-manager-layout/app-manager-layout.component";
import {PeopleComponent} from "./people/people.component";
import {ClientInfoComponent} from "./client-info/client-info.component";
import {ClientAuthGuard} from "../../core/auth/guards/clientAuth.guard";

export default [


    {
        canActivateChild: [ClientAuthGuard],
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
            {
                path     : 'people',
                component: PeopleComponent,
            },
            {
                path     : 'client-info',
                component: ClientInfoComponent,
            },
        ],
    },
] as Routes;
