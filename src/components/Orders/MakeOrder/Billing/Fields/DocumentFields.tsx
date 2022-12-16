import { useHelperText } from '@/hooks';
import { MakeOrderForm } from '@/types';
import { calculateNitDV } from '@/utils';
import {
  Divider,
  Grid,
  MenuItem,
  TextField,
  Theme,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { FC, useId, useState } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  useFormContext,
} from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import MakeOrderBillingBusinessNameField from './BusinessNameField';

export interface CustomNumberFieldProps {
  field: ControllerRenderProps<
    MakeOrderForm,
    'billingInformation.documentNumber'
  >;
  required?: boolean;
  error?: FieldError;
}

export const CustomNumberField: FC<CustomNumberFieldProps> = ({
  field: { onChange, onBlur, ref, ...field },
  error,
  required,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const { watch } = useFormContext<MakeOrderForm>();

  const { Component, customProps } = useHelperText(
    error ? error.message : undefined,
  );

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const documentType = watch('billingInformation.documentType');

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
      label={documentType === 'nit' ? 'NIT' : 'Cédula'}
      FormHelperTextProps={customProps}
      helperText={Component}
      fullWidth
      decimalScale={0}
      allowNegative={false}
      allowLeadingZeros={documentType === 'nit'}
      thousandSeparator="."
      decimalSeparator=","
      thousandsGroupStyle="thousand"
      valueIsNumericString
      onFocus={() => setIsFocus(true)}
      onBlur={() => {
        onBlur();
        setIsFocus(false);
      }}
      InputProps={{
        endAdornment:
          documentType === 'nit' ? (
            <div style={{ display: 'flex' }}>
              <Divider
                orientation="vertical"
                flexItem
                style={{ marginRight: 12 }}
              />
              <Tooltip
                title="Dígito de verificación"
                placement="top"
                arrow
              >
                <Typography
                  color={error ? 'error' : isFocus ? 'primary' : undefined}
                >
                  {field.value ? calculateNitDV(field.value) : 'DV'}
                </Typography>
              </Tooltip>
            </div>
          ) : undefined,
      }}
      onValueChange={({ value }) =>
        onChange({
          target: { value: value || null },
        })
      }
    />
  );
};

export interface CustomSelectFieldProps {
  field: ControllerRenderProps<
    MakeOrderForm,
    'billingInformation.documentType'
  >;
  required?: boolean;
  error?: FieldError;
}

export const CustomSelectField: FC<CustomSelectFieldProps> = ({
  field,
  error,
  required,
}) => {
  const { watch, setValue, clearErrors } = useFormContext<MakeOrderForm>();

  const id = useId();

  const { Component, customProps } = useHelperText(
    error ? error.message : undefined,
  );

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const billingType = watch('billingInformation.billingType');

  return (
    <TextField
      {...field}
      size={isMobile ? 'small' : undefined}
      required={required}
      error={!!error}
      FormHelperTextProps={customProps}
      helperText={Component}
      fullWidth
      select
      label="Tipo de documento"
      disabled={billingType === 'electronic'}
      onChange={(event) => {
        field.onChange(event);
        setValue('billingInformation.documentNumber', '');
        clearErrors('billingInformation.documentNumber');
        if (event.target.value !== 'nit')
          setTimeout(() => {
            setValue('billingInformation.businessName', '');
            clearErrors('billingInformation.businessName');
          }, 500);
      }}
    >
      {['nit', 'personal'].map((type, i) => (
        <MenuItem
          key={`MAKE_ORDER_BILLING_DOCUMENT_TYPE_${id}_${i}`}
          value={type}
        >
          {type === 'nit' ? 'NIT' : 'Cédula de ciudadanía'}
        </MenuItem>
      ))}
    </TextField>
  );
};

export interface MakeOrderBillingDocumentFieldsProps {
  required?: boolean;
  spacing: number;
  item?: boolean;
}

const MakeOrderBillingDocumentFields: FC<
  MakeOrderBillingDocumentFieldsProps
> = ({ required, spacing, item }) => {
  const { control } = useFormContext<MakeOrderForm>();

  return (
    <Grid
      item={item}
      container
      direction="column"
    >
      <Grid
        item
        container
        spacing={spacing}
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Controller
            name="billingInformation.documentType"
            render={({ field, fieldState: { error } }) => (
              <CustomSelectField
                field={field}
                error={error}
                required={required}
              />
            )}
            control={control}
            rules={{
              required: { message: 'Requerido', value: !!required },
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
        >
          <Controller
            name="billingInformation.documentNumber"
            render={({ field, fieldState: { error } }) => (
              <CustomNumberField
                field={field}
                error={error}
                required
              />
            )}
            control={control}
            rules={{
              required: { message: 'Requerido', value: !!required },
            }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <MakeOrderBillingBusinessNameField spacing={spacing} />
      </Grid>
    </Grid>
  );
};

export default MakeOrderBillingDocumentFields;
