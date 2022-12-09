import { FormControl } from '@angular/forms';

export interface IProductForm {
  name: FormControl<string>;
  price: FormControl<number>;
  isActive: FormControl<boolean>;
}
