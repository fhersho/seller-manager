import {Injectable} from '@nestjs/common';
import config from "../shared/config";
import * as fetch from 'node-fetch';
import { ShippingMethodDto } from "../dtos/shipping-method.dto";

const optionsGet = {
  method: 'GET',
  headers: {
    'x-api-key': config.API_KEY
  }
};

@Injectable()
export class MelonnService {


  constructor() {
  }

  async getShippingMethod(): Promise<ShippingMethodDto[]> {
    const response = await fetch(`${config.URL_MELONN_API}/shipping-methods/`, optionsGet);
    return await response.json();
  }

  async getShippingMethodDetail(id: number): Promise<ShippingMethodDto> {
    const response = await fetch(`${config.URL_MELONN_API}/shipping-methods/${id}`, optionsGet);
    return await response.json();
  }


  async getOffDays(): Promise<string[]> {
    const response = await fetch(`${config.URL_MELONN_API}/off-days/`, optionsGet);
    return await response.json();
  }


}
