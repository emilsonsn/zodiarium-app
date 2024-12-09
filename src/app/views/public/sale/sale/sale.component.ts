import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from '@services/product.service';
import { DialogSaleComponent } from '@shared/dialogs/dialog-sale/dialog-sale.component';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent {
  mainProduct: any = null;
  upsellProducts: any[] = [];
  bundle: any = null;
  loading: boolean = false;

  constructor(
    private readonly _productService: ProductService,
    private readonly _dialog: MatDialog
  ) {}

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
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
      }
    });
  }

  openDialogProduct(products?: string) {
    let amount = 0;
    switch (products) {
      case 'bundle':
        let bundles = this.bundle.reports.map(product => product.id);
        products = bundles.join(',');
        amount = this.bundle.reports
          .map(product => +product.amount)
          .reduce((total, current) => total + current, 0);
        break;
    
      case 'main':
        products = this.mainProduct.id;
        amount = this.mainProduct.amount;
        break;
    }
    

    this._initOrStopLoading()
    this._dialog
      .open(DialogSaleComponent, {
        data: {products, amount},
        width: '95%',
        maxWidth: '850px',
        maxHeight: '95%',
        disableClose: true,
      })
      .afterClosed()
      .pipe(finalize(() => this._initOrStopLoading()))
      .subscribe((res) => {
        if (res) {

        }
      });
  }

  private _initOrStopLoading(){
    this.loading = !this.loading;
  }
}
