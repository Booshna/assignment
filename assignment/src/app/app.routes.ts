import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadChildren: () =>
            import('./pin-list/pin-list.routes').then(
                (mod) => mod.listRoutes
            )
    },

    {
        path: 'addPin',
        loadChildren: () =>
            import('./pin/pin.routes').then(
                (mod) => mod.pinRoutes
            )
    },
    {
        path: 'addCustomer', loadChildren: () =>
            import('./customer/customer.routes').then((mod) => mod.customerRoutes)
    }
];
