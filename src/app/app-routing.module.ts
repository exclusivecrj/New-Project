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
  { 
    path: 'test', 
    loadChildren: './test/test.module#TestPageModule' 
  },
  { 
    path: 'cadastrar-roupa', 
    loadChildren: './cadastrar-roupa/cadastrar-roupa.module#CadastrarRoupaPageModule' 
  },
  { 
    path: 'cadastrar-perfil', 
    loadChildren: './cadastrar-perfil/cadastrar-perfil.module#CadastrarPerfilPageModule' 
  },
  { 
    path: 'lista-roupas', 
    loadChildren: './lista-roupas/lista-roupas.module#ListaRoupasPageModule' 
  },
  { 
    path: 'edita-roupas', 
    loadChildren: './edita-roupas/edita-roupas.module#EditaRoupasPageModule' 
  },
  { 
    path: 'edita-perfil', 
    loadChildren: './edita-perfil/edita-perfil.module#EditaPerfilPageModule'
  },
  { 
    path: 'carrinho', 
    loadChildren: './carrinho/carrinho.module#CarrinhoPageModule' 
  },
  { 
    path: 'inicio', 
    loadChildren: './inicio/inicio.module#InicioPageModule' 
  },
  { 
    path: 'perfil', loadChildren: './perfil/perfil.module#PerfilPageModule' 
  },
  { 
    path: 'roupas', 
    loadChildren: './roupas/roupas.module#RoupasPageModule' 
  }




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
