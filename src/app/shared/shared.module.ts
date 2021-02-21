import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AngularMaterialModule } from './angular-material.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AngularMaterialModule, FlexLayoutModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, AngularMaterialModule, FlexLayoutModule],
})
export class SharedModule {}
