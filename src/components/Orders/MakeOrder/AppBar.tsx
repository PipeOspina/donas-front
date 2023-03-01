import styles from '@/styles/components/MakeOrderAppBar.module.css';
import { MakeOrderForm } from '@/types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  AppBar,
  Button,
  IconButton,
  Theme,
  Toolbar,
  useMediaQuery,
  Zoom,
} from '@mui/material';
import { useCallback, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

const MakeOrderAppBar = () => {
  const { control, handleSubmit, setValue } = useFormContext<MakeOrderForm>();

  const activeStep = useWatch({
    control,
    name: 'steps.activeStep',
  });

  const completedSteps = useWatch({
    control,
    name: 'steps.completedSteps',
  });

  const isCompleteStep = useMemo(() => activeStep === 3, [activeStep]);

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const handleNext = useMemo(
    () =>
      handleSubmit(() => {
        setValue('steps', {
          activeStep: activeStep + 1,
          completedSteps: [...completedSteps, activeStep],
        });
      }),
    [handleSubmit, activeStep, completedSteps, setValue],
  );

  const handleBefore = useCallback(() => {
    setValue('steps.activeStep', activeStep - 1);
  }, [setValue, activeStep]);

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={styles.container}
    >
      <Toolbar className={styles.toolbar}>
        <Zoom in={activeStep !== 0}>
          {isMobile ? (
            <IconButton
              color="inherit"
              onClick={handleBefore}
            >
              <ArrowBackIcon />
            </IconButton>
          ) : (
            <Button
              color="inherit"
              variant="outlined"
              onClick={handleBefore}
              startIcon={<ArrowBackIcon />}
            >
              Anterior
            </Button>
          )}
        </Zoom>
        {isMobile ? (
          <IconButton
            color="inherit"
            onClick={handleNext}
          >
            <ArrowForwardIcon />
          </IconButton>
        ) : (
          <Button
            color="inherit"
            variant="outlined"
            onClick={handleNext}
            endIcon={<ArrowForwardIcon />}
          >
            {isCompleteStep ? 'Completar' : 'Siguiente'}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MakeOrderAppBar;
