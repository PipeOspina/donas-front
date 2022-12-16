import { useHelperText } from '@/hooks';
import { MakeOrderForm } from '@/types';
import { capitalize } from '@/utils';
import { TextField, Theme, useMediaQuery } from '@mui/material';
import { FC } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  Path,
  useFormContext,
} from 'react-hook-form';

export interface CustomTextFieldProps {
  field: ControllerRenderProps<MakeOrderForm, Path<MakeOrderForm>>;
  required?: boolean;
  error?: FieldError;
  label: string;
  capitalize?: boolean;
  trim?: boolean;
}

export const CustomTextField: FC<CustomTextFieldProps> = ({
  field: { onBlur, ref, ...field },
  label,
  error,
  required,
  capitalize: capitalizeProps,
  trim,
}) => {
  const { Component, customProps } = useHelperText(
    error ? error.message : undefined,
  );

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <TextField
      {...field}
      size={isMobile ? 'small' : undefined}
      inputProps={{
        ref,
      }}
      onBlur={() => {
        onBlur();
        const trimmedValue =
          trim && typeof field.value === 'string'
            ? field.value.trim()
            : field.value;

        const capitalizedValue =
          capitalizeProps && typeof trimmedValue === 'string'
            ? capitalize(trimmedValue)
            : trimmedValue;

        if (trim || capitalizeProps)
          field.onChange({
            target: {
              value: capitalizedValue,
            },
          });
      }}
      required={required}
      error={!!error}
      label={label}
      FormHelperTextProps={customProps}
      helperText={Component}
      fullWidth
    />
  );
};

export interface MakeOrderTextControlProps {
  name: Path<MakeOrderForm>;
  required?: boolean;
  label: string;
  capitalize?: boolean;
  trim?: boolean;
}

const MakeOrderTextControl: FC<MakeOrderTextControlProps> = ({
  name,
  required,
  label,
  trim,
  capitalize: capitalizeProps,
}) => {
  const { control } = useFormContext<MakeOrderForm>();

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <CustomTextField
          field={field}
          label={label}
          error={error}
          required={required}
          capitalize={capitalizeProps}
          trim={trim}
        />
      )}
      control={control}
      rules={{ required: { message: 'Requerido', value: !!required } }}
    />
  );
};

export default MakeOrderTextControl;
