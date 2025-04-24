import { Component, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IProduct } from '../../models/iproduct';
import { StaticProductService } from '../../services/static-product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  sendProducts = output<IProduct[]>();
  checkAllDataValid = false;
  products!: IProduct[];
  productId: any;
  constructor(
    private productService: StaticProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.products = this.productService.getAllProducts();
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-Za-zs-]{2,50}$'),
    ]),
    price: new FormControl('', [Validators.required, Validators.min(10)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)]),
  });

  get getName() {
    return this.productForm.controls['name'];
  }

  get getPrice() {
    return this.productForm.controls['price'];
  }

  get getQuantity() {
    return this.productForm.controls['quantity'];
  }
  // add product
  productHandler(e: Event) {
    e.preventDefault();
    this.checkAllDataValid = this.productForm.valid;

    if (this.productForm.valid) {
      const product = {
        id: this.products[this.products.length - 1]?.id
          ? this.products[this.products.length - 1]?.id + 1
          : 1,
        name: this.productForm.value.name!,
        price: Number(this.productForm.value.price!),
        quantity: Number(this.productForm.value.quantity!),
      };
      const existProduct = this.products.find(
        (item) => item?.name === product.name
      );
      if (!existProduct) {
        if (this.productId == 0) {
          this.productService.addProduct(product);
        } else {
          // edit
          this.productService.editProduct(this.productId, product);
        }
        this.router.navigate(['./products']);
      } else {
        this.checkAllDataValid = false;
      }
    } else {
      console.warn('Form is invalid!');
      this.productForm.markAllAsTouched();
    }
  }
}
