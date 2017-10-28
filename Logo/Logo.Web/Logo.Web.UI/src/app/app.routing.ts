import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './_components/home/index';
import { LoginComponent } from './_components/login/index';
import { RegisterComponent } from './_components/register/index';
import { AuthentificationGuard } from './_guards/index';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthentificationGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);