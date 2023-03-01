import { Carousel } from '@/components/Miscellany';
import { ProductCard } from '@/components/Products';
import { MakeOrderForm, ProductModel } from '@/types';
import { ModelWithId } from '@/types/Firestore';
import { Theme, useMediaQuery } from '@mui/material';
import { FC, useCallback, useId, useMemo } from 'react';
import {
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFormContext,
  useWatch,
} from 'react-hook-form';

export interface MakeOrderProductSelectCarouselProps {
  selectedProducts: MakeOrderForm['selectedProducts'];
  onAddProduct: UseFieldArrayAppend<MakeOrderForm, 'selectedProducts'>;
  onRemoveProduct: UseFieldArrayRemove;
}

const MakeOrderProductSelectCarousel: FC<
  MakeOrderProductSelectCarouselProps
> = ({ selectedProducts, onAddProduct, onRemoveProduct }) => {
  const { control } = useFormContext<MakeOrderForm>();

  const products = useWatch({ control, name: 'products.products' });
  const loading = useWatch({ control, name: 'products.loading' });

  const id = useId();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  const toggleSelectProduct = useCallback(
    (product: ModelWithId<ProductModel>) => {
      const productFieldIndex = selectedProducts.findIndex(
        ({ productId }) => productId === product.id,
      );

      productFieldIndex >= 0
        ? onRemoveProduct(productFieldIndex)
        : onAddProduct({
            productId: product.id,
            quantity: product.prices[0].min,
            specs: [],
          });
    },
    [onAddProduct, onRemoveProduct, selectedProducts],
  );

  const loadingElements = useMemo(
    () =>
      Array(3)
        .fill(undefined)
        .map((_, i) => (
          <ProductCard
            key={`MAKE_ORDER_PRODUCT_SELECT_CAROUSEL_PRODUCT_CARD_LOADING_${id}_${i}`}
            disabled
            loading
          />
        )),
    [id],
  );

  return (
    <Carousel
      spacing={isMobile ? 0 : 2}
      maxWidth={isMobile ? '100vw' : '80vw'}
      elements={
        loading
          ? loadingElements
          : products.map((product) => (
              <ProductCard
                key={`MAKE_ORDER_PRODUCT_SELECT_CAROUSEL_PRODUCT_CARD_${id}_${product.id}`}
                product={product}
                selected={selectedProducts.some(
                  ({ productId }) => productId === product.id,
                )}
                onClick={() => toggleSelectProduct(product)}
              />
            ))
      }
      arrowColor="primary"
    />
  );
};

export default MakeOrderProductSelectCarousel;
