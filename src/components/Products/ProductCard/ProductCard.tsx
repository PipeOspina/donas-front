import styles from '@/styles/components/ProductCard.module.css';
import { ProductModel } from '@/types';
import { formatPrice } from '@/utils/formats';
import {
  Avatar,
  ButtonBase,
  ButtonBaseProps,
  duration,
  Skeleton,
  Typography,
} from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

export type ProductCardProps = ButtonBaseProps & {
  product?: ProductModel;
  selected?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

const ProductCard: FC<ProductCardProps> = ({
  product,
  selected,
  loading,
  disabled = loading,
  ...props
}) => {
  const { image, name, prices } = product ?? {};

  return (
    <ButtonBase
      {...props}
      disabled={disabled}
      sx={
        props.sx ??
        ((theme) => ({
          outline: `1px solid ${
            theme.palette[disabled ? 'silver' : 'primary'][
              disabled ? 'main' : selected ? 'light' : 'ultraLight'
            ]
          }`,
          borderRadius: theme.spacing(3),
          overflow: 'hidden',
          color: 'rgba(0, 0, 0, 0.1)',
          backgroundColor: selected ? theme.palette.primary.light : undefined,
          transition: theme.transitions.create('background-color', {
            duration: duration.leavingScreen,
          }),
          margin: 1,
          position: 'relative',
          '&:hover': disabled
            ? undefined
            : {
                outlineWidth: 2,
              },
          '& p': {
            transition: theme.transitions.create('color', {
              duration: duration.leavingScreen,
            }),
          },
        }))
      }
    >
      <div className={clsx(styles.flexCenter, styles.container)}>
        {loading ? (
          <Skeleton
            variant="circular"
            width={100}
            height={100}
          />
        ) : image?.src ? (
          <Image
            alt={image.alt ?? ''}
            src={image.src}
            width={100}
            height={100}
            className={clsx(styles.image, {
              [styles.disabledImage]: disabled,
            })}
          />
        ) : (
          <Avatar
            alt={image?.alt ?? ''}
            sx={(theme) => ({
              width: 100,
              height: 100,
              bgcolor: selected ? 'white' : theme.palette.primary.main,
              color: selected ? theme.palette.primary.main : undefined,
            })}
          >
            {name?.replaceAll(' ', '').substring(0, 2)}
          </Avatar>
        )}
        <div
          className={clsx(styles.flexCenter, styles.labels, {
            [styles.selectedLabels]: selected,
            [styles.disabledLabels]: disabled,
          })}
        >
          {loading ? (
            <>
              <Skeleton
                variant="text"
                width={100}
                height={32}
              />
              <Skeleton
                variant="text"
                width={50}
                height={28}
              />
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                color={selected || disabled ? 'inherit' : 'secondary'}
              >
                {name}
              </Typography>
              <Typography
                variant="subtitle1"
                color={selected || disabled ? 'inherit' : 'primary'}
              >
                {prices && prices[0].value
                  ? formatPrice(prices[0].value)
                  : 'Consultar'}
              </Typography>
            </>
          )}
        </div>
      </div>
    </ButtonBase>
  );
};

export default ProductCard;
