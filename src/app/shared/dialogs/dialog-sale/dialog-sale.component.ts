import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sale } from '@models/sale';
import { SaleService } from '@services/sale.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-dialog-sale',
  templateUrl: './dialog-sale.component.html',
  styleUrl: './dialog-sale.component.scss'
})
export class DialogSaleComponent implements OnInit{

  public form: FormGroup;
  public loading: boolean;
  public sale: Sale;
  public stripe: Stripe | null = null;

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
    protected readonly _data: string,
    private readonly _fb: FormBuilder,
    private readonly _dialogRef: MatDialogRef<DialogSaleComponent>,
    private readonly _saleService: SaleService,
    private readonly _toastr: ToastrService,
    private readonly _productService: ProductService,
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
      products: this._data
    });

    this.form.get('payment_method').valueChanges
    .subscribe(value => {
        if (value === 'Mbway'){
          this.form.get('phone').addValidators([Validators.required]);         
        }else{
          this.form.get('phone').clearValidators();
        }
        this.form.get('phone').updateValueAndValidity()
    })
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
        switch(this.sale.payment.origin_api) {
          case 'Eupago':
            this.saleStep = this.saleSteps[1];
            if(!this.isUpsell) this.loadUpsel();
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

  public upsellPay(product_id){
    this.form.get('products').patchValue(product_id+'');
    this.isUpsell = true;
    this.upsellProducts = null;
    this.saleStep = this.saleSteps[0];
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