import { ModelWithId } from '../Firestore';
import { ProductFlavor, ProductModel } from '../Products/Product';

export interface MakeOrderForm {
  steps: {
    activeStep: number;
    completedSteps: number[];
  };
  selectedProducts: {
    productId: string;
    quantity: number;
    specs: {
      quantity: number;
      specs: {
        index: number;
        optionIndex: number | null;
      }[];
    }[];
  }[];
  products: {
    products: ModelWithId<ProductModel>[];
    loading: boolean;
  };
  filters: { flavor: ProductFlavor | null };
  billingInformation: {
    billingType: 'electronic' | 'charge';
    email: string;
    documentType: 'nit' | 'personal' | null;
    documentNumber: string | null;
    businessName: string;
    name: string;
    lastName: string;
    phoneNumber: number | null;
    rut: string | null;
    rutEmail: string | null;
  };
  shippingInformation: {
    address: string;
    city: string | null;
    neighborhood: string;
    name: string | null;
    lastName: string | null;
    phoneNumber: number | null;
    details: string | null;
    date: Date | null;
  };
}

export interface IStep {
  label: string;
  helper?: string;
}
