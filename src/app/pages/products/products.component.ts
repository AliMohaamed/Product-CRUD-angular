import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IProduct } from '../../models/iproduct';
// import { StaticProductService } from '../../services/static-product.service';
import { ProductAPIService } from '../../services/product-api.service';

@Component({
  selector: 'app-products',
  imports: [RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products!: IProduct[];
  constructor(
    private productsService: ProductAPIService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => console.log('Error', error),
    });
  }
  deleteHandler(productId: string) {
    this.productsService.deleteProduct(productId).subscribe({
      next: () => {
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
      },
    });
  }
}
