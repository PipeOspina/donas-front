import { IStep, MakeOrderForm } from '@/types';
import { Step, StepButton, Stepper } from '@mui/material';
import { useId } from 'react';
import { useFormContext } from 'react-hook-form';

const steps: IStep[] = [
  {
    label: 'Productos',
  },
  {
    label: 'Facturación',
  },
  {
    label: 'Envío',
  },
  {
    label: 'Pago',
  },
];

const MakeOrderStepper = () => {
  const { setValue, watch } = useFormContext<MakeOrderForm>();

  const { activeStep, completedSteps } = watch('steps');

  const id = useId();

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      nonLinear
    >
      {steps.map(({ label, helper }, i) => {
        const disabled =
          activeStep !== i && i !== 0 && !completedSteps.includes(i - 1);

        return (
          <Step
            key={`MAKE_ORDER_STEPPER_STEP_${id}_${i}`}
            completed={completedSteps.includes(i)}
            disabled={disabled}
            onClick={() => !disabled && setValue('steps.activeStep', i)}
          >
            <StepButton optional={helper}>{label}</StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default MakeOrderStepper;
