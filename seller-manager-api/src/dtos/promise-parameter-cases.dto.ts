import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductDto } from "./product.dto";

export class PromiseParameterCasesDto {
  priority: number;
  condition: {
    byRequestTime: {
      dayType: string,
      fromTimeOfDay: number,
      toTimeOfDay: number
    }
  };
  packPromise: {
    min: {
      type: string,
      deltaHours: number,
      deltaBusinessDays: number,
      timeOfDay: number
    },
    max: {
      type: string,
      deltaHours: number,
      deltaBusinessDays: number,
      timeOfDay: number
    }
  };
  shipPromise: {
    min: {
      type: string,
      deltaHours: number,
      deltaBusinessDays: number,
      timeOfDay: number
    },
    max: {
      type: string,
      deltaHours: number,
      deltaBusinessDays: number,
      timeOfDay: number
    }
  };
  deliveryPromise: {
    min: {
      type: string
      deltaHours: number,
      deltaBusinessDays: number,
      timeOfDay: number
    },
    max: {
      type: string
      deltaHours: number,
      deltaBusinessDays: number,
      timeOfDay: number
    }
  };
  readyPickUpPromise: {
    min: {
      type: string,
      deltaHours: number,
      deltaBusinessDays: number,
      timeOfDay: number
    },
    max: {
      type: string,
      deltaHours: number,
      deltaBusinessDays: number,
      timeOfDay: number
    }
  };
}
