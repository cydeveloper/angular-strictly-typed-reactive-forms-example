# Angular Strictly Typed Reactive Forms Example

## Live Demo

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-typed-reactive-forms-example)

---
## IProductForm
I've create an interface called IProductForm, which is type casted in the FormBuilder form group in ProductsComponent. This helps enforce strictly typed form fields.

####  product-form.interface
```typescript
import { FormControl } from '@angular/forms';

export interface IProductForm {
  name: FormControl<string>;
  price: FormControl<number>;
  isActive: FormControl<boolean>;
}

```

####  products.component.ts
```typescript
this.form = this.fb.group<IProductForm>({
  name: new FormControl<string>('', Validators.required),
  price: new FormControl<number>(null, Validators.required),
  isActive: new FormControl<boolean>(false, { nonNullable: true })
});
```

```typescript
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
```

#### products.component.html
```html
<h4>Product Inventory</h4>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Is Active</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr [formGroup]="form">
      <td>
        <input type="text" formControlName="name" />
      </td>
      <td>
        <input type="number" formControlName="price" />
      </td>
      <td>
        <input type="checkbox" formControlName="isActive" />
      </td>
      <td>
        <button (click)="add(form.value)">+ Add</button>
      </td>
    </tr>
    <tr *ngFor="let product of productsData">
      <td>{{ product.name }}</td>
      <td>{{ product.price | currency }}</td>
      <td>{{ product.isActive }}</td>
    </tr>
  </tbody>
</table>
```
