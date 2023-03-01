import { useHelperText } from '@/hooks';
import { MakeOrderForm } from '@/types';
import { formatPrice } from '@/utils';
import { Grid, MenuItem, TextField, Theme, useMediaQuery } from '@mui/material';
import { FC, useId } from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldError,
  useFormContext,
} from 'react-hook-form';
import { MakeOrderTextControl } from '../../Controls';

const cities = [
  {
    id: '0',
    name: 'Medellin',
    extraCost: 0,
  },
  {
    id: '1',
    name: 'Caldas',
    extraCost: 7000,
  },
  {
    id: '2',
    name: 'Copacabana',
    extraCost: 7000,
  },
  {
    id: '3',
    name: 'Girardota',
    extraCost: 7000,
  },
  {
    id: '4',
    name: 'Otro',
    extraCost: 0,
  },
];

export interface CustomSelectFieldProps {
  field: ControllerRenderProps<MakeOrderForm, 'shippingInformation.city'>;
  required?: boolean;
  error?: FieldError;
}

export const CustomSelectField: FC<CustomSelectFieldProps> = ({
  field: { value, onChange, ...field },
  error,
  required,
}) => {
  const { resetField } = useFormContext<MakeOrderForm>();

  const id = useId();

  const currentCity = cities.find(({ id }) => id === value);

  const { Component, customProps } = useHelperText(
    !currentCity
      ? 'Si no encuentras tu municipio, selecciona "Otro" y comunícate con nosotros vía WhatsApp para verificar la disponibilidad de nuestros domiciliarios y el costo del envío'
      : currentCity.name === 'Otro'
      ? 'Recuerda comunicarte con nosotros, de lo contrario el pedido no podrá ser enviado en la fecha acordada'
      : currentCity.extraCost
      ? `Costo de envío ${formatPrice(currentCity.extraCost)}`
      : error
      ? error.message
      : undefined,
  );

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <TextField
      {...field}
      value={value ?? ''}
      size={isMobile ? 'small' : undefined}
      required={required}
      error={!!error}
      FormHelperTextProps={customProps}
      helperText={Component}
      fullWidth
      select
      label="Municipio"
      onChange={(event) => {
        onChange(event);
        resetField('shippingInformation.neighborhood');
      }}
    >
      {cities.map((city, i) => (
        <MenuItem
          key={`MAKE_ORDER_SHIPPING_CITY_${id}_${i}`}
          value={city.id}
        >
          {city.name}
        </MenuItem>
      ))}
    </TextField>
  );
};

export interface MakeOrderShippingCityNeighborhoodFieldsProps {
  required?: boolean;
  spacing: number;
  item?: boolean;
}

const MakeOrderShippingCityNeighborhoodFields: FC<
  MakeOrderShippingCityNeighborhoodFieldsProps
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
            name="shippingInformation.city"
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
          <MakeOrderTextControl
            label="Barrio"
            name="shippingInformation.neighborhood"
            capitalize
            required
            trim
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MakeOrderShippingCityNeighborhoodFields;
