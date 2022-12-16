import styles from '@/styles/components/MakeOrderBilling.module.css';
import { Typography } from '@mui/material';
import MakeOrderBillingFields from './Fields/Fields';

const MakeOrderBilling = () => {
  return (
    <div className={styles.container}>
      <Typography
        variant="h4"
        color="primary"
        className={styles.title}
      >
        Información de facturación
      </Typography>
      <MakeOrderBillingFields />
    </div>
  );
};

export default MakeOrderBilling;
