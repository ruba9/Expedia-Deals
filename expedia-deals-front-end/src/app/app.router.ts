
 import {Routes,RouterModule, Router} from '@angular/router'
 import {HomeComponent} from './home/home.component'
const appRoutes: Routes = [
    
    { path: '',component:HomeComponent},

    { path: '**', component: HomeComponent }
  ];
  export const routing=RouterModule.forRoot(appRoutes)