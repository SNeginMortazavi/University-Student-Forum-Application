import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { PageHeaderModule } from './../../shared';

@NgModule({
    imports: [CommonModule, FormRoutingModule, PageHeaderModule, FormsModule],
    declarations: [FormComponent]
})
export class FormModule {}
