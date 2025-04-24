import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../models/iproduct';
import { StaticProductService } from '../../services/static-product.service';

@Component({
  selector: 'app-products',
  imports: [RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products!: IProduct[];
  constructor(private productsService: StaticProductService) {}
  ngOnInit(): void {
    this.products = this.productsService.getAllProducts();
  }
  deleteProduct(id: number) {
    this.productsService.deleteProduct(id);
    this.products = this.productsService.getAllProducts();
  }
}
