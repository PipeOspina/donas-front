import { Step, StepButton, Stepper } from '@mui/material';

const Donas = () => {
  return (
    <>
      <div style={{ width: '50vw' }}>
        <Stepper
          alternativeLabel
          activeStep={0}
          nonLinear
        >
          <Step completed>
            <StepButton>Productos</StepButton>
          </Step>
          <Step completed>
            <StepButton>Cliente</StepButton>
          </Step>
          <Step disabled>
            <StepButton>Cliente</StepButton>
          </Step>
        </Stepper>
      </div>
    </>
  );
};

export default Donas;
