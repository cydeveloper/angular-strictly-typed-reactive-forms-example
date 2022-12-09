import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from '../classes/product.class';
import { IProductForm } from '../interfaces/product-form.interface';
import { IProduct } from '../interfaces/product.interface';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
})
export class ProductsComponent {
  public productsData: IProduct[];
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productsData = new Array<IProduct>();

    this.form = this.fb.group<IProductForm>({
      name: new FormControl<string>('', Validators.required),
      price: new FormControl<number>(null, Validators.required),
      isActive: new FormControl<boolean>(false, { nonNullable: true }),
    });
  }

  public add(values: IProduct): void {
    if (this.form.valid) {
      this.productsData.push(
        new Product(values.name, values.price, values.isActive)
      );
      this.form.reset();
    }
  }
}
