import { MakeOrderForm } from '@/types';
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

interface ProductSpecsDialogProps {
  open: boolean;
  index: number;
  onClose?: () => void;
}

const ProductSpecsDialog = ({
  open,
  index,
  onClose,
}: ProductSpecsDialogProps) => {
  const { control } = useFormContext<MakeOrderForm>();

  const productId = useWatch({
    control,
    name: `selectedProducts.${index}.productId`,
  });

  const products = useWatch({
    control,
    name: 'products.products',
  });

  const product = products.find(({ id }) => id === productId);

  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={product?.image.src}>{product?.name.slice(0, 2)}</Avatar>
          <div
            style={{ marginLeft: 16, display: 'flex', flexDirection: 'column' }}
          >
            <Typography
              variant="h6"
              color="primary"
            >
              Especificaciones
            </Typography>
            <Typography
              variant="subtitle2"
              color="secondary"
            >
              {product?.name}
            </Typography>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>{productId}</DialogContent>
    </Dialog>
  );
};

export default ProductSpecsDialog;
