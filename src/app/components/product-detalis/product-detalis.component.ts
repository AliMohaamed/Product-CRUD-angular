import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/iproduct';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StaticProductService } from '../../services/static-product.service';

@Component({
  selector: 'app-product-detalis',
  imports: [RouterModule],
  templateUrl: './product-detalis.component.html',
  styleUrl: './product-detalis.component.css',
})
export class ProductDetalisComponent implements OnInit {
  product!: IProduct;
  productId!: number;
  constructor(
    private productServices: StaticProductService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.product = this.productServices.getProductByID(this.productId - 1);
  }
}
