import { IStep, MakeOrderForm } from '@/types';
import {
  Step,
  StepButton,
  StepLabel,
  Stepper,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { useId } from 'react';
import { useFormContext } from 'react-hook-form';

const steps: IStep[] = [
  {
    label: 'Productos',
    helper: 'Selección de productos',
  },
  {
    label: 'Facturación',
    helper: 'Información de facturación',
  },
  {
    label: 'Envío',
  },
  {
    label: 'Pago',
  },
];

const MakeOrderStepper = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<MakeOrderForm>();

  const { activeStep, completedSteps } = watch('steps');

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const stepErrors: number[] = [];

  if (errors.selectedProducts) stepErrors.push(0);

  const id = useId();

  return (
    <Stepper
      style={{ maxWidth: 'calc(100% - 8px)' }}
      activeStep={activeStep}
      alternativeLabel
      nonLinear
    >
      {steps.map(({ label, helper }, i) => {
        const disabled =
          activeStep !== i &&
          i !== 0 &&
          (!completedSteps.includes(i - 1) ||
            stepErrors.some((errorIndex) => errorIndex < i));

        return (
          <Step
            key={`MAKE_ORDER_STEPPER_STEP_${id}_${i}`}
            completed={completedSteps.includes(i)}
            disabled={disabled}
            onClick={() => !disabled && setValue('steps.activeStep', i)}
          >
            <StepButton optional={isMobile ? undefined : helper}>
              <StepLabel error={stepErrors.includes(i)}>{label}</StepLabel>
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default MakeOrderStepper;
