import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Auth2Guard } from './service/auth2.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pre-login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'logoff', 
    loadChildren: './logoff/logoff.module#LogoffPageModule',
    canActivate: [Auth2Guard] 
  },
  { 
    path: 'pre-login', 
    loadChildren: './pre-login/pre-login.module#PreLoginPageModule' 
  },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'cadastrar-roupa', loadChildren: './cadastrar-roupa/cadastrar-roupa.module#CadastrarRoupaPageModule' },
  { path: 'cadastrar-perfil', loadChildren: './cadastrar-perfil/cadastrar-perfil.module#CadastrarPerfilPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
