import { MakeOrderForm } from '@/types';
import { FC } from 'react';
import { Controller, Path, useFormContext } from 'react-hook-form';
import { CustomTextField } from './TextControl';

export interface MakeOrderEmailControlProps {
  name: Path<MakeOrderForm>;
  required?: boolean;
  label: string;
}

const MakeOrderEmailControl: FC<MakeOrderEmailControlProps> = ({
  name,
  required,
  label,
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
          trim
        />
      )}
      control={control}
      rules={{
        required: { message: 'Requerido', value: !!required },
        validate: {
          email: (value) => {
            if (typeof value === 'string')
              return value.match(
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              )
                ? undefined
                : 'Email invalido';
            return;
          },
        },
      }}
    />
  );
};

export default MakeOrderEmailControl;
