import NumberField from '@/components/Miscellany/NumberField/NumberField';
import styles from '@/styles/components/MakeOrderProductQuantityCard.module.css';
import { MakeOrderForm } from '@/types';
import { formatPrice } from '@/utils/formats';
import {
  Avatar,
  Collapse,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import { CSSProperties, FC, useCallback, useState } from 'react';
import { Controller, FieldArrayWithId, useFormContext } from 'react-hook-form';

const textStyles: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export interface MakeOrderProductQuantityCardProps {
  field: FieldArrayWithId<MakeOrderForm, 'selectedProducts', 'id'>;
  min?: number;
  index: number;
  isMobile?: boolean;
}

const MakeOrderProductQuantityCard: FC<MakeOrderProductQuantityCardProps> = ({
  field,
  min,
  index,
  isMobile,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  const { control } = useFormContext<MakeOrderForm>();

  const { name, price, image } = field;

  const handleValidate = useCallback(
    (value?: number) => {
      const isValid = Boolean(value && value >= (min ?? 0));
      return isValid;
    },
    [min],
  );

  return (
    <Controller
      name={`selectedProducts.${index}.quantity`}
      rules={{
        validate: handleValidate,
      }}
      render={({ field: { onBlur, onChange, value, ...field } }) => {
        const isError = !handleValidate(value);

        return (
          <div
            className={clsx(styles.container, {
              [styles.marginTop]: index !== 0,
            })}
          >
            <ListItem
              alignItems="center"
              sx={(theme) => ({
                border: `1.5px solid ${
                  theme.palette[
                    isError ? 'error' : isFocus ? 'primary' : 'silver'
                  ].main
                }`,
                borderRadius: theme.spacing(1),
              })}
            >
              <ListItemAvatar>
                <Avatar src={image.src}>{name}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={name}
                secondary={formatPrice(price * (value ?? 0))}
                primaryTypographyProps={{
                  color: 'secondary',
                  style: textStyles,
                }}
                secondaryTypographyProps={{
                  color: 'primary',
                  style: textStyles,
                }}
              />
              <div className={styles.quantityField}>
                <NumberField
                  {...field}
                  value={value}
                  onChange={(newValue) =>
                    onChange({ target: { value: newValue ?? null } })
                  }
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => {
                    onBlur();
                    setIsFocus(false);
                  }}
                  size="small"
                  style={{ width: 100 }}
                  minError=""
                  maxError=""
                  controlsPlacement={isMobile ? 'start-end' : 'end'}
                  label="Cantidad"
                  min={min}
                />
              </div>
            </ListItem>
            <Collapse in={isError}>
              <Typography
                variant="caption"
                color="error"
                className={styles.errorMessage}
              >
                Cantidad mínima de {min} unidades
              </Typography>
            </Collapse>
          </div>
        );
      }}
      control={control}
    />
  );
};

export default MakeOrderProductQuantityCard;
