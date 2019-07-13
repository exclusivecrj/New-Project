import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CadastrarPerfilPage } from './cadastrar-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: CadastrarPerfilPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CadastrarPerfilPage]
})
export class CadastrarPerfilPageModule {}
