import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ActivatedRoute, RouterModule } from '@angular/router';
// import { StaticProductService } from '../../services/static-product.service';
import { ProductAPIService } from '../../services/product-api.service';

@Component({
  selector: 'app-product-detalis',
  imports: [RouterModule],
  templateUrl: './product-detalis.component.html',
  styleUrl: './product-detalis.component.css',
})
export class ProductDetalisComponent implements OnInit {
  product!: IProduct;
  productId!: any;
  constructor(
    private productServices: ProductAPIService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    this.productServices.getProductById(this.productId).subscribe({
      next: (res) => (this.product = res),
      error: (err) => console.log(err),
    });
  }
}
