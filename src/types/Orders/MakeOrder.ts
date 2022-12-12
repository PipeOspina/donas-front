export interface MakeOrderForm {
  steps: {
    activeStep: number;
    completedSteps: number[];
  };
}

export interface IStep {
  label: string;
  helper?: string;
}
