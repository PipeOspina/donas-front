import { MakeOrderForm, ProductModel } from '@/types';
import { ModelWithId } from '@/types/Firestore';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TransitionGroup } from 'react-transition-group';

interface ProductSpecsProps {
  specs: ProductSpec[];
}

const ProductSpecs = ({ index, product }: ProductSpecsProps) => {
  const { control } = useFormContext<MakeOrderForm>();

  const { fields } = useFieldArray({
    control,
    name: `selectedProducts.${index}.specs`,
  });

  console.log(fields);

  return (
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
  );
};

export default ProductSpecs;
