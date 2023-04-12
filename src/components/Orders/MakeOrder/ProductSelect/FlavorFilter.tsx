import { MakeOrderForm } from '@/types';
import { ProductFlavor } from '@/types/Products/Product';
import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

type FlavorOption = {
  flavor: ProductFlavor;
  label: string;
};

const flavorOptions: FlavorOption[] = [
  {
    flavor: 'salty',
    label: 'Linea salada',
  },
  {
    flavor: 'sweet',
    label: 'Línea dulce',
  },
];

export const FlavorFilter: FC<
  Omit<TextFieldProps, 'select' | 'value' | 'label'>
> = (props) => {
  const { control, setValue } = useFormContext<MakeOrderForm>();
  const flavorFilter = useWatch({ control, name: 'filters.flavor' });

  return (
    <TextField
      {...props}
      select
      label="Filtrar por..."
      value={flavorFilter ?? 'any'}
      onChange={({ target }) =>
        setValue(
          'filters.flavor',
          target.value === 'any' ? null : (target.value as ProductFlavor),
        )
      }
    >
      <MenuItem value="any">Todos</MenuItem>
      {flavorOptions.map(({ flavor, label }) => (
        <MenuItem
          key={`PRODUCT_FLAVOR_FILTER_SELECT_${flavor.toUpperCase()}`}
          value={flavor}
        >
          {label}
        </MenuItem>
      ))}
    </TextField>
  );
};
