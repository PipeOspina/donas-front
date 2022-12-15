import { AppBar, Button, Toolbar, Zoom } from '@mui/material';

import styles from '@/styles/components/MakeOrderAppBar.module.css';
import { MakeOrderForm } from '@/types';
import { useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

const MakeOrderAppBar = () => {
  const {
    watch,
    formState: {
      errors: { selectedProducts: selectedProductsErrors },
    },
    handleSubmit,
    setValue,
  } = useFormContext<MakeOrderForm>();

  const { activeStep, completedSteps } = watch('steps');

  const isCompleteStep = useMemo(() => activeStep === 3, [activeStep]);
  const disableNext = useMemo(() => {
    switch (activeStep) {
      case 0:
        return !!selectedProductsErrors;
      default:
        return false;
    }
  }, [activeStep, selectedProductsErrors]);

  const handleBefore = useCallback(() => {
    setValue('steps.activeStep', activeStep - 1);
  }, [setValue, activeStep]);

  const handleNext = useCallback(() => {
    isCompleteStep
      ? handleSubmit
      : setValue('steps.activeStep', activeStep + 1);
    if (!disableNext)
      setValue('steps.completedSteps', [...completedSteps, activeStep]);
  }, [
    handleSubmit,
    setValue,
    isCompleteStep,
    activeStep,
    completedSteps,
    disableNext,
  ]);

  useEffect(() => {
    if (selectedProductsErrors)
      setValue(
        'steps.completedSteps',
        completedSteps.filter((completedIndex) => completedIndex !== 0),
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProductsErrors, setValue]);

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={styles.container}
    >
      <Toolbar className={styles.toolbar}>
        <Zoom in={activeStep !== 0}>
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleBefore}
          >
            Anterior
          </Button>
        </Zoom>
        <Button
          color="inherit"
          variant="outlined"
          disabled={disableNext}
          onClick={handleNext}
        >
          {isCompleteStep ? 'Completar' : 'Siguiente'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MakeOrderAppBar;
