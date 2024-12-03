import { Component } from '@angular/core';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent {
  mainProduct: any = null;
  upsellProducts: any[] = [];
  bundle: any = null;

  constructor(private readonly _productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this._productService.show().subscribe({
      next: (res: any) => {
        this.mainProduct = res.data.main;
        this.upsellProducts = res.data.upsell;
        this.bundle = res.data.bundle;

        this.bundle.reports.unshift(this.mainProduct);
        console.log(this.bundle);
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }
}
