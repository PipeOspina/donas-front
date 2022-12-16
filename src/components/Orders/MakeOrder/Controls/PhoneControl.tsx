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
  field: ControllerRenderProps<MakeOrderForm, 'billingInformation.phoneNumber'>;
  required?: boolean;
  error?: FieldError;
  label: string;
}

export const CustomNumberField: FC<CustomNumberFieldProps> = ({
  field: { onBlur, onChange, ref, ...field },
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(field as any)}
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
        if (field.value <= 9999999 && field.value > 1000000)
          onChange({ target: { value: 6040000000 + field.value } });
      }}
      onValueChange={({ floatValue }) =>
        onChange({ target: { value: floatValue ?? null } })
      }
    />
  );
};

export interface MakeOrderPhoneControlProps {
  name: 'billingInformation.phoneNumber';
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
            value < 1000000 || (value >= 1000000 && value < 3000000000)
              ? 'Teléfono inválido'
              : undefined,
        },
      }}
    />
  );
};

export default MakeOrderPhoneControl;
