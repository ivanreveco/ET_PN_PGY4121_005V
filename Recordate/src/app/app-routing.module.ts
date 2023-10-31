import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./auth/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home-page',
    loadChildren: () => import('./Pages/home-page/home-page.module').then( m => m.HomePagePageModule),canActivate:[AuthGuard]
  },
  {
    path: 'note',
    loadChildren: () => import('./Pages/note/note.module').then( m => m.NotePageModule),canActivate:[AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./auth/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'notfound',
    loadChildren: () => import('./Pages/notfound/notfound.module').then( m => m.NotfoundPageModule)
  },
  
  {
    path: '**',
    redirectTo: 'notfound',
    pathMatch: 'full'
  },
  


  
 
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
