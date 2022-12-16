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
    documentType: 'nit' | 'personal' | '';
    documentNumber: string;
    businessName: string;
    name: string;
    lastName: string;
    phoneNumber: number;
    rut?: string;
    rutEmail?: string;
  };
}

export interface IStep {
  label: string;
  helper?: string;
}
