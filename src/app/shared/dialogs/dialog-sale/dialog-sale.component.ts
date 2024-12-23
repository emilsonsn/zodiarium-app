import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sale } from '@models/sale';
import { SaleService } from '@services/sale.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ProductService } from '@services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-sale',
  templateUrl: './dialog-sale.component.html',
  styleUrl: './dialog-sale.component.scss'
})
export class DialogSaleComponent implements OnInit, OnDestroy{

  public form: FormGroup;
  public loading: boolean;
  public sale: Sale;
  public stripe: Stripe | null = null;
  public totalAmount: number = 0.1;
  public productsArray = [];
  private intervalId: any;

  saleSteps = ['Setup', 'EupagoPayment', 'StripePayment'];

  saleStep: string = 'Setup';
  upsellProducts: any[] = [];
  isUpsell = false;

  public paymentsMethods = [
    {
      label: "Multibanco",
      value: "Multibanco"
    },
    {
      label: "Mbway",
      value: "Mbway"
    },
    {
      label: "Cartão de crédito",
      value: "Stripe"
    }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    protected readonly _data: {products: string, amount: number},
    private readonly _fb: FormBuilder,
    private readonly _dialogRef: MatDialogRef<DialogSaleComponent>,
    private readonly _saleService: SaleService,
    private readonly _toastr: ToastrService,
    private readonly _productService: ProductService,
    private readonly _route: Router
  ){}

  ngOnInit(){    
    this.form = this._fb.group({
      client_id: ['', [Validators.required]],
      payment_method: ['', [Validators.required]],
      country_code: ['+351'],
      ddi: ['+351'],
      phone: [''],   
      products: ['', [Validators.required]],
    });

    const client_id = parseInt(localStorage.getItem('client_id') ?? '0');
    this.form.patchValue({
      client_id,
      products: this._data.products
    });

    this.totalAmount = parseFloat(this._data.amount+'');

    this.form.get('payment_method').valueChanges
    .subscribe(value => {
        if (value === 'Mbway'){
          this.form.get('phone').addValidators([Validators.required]);         
        }else{
          this.form.get('phone').clearValidators();
        }
        this.form.get('phone').updateValueAndValidity()
    })

    this.loadUpsel();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  public onSubmit(form: FormGroup): void {
    if (!form.valid) {
      form.markAllAsTouched();
      return;
    }
    this._postProduct(form);
  }

  protected _initOrStopLoading() {
    this.loading = !this.loading;
  }

  _postProduct(form: FormGroup){
    this._initOrStopLoading()
    this._saleService.create({
      ...form.getRawValue(),
      products: form.get('products').value+'',
    })
    .pipe(finalize(() => this._initOrStopLoading()))
    .subscribe({
      next: (res) =>{
        this.sale = res.data;
        this.verifyPayment(res.data.id);
        switch(this.sale.payment.origin_api) {
          case 'Eupago':
            this.saleStep = this.saleSteps[1];          
            break;
          case 'Stripe':
            this.saleStep = this.saleSteps[2];
            setTimeout(() => this.setupStripeCheckout(this.sale.payment.reference), 1500);
            break;
          default:
        }
      },
      error: (error) => {
        this._toastr.error(error.error.message)
      }
    });
  }

  private verifyPayment(id){    
    this.intervalId = setInterval(() => {
      this._saleService.verifyPayment(id)
     .subscribe({
      next: (res) => {
        console.log(res);
        if(res?.data?.paid){
          this._dialogRef.close();
          this._route.navigate(['/success']);
        }
      },
      error(){}
     });
    }, 5000);
  }

  public onCancel(): void {
    this._dialogRef.close();
  }

  public loadUpsel(){
    this._productService.show()
    .subscribe({
      next: (res: any) => {
        this.upsellProducts = res.data.upsell;
      },
      error: (error: any) => {
        console.error('Error fetching upsell products:', error);
      }
    });
  }

  public upsellPay(product_id, amount) {
    this.productsArray = (this.form.get('products').value.toString()).split(',');
  
    if (this.productsArray.includes(product_id.toString())) {
      this.productsArray = this.productsArray.filter(id => id !== product_id.toString());
      this.totalAmount -= amount;
    } else {
      this.productsArray.push(product_id.toString());
      this.totalAmount += parseFloat(amount);
    }
    console.log(this.productsArray);
    this.form.get('products').patchValue(this.productsArray.join(','));
  }
  
  private async setupStripeCheckout(transactionId: string): Promise<void> {
    this.stripe = await loadStripe('pk_live_51QSQPKAcoLcDjN3KdXeTdcQuCjgglEjQXOKCkIn9WmtkaA3mKDjN8yjwNhvhhXiKrlUIN2fAolr2C9o7mtGh4YVI0091RT5Y62'); // Substitua pela sua chave pública Stripe
  
    if (this.stripe) {
      this.stripe.redirectToCheckout({
        sessionId: transactionId,
      }).then((result) => {
        if (result.error) {
          console.error('Erro ao redirecionar para o Stripe Checkout:', result.error.message);
        }
      });
    }
  }
}