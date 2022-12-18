import styles from '@/styles/components/MakeOrderBilling.module.css';
import { Typography } from '@mui/material';
import MakeOrderBillingFields from './Fields/Fields';

const MakeOrderShipping = () => {
  return (
    <div className={styles.container}>
      <Typography
        variant="h4"
        color="primary"
        className={styles.title}
      >
        Información de envío
      </Typography>
      <MakeOrderBillingFields />
    </div>
  );
};

export default MakeOrderShipping;
