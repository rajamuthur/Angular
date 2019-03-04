import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordianComponent } from './accordian.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

@NgModule({
  declarations: [
    AccordianComponent
  ],
  imports: [    
    CommonModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AccordianComponent,
  ],
  providers: [],
})

export class SharedModule { }
