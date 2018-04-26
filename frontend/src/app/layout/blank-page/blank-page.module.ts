import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import {
    DropdownComponent,
} from './components';
import {PageHeaderModule} from "../../shared";
@NgModule({
    imports: [CommonModule,
        BlankPageRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        PageHeaderModule],
    declarations: [BlankPageComponent,

        DropdownComponent,
      ]
})
export class BlankPageModule {}
