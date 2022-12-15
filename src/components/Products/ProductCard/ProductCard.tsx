import styles from '@/styles/components/ProductCard.module.css';
import { IProduct } from '@/types';
import { formatPrice } from '@/utils/formats';
import { ButtonBase, ButtonBaseProps, Typography } from '@mui/material';
import clsx from 'clsx';
import Image from 'next/image';
import { FC } from 'react';

export type ProductCardProps = ButtonBaseProps & {
  product: IProduct;
  selected?: boolean;
};

const ProductCard: FC<ProductCardProps> = ({ product, selected, ...props }) => {
  const { image, name, price } = product;

  return (
    <ButtonBase
      {...props}
      sx={
        props.sx ??
        ((theme) => ({
          border: `1.5px solid ${
            theme.palette[selected ? 'primary' : 'silver'][
              selected ? 'light' : 'main'
            ]
          }`,
          borderRadius: theme.spacing(3),
          overflow: 'hidden',
          color: 'rgba(0, 0, 0, 0.1)',
          backgroundColor: selected ? theme.palette.primary.light : undefined,
          margin: 1,
          position: 'relative',
        }))
      }
    >
      <div className={clsx(styles.flexCenter, styles.container)}>
        <Image
          alt={image.alt}
          src={image.src}
          width={100}
          height={100}
          className={styles.image}
        />
        <div
          className={clsx(styles.flexCenter, styles.labels, {
            [styles.selectedLabels]: selected,
          })}
        >
          <Typography
            variant="h6"
            color={selected ? 'inherit' : 'secondary'}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color={selected ? 'inherit' : 'primary'}
          >
            {formatPrice(price)}
          </Typography>
        </div>
      </div>
    </ButtonBase>
  );
};

export default ProductCard;
