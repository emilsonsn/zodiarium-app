import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableClientComponent } from './table-client/table-client.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PipesModule } from '@shared/pipes/pipes.module';

const tables = [
  TableClientComponent
];

@NgModule({
  declarations: [
    tables
  ],
  exports: [
    tables
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    PipesModule,
  ]
})
export class TablesModule { }
