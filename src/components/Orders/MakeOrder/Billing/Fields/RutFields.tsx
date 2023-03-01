import { useHelperText } from '@/hooks';
import { MakeOrderForm } from '@/types';
import {
  Checkbox,
  Collapse,
  FormControlLabel,
  Grid,
  TextField,
  Theme,
  useMediaQuery,
} from '@mui/material';
import { FC, useState } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { MakeOrderEmailControl } from '../../Controls';

export interface CustomNumberFieldProps {
  field: ControllerRenderProps<MakeOrderForm, 'billingInformation.rut'>;
  required?: boolean;
  error?: FieldError;
}

export const CustomNumberField: FC<CustomNumberFieldProps> = ({
  field: { onChange, ref, ...field },
  error,
  required,
}) => {
  const { Component, customProps } = useHelperText(
    error ? error.message : undefined,
  );

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <NumericFormat
      {...field}
      customInput={TextField}
      inputProps={{
        ref,
      }}
      size={isMobile ? 'small' : undefined}
      required={required}
      error={!!error}
      label="RUT"
      FormHelperTextProps={customProps}
      helperText={Component}
      fullWidth
      decimalScale={0}
      allowNegative={false}
      allowLeadingZeros={false}
      thousandSeparator="."
      decimalSeparator=","
      valueIsNumericString
      onValueChange={({ value }) =>
        onChange({
          target: { value: value || null },
        })
      }
    />
  );
};

export interface MakeOrderBillingRutFieldsProps {
  spacing?: number;
  required?: boolean;
}

const MakeOrderBillingRutFields: FC<MakeOrderBillingRutFieldsProps> = ({
  spacing,
  required,
}) => {
  const [isDifferentEmail, setIsDifferentEmail] = useState(false);

  const { control, resetField } = useFormContext<MakeOrderForm>();

  const billingType = useWatch({
    control,
    name: 'billingInformation.billingType',
  });

  return (
    <Collapse in={billingType === 'electronic'}>
      <Grid
        container
        direction="column"
        spacing={spacing}
      >
        <Grid item>
          <Controller
            name="billingInformation.rut"
            render={({ field, fieldState: { error } }) => (
              <CustomNumberField
                field={field}
                error={error}
                required={required}
              />
            )}
            control={control}
            rules={{
              required: {
                message: 'Requerido',
                value: !!required && billingType === 'electronic',
              },
            }}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            label="Enviar factura electrónica a un correo electrónico alternativo"
            control={
              <Checkbox
                checked={isDifferentEmail}
                onChange={() =>
                  setIsDifferentEmail((current) => {
                    if (current)
                      setTimeout(
                        () => resetField('billingInformation.rutEmail'),
                        500,
                      );
                    return !current;
                  })
                }
              />
            }
          />
        </Grid>
        <Grid item>
          <Collapse
            in={isDifferentEmail}
            style={{ paddingTop: 1 }}
          >
            <MakeOrderEmailControl
              label="Correo electrónico alternativo"
              name="billingInformation.rutEmail"
              required={isDifferentEmail && billingType === 'electronic'}
            />
          </Collapse>
        </Grid>
      </Grid>
    </Collapse>
  );
};

export default MakeOrderBillingRutFields;
