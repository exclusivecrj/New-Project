import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditaMarcaPage } from './edita-marca.page';

const routes: Routes = [
  {
    path: '',
    component: EditaMarcaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditaMarcaPage]
})
export class EditaMarcaPageModule {}
