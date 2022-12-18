import { Grid, Theme, useMediaQuery } from '@mui/material';
import { MakeOrderTextControl } from '../../Controls';
import MakeOrderShippingCityNeighborhoodFields from './CityNeighborhoodFields';
import MakeOrderShippingDateField from './DateField';
import MakerOrderShippingReceiverFields from './ReceiverFields';

const spacing = 2;

const MakeOrderShippingFields = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      style={{ width: isMobile ? '100%' : 500, padding: 8 }}
    >
      <MakeOrderShippingCityNeighborhoodFields
        item
        spacing={spacing}
        required
      />
      <Grid item>
        <MakeOrderTextControl
          label="Dirección"
          name="shippingInformation.address"
          required
          trim
        />
      </Grid>
      <Grid item>
        <MakeOrderTextControl
          label="Detalles para el mensajero"
          name="shippingInformation.details"
          rows={3}
          multiline
        />
      </Grid>
      <Grid item>
        <MakeOrderShippingDateField />
      </Grid>
      <MakerOrderShippingReceiverFields
        item
        spacing={spacing}
      />
    </Grid>
  );
};

export default MakeOrderShippingFields;
