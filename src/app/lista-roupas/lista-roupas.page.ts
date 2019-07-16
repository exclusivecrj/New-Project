import { Component, OnInit, ViewChild } from '@angular/core';
import { roupas } from 'src/app/model/roupas';
import * as firebase from 'firebase';
import { Pedido } from 'src/app/model/pedido';
import { StorageService } from '../service/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, PopoverController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lista-roupas',
  templateUrl: './lista-roupas.page.html',
  styleUrls: ['./lista-roupas.page.scss'],
})
export class ListaRoupasPage implements OnInit {

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
    private popoverController: PopoverController,
    public activateRoute: ActivatedRoute,
    private modalController: ModalController) {

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

  showFilter() {
    if (this.filtroBox == 'none')
      this.filtroBox = 'block'
    else
      this.filtroBox = 'none'
  }

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

  busca() {
    console.log(this.textoBusca.value)

    this.listaDeRoupas = [];
    var ref = firebase.firestore().collection("roupas");

    ref.orderBy('roupa').startAfter(this.textoBusca.value).endAt(this.textoBusca.value + '\uf8ff').get().then(doc => {

      if (doc.size > 0) {

        doc.forEach(doc => {

          let r = new roupas();
          r.setDados(doc.data());
          r.id = doc.id;

          let ref = firebase.storage().ref().child(`roupas/${doc.id}.jpg`).getDownloadURL().then(url => {
            r.img = url;
            console.log(r);
            this.listaDeRoupas.push(r);
          }).catch(err => {
            this.listaDeRoupas.push(r);
          })

        })

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
  }

  viewRoupa(obj: roupas) {
    this.router.navigate(['/edita-roupa', { 'roupas': obj.id }]);
  }

  remove(obj: roupas) {
    var ref = firebase.firestore().collection("roupas");
    ref.doc(obj.id).delete()
      .then(() => {
        this.listaDeRoupas = [];
        this.getList();
      }).catch(() => {
        console.log('Erro ao atualizar');
      })
  }

  downloadFoto() {
    let ref = firebase.storage().ref()
      .child(`roupas/${this.id}.jpg`);

    ref.getDownloadURL().then(url => {
      this.imagem = url;
    })
  }

  

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

}
