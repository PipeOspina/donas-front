import { useHelperText } from '@/hooks';
import { MakeOrderForm } from '@/types';
import { TextField, Theme, useMediaQuery } from '@mui/material';
import { FC } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  useFormContext,
} from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

export interface CustomNumberFieldProps {
  field: ControllerRenderProps<
    MakeOrderForm,
    'billingInformation.phoneNumber' | 'shippingInformation.phoneNumber'
  >;
  required?: boolean;
  error?: FieldError;
  label: string;
}

export const CustomNumberField: FC<CustomNumberFieldProps> = ({
  field: { value, onBlur, onChange, ref, name },
  label,
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
    <PatternFormat
      value={value ?? ''}
      name={name}
      customInput={TextField}
      inputProps={{
        ref,
      }}
      size={isMobile ? 'small' : undefined}
      required={required}
      error={!!error}
      label={label}
      FormHelperTextProps={customProps}
      helperText={Component}
      fullWidth
      format="(###) ### ####"
      onBlur={() => {
        onBlur();
        if (!value && required) onChange({ target: { value } });
        if (value && value <= 9999999 && value > 1000000)
          onChange({
            target: {
              value: value ? 6040000000 + value : value,
            },
          });
      }}
      onValueChange={({ floatValue }) =>
        onChange({ target: { value: floatValue ?? null } })
      }
    />
  );
};

export interface MakeOrderPhoneControlProps {
  name: 'billingInformation.phoneNumber' | 'shippingInformation.phoneNumber';
  required?: boolean;
  label: string;
}

const MakeOrderPhoneControl: FC<MakeOrderPhoneControlProps> = ({
  name,
  required,
  label,
}) => {
  const { control } = useFormContext<MakeOrderForm>();

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <CustomNumberField
          field={field}
          label={label}
          error={error}
          required={required}
        />
      )}
      control={control}
      rules={{
        required: { message: 'Requerido', value: !!required },
        validate: {
          phone: (value) =>
            !value && required
              ? 'Requerido'
              : value &&
                (value < 1000000 || (value >= 1000000 && value < 3000000000))
              ? 'Teléfono inválido'
              : undefined,
        },
      }}
    />
  );
};

export default MakeOrderPhoneControl;
