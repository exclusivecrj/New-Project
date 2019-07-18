import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/model/perfil';
import * as firebase from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-view-perfil',
  templateUrl: './view-perfil.page.html',
  styleUrls: ['./view-perfil.page.scss'],
})
export class ViewPerfilPage implements OnInit {
  
  perfil: Perfil = new Perfil();
  id: string;
  firestore = firebase.firestore();
  settings = { timestampsInSnapshots: true };

  formGroup: FormGroup;

  imagem : string = "";

  constructor(public activateRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public router: Router,
    public loadingController: LoadingController) {

    this.id = this.activateRoute.snapshot.paramMap.get('perfil');
    this.form();

  }

  form() {
    this.formGroup = this.formBuilder.group({
      nome: [this.perfil.nome],
      telefone: [this.perfil.telefone],
      email: [this.perfil.email],
      endereco: [this.perfil.endereco],
      cep: [this.perfil.cep],
      bairro: [this.perfil.bairro],
      complemento: [this.perfil.complemento],
      cpf: [this.perfil.cpf],
      numero: [this.perfil.numero],
      img: [this.perfil.img],
    });
  }

  ngOnInit() {
  }

}
