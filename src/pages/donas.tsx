import ProductSelect from '@/components/ProductSelect/ProductSelect';
import { Step, StepButton, Stepper } from '@mui/material';
import { useState } from 'react';

const Donas = () => {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

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
      <ProductSelect onProductsChange={setSelectedProducts} />
    </>
  );
};

export default Donas;
