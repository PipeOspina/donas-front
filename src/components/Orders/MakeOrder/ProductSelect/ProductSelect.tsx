import styles from '@/styles/components/MakeOrderProductSelect.module.css';
import { MakeOrderForm } from '@/types';
import {
  Collapse,
  List,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { TransitionGroup } from 'react-transition-group';
import MakeOrderProductSelectCarousel from './Carousel';
import MakeOrderProductSelectError from './Error';
import { FlavorFilter } from './FlavorFilter';
import MakeOrderProductSelectQuantityCard from './QuantityCard';
import MakeOrderProductSelectTotal from './Total';

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

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <section className={styles.container}>
      <Typography
        variant="h4"
        color="primary"
        className={styles.title}
      >
        Selección de productos
      </Typography>
      <FlavorFilter
        sx={{ width: 200, mb: 2 }}
        size="small"
      />
      <MakeOrderProductSelectCarousel
        onAddProduct={addProduct}
        onRemoveProduct={removeProduct}
        selectedProducts={selectedProducts}
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
    </section>
  );
};

export default MakeOrderProductSelect;
