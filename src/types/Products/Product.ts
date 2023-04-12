export interface ProductPriceModel {
  min: number;
  max?: number;
  value: number;
  shipping: number;
}

export interface ProductImageModel {
  src: string;
  alt: string;
}

export type ProductFlavor = 'sweet' | 'salty';

export interface ProductModel {
  sortIndex: number;
  name: string;
  prices: ProductPriceModel[];
  specs: ProductSpec[];
  image: ProductImageModel;
  flavor?: ProductFlavor;
}

export type ProductSpec = {
  label: string;
  helperText?: string;
} & (ProductSingleSpec | ProductMultipleSpec);

interface ProductSingleSpec {
  type: 'single';
  applyCost: number;
  defaultApplied: boolean;
  applyRangeIndexes: number[] | 'all';
  required: boolean;
  otherOptionsDisabled?: {
    index: number;
    subIndex?: number;
  }[];
}

interface ProductMultipleSpec {
  type: 'multiple';
  defaultOptionIndex: number;
  required: boolean;
  options: {
    label: string;
    applyCost: number;
    applyRangeIndexes: number[] | 'all';
    otherOptionsDisabled?: {
      index: number;
      subIndex?: number;
    }[];
  }[];
}
