import { useHelperText } from '@/hooks';
import { MakeOrderForm } from '@/types';
import { TextField, TextFieldProps } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FC, useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

type CustomTextFieldProps = Omit<TextFieldProps, 'error'> & {
  error?: FieldError;
};

const CustomTextField: FC<CustomTextFieldProps> = ({ error, ...props }) => {
  const { Component, customProps } = useHelperText(
    error
      ? error.message
      : 'Selecciona la fecha y hora en la que deseas recibir tu pedido',
  );

  return (
    <TextField
      {...props}
      FormHelperTextProps={customProps}
      helperText={Component}
      error={!!error}
    />
  );
};

const MakeOrderShippingDateField = () => {
  const [open, setOpen] = useState(false);

  const { control } = useFormContext<MakeOrderForm>();

  return (
    <Controller
      name="shippingInformation.date"
      render={({
        field: { value, onChange, name, onBlur, ref },
        fieldState: { error },
      }) => (
        <DateTimePicker
          disablePast
          showToolbar={false}
          value={value ?? null}
          open={open}
          ampm
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderInput={(params) => (
            <CustomTextField
              {...params}
              onBlur={onBlur}
              name={name}
              onClick={() => setOpen(true)}
              inputProps={{
                ...params.inputProps,
                disabled: true,
                placeholder: '',
              }}
              InputProps={{
                ...params.InputProps,
                ref,
              }}
              error={error}
              fullWidth
              required
            />
          )}
          onChange={(newValue) => {
            onChange({ target: { value: newValue ?? null } });
          }}
          label="Fecha y hora tentativa"
          inputFormat="EEEE, d 'de' MMMM - h:mmaaa"
        />
      )}
      control={control}
      rules={{ required: { message: 'Requerido', value: true } }}
    />
  );
};

export default MakeOrderShippingDateField;
