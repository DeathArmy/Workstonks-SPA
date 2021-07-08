import {Customer} from './Customer'

export class formFieldsModel {
    vin?: string;
    make?: string;
    model?: string;
    productionYear?: string;
    engineDescription?: string;
    power?: number;
    description?: string;
  
    customer = new Customer;
  }