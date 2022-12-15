import { MakeOrderForm } from '@/types';
import { formatPrice } from '@/utils/formats';
import { useFormContext } from 'react-hook-form';

const MakeOrderProductSelectTotal = () => {
  const { watch } = useFormContext<MakeOrderForm>();
  const selectedProducts = watch('selectedProducts');

  const total = selectedProducts.reduce(
    (prev, { price, quantity }) => prev + price * (quantity ?? 0),
    0,
  );

  return <>{formatPrice(total)}</>;
};

export default MakeOrderProductSelectTotal;
