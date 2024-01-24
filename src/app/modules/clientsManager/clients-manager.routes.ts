import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import {ClientsListComponent} from "./clients-list/clients-list.component";

export default [

    {
        path: '',
        component: ClientsListComponent,
    },
/*    {
        path     : 'clients',
        component: ClientsListComponent,
        children : [
            {
                path     : '',
                component: InventoryListComponent,
                resolve  : {
                    brands    : () => inject(InventoryService).getBrands(),
                    categories: () => inject(InventoryService).getCategories(),
                    products  : () => inject(InventoryService).getProducts(),
                    tags      : () => inject(InventoryService).getTags(),
                    vendors   : () => inject(InventoryService).getVendors(),
                },
            },
        ],
    },*/
] as Routes;
