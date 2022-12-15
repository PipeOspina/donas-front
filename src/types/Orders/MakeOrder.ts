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
}

export interface IStep {
  label: string;
  helper?: string;
}
