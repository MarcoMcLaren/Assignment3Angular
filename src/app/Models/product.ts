import { ProductType } from "./ProductType";
import { Brand } from "./brand";

export interface Product {
    name: string;
    price: number | null;
    description: string;
    brandId: number | null;
    brandName: string; // Add this property
    productTypeId: number | null;
    productTypeName: string; // Add this property
  }
