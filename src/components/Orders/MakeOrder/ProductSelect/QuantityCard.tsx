import NumberField from '@/components/Miscellany/NumberField/NumberField';
import styles from '@/styles/components/MakeOrderProductQuantityCard.module.css';
import { MakeOrderForm } from '@/types';
import { ProductPriceModel } from '@/types/Products/Product';
import { formatPrice, formatThousand } from '@/utils/formats';
import AddIcon from '@mui/icons-material/Add';
import {
  Avatar,
  ClickAwayListener,
  Collapse,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import { CSSProperties, FC, useCallback, useState } from 'react';
import {
  Controller,
  FieldArrayWithId,
  useFormContext,
  useWatch,
} from 'react-hook-form';

const textStyles: CSSProperties = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

export interface MakeOrderProductSelectQuantityCardProps {
  field: FieldArrayWithId<MakeOrderForm, 'selectedProducts', 'id'>;
  index: number;
}

const MakeOrderProductSelectQuantityCard: FC<
  MakeOrderProductSelectQuantityCardProps
> = ({ field, index }) => {
  const [isFocus, setIsFocus] = useState(false);

  const { control } = useFormContext<MakeOrderForm>();

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const products = useWatch({ control, name: 'products.products' });

  const { name, image, prices } =
    products.find(({ id }) => id === field.productId) ?? {};

  const { defaultMin, defaultMax } = (prices?.reduce(
    (
      prev: {
        defaultMin: number;
        defaultMax: number;
      },
      { min: minQuantity, max: maxQuantity },
    ) => ({
      defaultMin: minQuantity < prev.defaultMin ? minQuantity : prev.defaultMin,
      defaultMax:
        (maxQuantity ?? 100_000) > prev.defaultMax
          ? maxQuantity ?? 100_000
          : prev.defaultMax,
    }),
    { defaultMin: 0, defaultMax: 0 },
  ) ?? { defaultMin: 0, defaultMax: 0 }) as {
    defaultMin: number;
    defaultMax: number;
  };

  const handleIsError = useCallback(
    (value: number | null, minQuantity: number, maxQuantity: number) =>
      value === null || value < minQuantity
        ? `Cantidad mínima de ${formatThousand(minQuantity)} ${
            minQuantity === 1 ? 'unidad' : 'unidades'
          }`
        : value > maxQuantity
        ? `Cantidad máxima de ${formatThousand(maxQuantity)} unidades`
        : undefined,
    [],
  );

  return (
    <Controller
      name={`selectedProducts.${index}.quantity`}
      rules={{
        required: true,
        min: defaultMin,
      }}
      render={({ field: { value, onChange, ...controllerField } }) => {
        const { value: price, min }: ProductPriceModel = prices?.find(
          ({ min: minQuantity, max: maxQuantity = 100_000 }) =>
            value >= minQuantity && value <= maxQuantity,
        ) ?? { min: defaultMin, shipping: 0, value: 0 };

        const error = handleIsError(value, min, 100_000);
        const isError = !!error;

        return (
          <ClickAwayListener onClickAway={() => setIsFocus(false)}>
            <div
              className={clsx(styles.container, {
                [styles.marginTop]: index !== 0,
              })}
              onClick={() => setIsFocus((current) => !current)}
            >
              <ListItem
                alignItems="center"
                sx={(theme) => ({
                  outline: `1.5px solid ${
                    theme.palette[isError ? 'error' : 'primary'][
                      isFocus || isError ? 'main' : 'ultraLight'
                    ]
                  }`,
                  borderRadius: theme.spacing(1),
                })}
                className={styles.listItem}
              >
                <ListItemAvatar
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {image?.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt ?? ''}
                      width={40}
                      height={40}
                      className={styles.image}
                    />
                  ) : (
                    <Avatar
                      alt={image?.alt ?? ''}
                      sx={(theme) => ({
                        bgcolor: theme.palette.primary.main,
                      })}
                    >
                      {name?.replaceAll(' ', '').substring(0, 2)}
                    </Avatar>
                  )}
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
                <div
                  className={styles.quantityField}
                  onClick={(e) => {
                    isFocus && e.stopPropagation();
                  }}
                >
                  <NumberField
                    {...controllerField}
                    key={field.id}
                    value={value}
                    onChange={(newValue) => {
                      onChange({ target: { value: newValue ?? null } });
                    }}
                    autoComplete="off"
                    onFocus={() => setIsFocus(true)}
                    size="small"
                    style={{ width: 100 }}
                    minError=""
                    maxError=""
                    thousandSeparator="."
                    decimalSeparator=","
                    controlsPlacement={isMobile ? 'start-end' : 'end'}
                    label="Cantidad"
                    decimalScale={0}
                    allowNegative={false}
                    min={min}
                    max={defaultMax}
                    step={isMobile ? 5 : 1}
                  />
                </div>
              </ListItem>
              <Collapse
                in={!isError && isFocus}
                style={{ alignSelf: 'flex-start', width: '100%' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 8,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className={styles.action}>
                    <AddIcon
                      color="primary"
                      fontSize="inherit"
                      style={{ fontSize: 16, marginRight: 4 }}
                    />
                    <Typography
                      variant="caption"
                      color="primary"
                    >
                      {isMobile
                        ? 'Especificaciones'
                        : 'Agregar especificaciones'}
                    </Typography>
                  </div>
                  <div className={styles.action}>
                    <Typography
                      variant="caption"
                      color="primary"
                    >
                      Más información ({formatPrice(price)} c/u)
                    </Typography>
                  </div>
                </div>
              </Collapse>
              <Collapse in={isError}>
                <Typography
                  variant="caption"
                  color="error"
                  className={styles.errorMessage}
                >
                  {error}
                </Typography>
              </Collapse>
            </div>
          </ClickAwayListener>
        );
      }}
      control={control}
    />
  );
};

export default MakeOrderProductSelectQuantityCard;
