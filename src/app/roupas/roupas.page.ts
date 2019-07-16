import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/model/pedido';
import * as firebase from 'firebase';
import { roupas } from 'src/app/model/roupas';
import { ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../service/storage.service';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roupas',
  templateUrl: './roupas.page.html',
  styleUrls: ['./roupas.page.scss'],
})
export class RoupasPage implements OnInit {

  @ViewChild("textoBusca") textoBusca;

  listaDeRoupas: roupas[] = [];
  firestore = firebase.firestore();
  imagem;
  settings = { timestampsInSnapshots: true };
  filtro;
  valor;
  id: string;

  pedido: Pedido = new Pedido();
  filtroBox = "none";

  constructor(public router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public storageServ: StorageService,
    public activateRoute: ActivatedRoute) {

    this.filtro = this.activateRoute.snapshot.paramMap.get('filtro');
    this.valor = this.activateRoute.snapshot.paramMap.get('valor');

    if (this.storageServ.getCart() == null) {
      this.pedido = this.storageServ.getCart()
    } else {
      this.pedido.itens = [];
    }

  }

  ngOnInit() {
    if (this.filtro == null)
      this.getList();
  }

  //lista e functions

  getList() {
    this.loading();

    var ref = firebase.firestore().collection("roupas");
    ref.get().then(query => {
      query.forEach(doc => {
        let r = new roupas();
        r.setDados(doc.data());
        r.id = doc.id;

        let ref = firebase.storage().ref().child(`roupas/${doc.id}.jpg`).getDownloadURL().then(url => {
          r.img = url;

          this.listaDeRoupas.push(r);
        }).catch(err => {
          this.listaDeRoupas.push(r);
        })
      });
      this.loadingController.dismiss();
    });
  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`roupas/${this.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }

  //outros

  async loading() {
    const loading = await this.loadingController.create({
      message: 'Carregando',
      duration: 2000
    });
    await loading.present();
  }

  async toast(msg: string) {
    const toast = await this.toastController.create({
      message: 'Cadastrado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  showFilter(){
    if(this.filtroBox=='none')
      this.filtroBox = 'block'
    else
      this.filtroBox = 'none'
  }

}
