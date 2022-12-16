import { MakeOrderForm } from '@/types';
import { Collapse, Typography } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const MakeOrderProductSelectError = () => {
  const {
    formState: {
      errors: { selectedProducts: errors },
    },
  } = useFormContext<MakeOrderForm>();

  return (
    <Collapse in={!!errors?.root}>
      <Typography
        variant="subtitle1"
        color="error"
        style={{ padding: 16 }}
      >
        Selecciona algún producto para continuar
      </Typography>
    </Collapse>
  );
};

export default MakeOrderProductSelectError;
