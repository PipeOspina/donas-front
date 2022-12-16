import { Carousel } from '@/components/Miscellany';
import { ProductCard } from '@/components/Products';
import styles from '@/styles/components/MakeOrderProductSelect.module.css';
import { IProduct, MakeOrderForm } from '@/types';
import {
  Collapse,
  List,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useCallback, useId } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TransitionGroup } from 'react-transition-group';
import MakeOrderProductSelectError from './Error';
import MakeOrderProductSelectQuantityCard from './QuantityCard';
import MakeOrderProductSelectTotal from './Total';

const products: IProduct[] = Array(15).fill({
  image: {
    alt: '',
    src: 'https://cdn.colombia.com/gastronomia/2011/08/04/natilla-3039.jpg',
  },
  name: 'Natilla',
  price: 5000,
});

const minProductQuantity = 30;

export const MakeOrderProductSelect = () => {
  const { control } = useFormContext<MakeOrderForm>();
  const {
    append: addProduct,
    fields: selectedProducts,
    remove: removeProduct,
  } = useFieldArray({
    control,
    name: 'selectedProducts',
    rules: {
      required: true,
    },
  });

  const id = useId();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const toggleSelectProduct = useCallback(
    (product: IProduct, index: number) => {
      const productFieldIndex = selectedProducts.findIndex(
        ({ index: i }) => index === i,
      );
      productFieldIndex >= 0
        ? removeProduct(productFieldIndex)
        : addProduct({ ...product, index, quantity: minProductQuantity });
    },
    [addProduct, removeProduct, selectedProducts],
  );

  return (
    <div className={styles.container}>
      <Typography
        variant="h4"
        color="primary"
        className={styles.title}
      >
        Selección de productos
      </Typography>
      <Carousel
        spacing={isMobile ? 0 : 2}
        maxWidth={isMobile ? '100vw' : '80vw'}
        elements={products.map((product, i) => {
          return (
            <ProductCard
              key={`MAKE_ORDER_PRODUCT_SELECT_CAROUSEL_PRODUCT_CARD_${id}_${i}`}
              product={product}
              selected={selectedProducts.some(({ index }) => index === i)}
              onClick={() => toggleSelectProduct(product, i)}
            />
          );
        })}
        arrowColor="primary"
      />
      <MakeOrderProductSelectError />
      <Collapse in={!!selectedProducts.length}>
        <Typography
          variant="h6"
          color="primary"
          className={styles.selectedProductsTitle}
        >
          Productos seleccionados
        </Typography>
      </Collapse>
      <List
        className={styles.selectedProducts}
        style={{ width: isMobile ? '100%' : '500px', maxWidth: '100%' }}
      >
        <TransitionGroup>
          {selectedProducts.map((productField, i) => (
            <Collapse key={productField.id}>
              <MakeOrderProductSelectQuantityCard
                field={productField}
                index={i}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
      <Collapse
        in={!!selectedProducts.length}
        style={{
          width: isMobile ? '100%' : '500px',
          maxWidth: '100%',
          padding: 32,
          paddingTop: 16,
        }}
      >
        <div className={styles.total}>
          <Typography
            variant="h6"
            color="primary"
          >
            Total
          </Typography>
          <Typography
            variant="h6"
            color="primary"
          >
            <MakeOrderProductSelectTotal />
          </Typography>
        </div>
      </Collapse>
    </div>
  );
};

export default MakeOrderProductSelect;
