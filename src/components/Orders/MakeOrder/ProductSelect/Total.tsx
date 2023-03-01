import { MakeOrderForm } from '@/types';
import { formatPrice } from '@/utils';
import { useFormContext, useWatch } from 'react-hook-form';

const MakeOrderProductSelectTotal = () => {
  const { control } = useFormContext<MakeOrderForm>();

  const selectedProducts = useWatch({
    control,
    name: 'selectedProducts',
  });

  const products = useWatch({ control, name: 'products.products' });

  const total = selectedProducts?.reduce(
    (prev, { quantity, productId }) =>
      prev +
      (products
        .find(({ id }) => productId === id)
        ?.prices.find(
          ({ min, max }) => min <= quantity && (max ?? 100_000) >= quantity,
        )?.value ?? 0) *
        (quantity ?? 0),
    0,
  );

  return <>{formatPrice(total ?? 0)}</>;
};

export default MakeOrderProductSelectTotal;
