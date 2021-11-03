import { Injectable } from '@angular/core';
import {Customer} from './Customer'

@Injectable()
export class formFieldsModel {
    id?: number;
    vin?: string;
    make?: string;
    model?: string;
    productionYear?: string;
    engineDescription?: string;
    power?: number;
    description?: string;

    customer = new Customer;
  }
