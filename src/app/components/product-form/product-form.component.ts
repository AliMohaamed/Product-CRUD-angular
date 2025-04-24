import { Component, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IProduct } from '../../models/iproduct';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductAPIService } from '../../services/product-api.service';

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
    private productService: ProductAPIService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params) => {
        this.productId = params['id'];
        this.getName.setValue('');
        this.getPrice.setValue('');
        this.getQuantity.setValue('');
      },
    });
    if (this.productId != 0) {
      this.productService.getProductById(this.productId).subscribe({
        next: (res) => {
          this.getName.setValue(res.name);
          this.getPrice.setValue(res.price.toString());
          this.getQuantity.setValue(res.quantity.toString());
        },
      });
    }
  }

  productForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('^[A-Za-z\\s-]{2,50}$'),
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

    if (this.productForm.status == 'VALID') {
      if (this.productId == 0) {
        console.log('DONE');
        // add product
        this.productService.addProduct(this.productForm.value).subscribe({
          next: (res) => this.router.navigate(['./products']),
          error: (err) => console.log(err),
        });
      } else {
        // edit
        this.productService
          .editProduct(this.productId, this.productForm.value)
          .subscribe({
            next: (res) => this.router.navigate(['./products']),
            error: (err) => console.log(err),
          });
      }
    } else {
      console.warn('Form is invalid!');
      this.productForm.markAllAsTouched();
    }
  }
}
