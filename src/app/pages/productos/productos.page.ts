import {Component, OnInit, inject, signal} from '@angular/core';
import {CurrencyPipe} from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton
} from '@ionic/angular';
import {Product, ProductsResponse} from '../../models/product.model';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
  imports: [
    CurrencyPipe,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonSpinner,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton
  ]
})
export class ProductosPage implements OnInit {

  private productService = inject(ProductService);

  products = signal<Product[]>([]);   // lista de productos, empieza vacía
  total = signal(0);                  // total de productos en la API
  loading = signal(false);            // ¿está cargando?
  error = signal('');                 // mensaje de error ('' = sin error)

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);   // enciende el spinner
    this.error.set('');       // borra el error anterior

    this.productService.getProducts().subscribe({
      next: (response: ProductsResponse) => {
        this.products.set(response.products);   // abre el "sobre" y guarda la lista
        this.total.set(response.total);
        this.loading.set(false);                // apaga el spinner
      },
      error: (err) => {
        console.error(err);
        this.error.set('No se han podido cargar los productos.');
        this.loading.set(false);                // apaga el spinner también si falla
      }
    });
  }
}
