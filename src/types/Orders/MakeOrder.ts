export interface MakeOrderForm {
  steps: {
    activeStep: number;
    completedSteps: number[];
  };
  selectedProducts: {
    index: number;
    name: string;
    price: number;
    image: {
      src: string;
      alt: string;
    };
    quantity?: number;
  }[];
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
