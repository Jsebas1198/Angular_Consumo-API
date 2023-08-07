import { Component, OnInit } from '@angular/core';

import { Product } from '../../models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  showProductDetail = false;

  //Para mostrar la informacion de un prodcuto
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: '',
  };

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  //Muestra la información del producto seleccionado
  onShowDetail(id:string){
    //en caso de que den dos veces al botón solo ocultara los detalles(para no ir a darle al botón de cerrar)
    if(this.productChosen.id != '' && this.productChosen.id == id && this.showProductDetail==true){
      this.showProductDetail = false;
      return;
    }

    //en caso de que seleccionen el mismo producto ya no hay necesidad de hacer la petición de nuevo y solo vuelve a mostrar el panel
    if(this.productChosen.id != '' && this.productChosen.id == id && this.showProductDetail==false){
      this.showProductDetail = true;
      return;
    }
    //en caso que le den al botón de ver detalles mientras ya están abiertos los de un producto diferente cierra el panel de detalles
    if(this.productChosen.id != '' && this.productChosen.id != id && this.showProductDetail==true){
      this.showProductDetail = false;
    }

    this.productsService.getProduct(id)
    .subscribe(data => {
      this.productChosen = data;
      if(!this.showProductDetail){
        this.toggleProductDetail();
      }

    });
  }
}
