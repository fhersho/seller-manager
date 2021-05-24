import { PromiseParameterCasesDto } from "./promise-parameter-cases.dto";

export class ShippingMethodDto {
  id: number;
  name: string;
  description: string;
  code: string;
  shipping_type: string;
  rules: {
    availability: {
      byWeight: {
        max: number,
        min: number
      },
      byRequestTime: {
        dayTime: string,
        fromTimeOfDay: number,
        toTimeOfDay: number,
      },
      byWarehouseCoverage: [Object]
    },
    promisesParameters: {
      cases: [
        PromiseParameterCasesDto
      ]
    }
  };
}