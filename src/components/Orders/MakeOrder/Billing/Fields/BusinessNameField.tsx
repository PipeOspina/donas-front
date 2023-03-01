import { MakeOrderForm } from '@/types';
import { Collapse, useTheme } from '@mui/material';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { MakeOrderTextControl } from '../../Controls';

export interface MakeOrderBillingBusinessNameFieldProps {
  spacing?: number;
}

const MakeOrderBillingBusinessNameField: FC<
  MakeOrderBillingBusinessNameFieldProps
> = ({ spacing }) => {
  const { control } = useFormContext<MakeOrderForm>();

  const documentType = useWatch({
    control,
    name: 'billingInformation.documentType',
  });
  const theme = useTheme();

  return (
    <Collapse in={documentType === 'nit'}>
      <div style={{ marginTop: theme.spacing(spacing ?? 0) }}>
        <MakeOrderTextControl
          label="Razón social"
          name="billingInformation.businessName"
          required={documentType === 'nit'}
          trim
        />
      </div>
    </Collapse>
  );
};

export default MakeOrderBillingBusinessNameField;
