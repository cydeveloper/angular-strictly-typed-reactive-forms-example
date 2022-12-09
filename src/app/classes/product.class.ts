import { IProduct } from '../interfaces/product.interface';

export class Product implements IProduct {
  constructor(
    public name: string,
    public price: number,
    public isActive: boolean
  ) {}
}
