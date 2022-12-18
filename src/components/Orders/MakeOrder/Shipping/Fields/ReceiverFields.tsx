import { MakeOrderForm } from '@/types';
import { Checkbox, Collapse, FormControlLabel, Grid } from '@mui/material';
import { FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MakeOrderPhoneControl, MakeOrderTextControl } from '../../Controls';

export interface MakerOrderShippingReceiverFieldsProps {
  item?: boolean;
  spacing?: number;
}

const MakerOrderShippingReceiverFields: FC<
  MakerOrderShippingReceiverFieldsProps
> = ({ item, spacing }) => {
  const [isDifferentReceiver, setIsDifferentReceiver] = useState(false);

  const { resetField } = useFormContext<MakeOrderForm>();

  return (
    <Grid
      container
      item={item}
      spacing={spacing}
      direction="column"
    >
      <Grid item>
        <FormControlLabel
          control={
            <Checkbox
              onClick={() =>
                setIsDifferentReceiver((current) => {
                  if (current)
                    setTimeout(() => {
                      resetField('shippingInformation.name');
                      resetField('shippingInformation.lastName');
                      resetField('shippingInformation.phoneNumber');
                    }, 500);
                  return !current;
                })
              }
            />
          }
          label="La persona que recibe es alguien más"
        />
      </Grid>
      <Grid item>
        <Collapse in={isDifferentReceiver}>
          <Grid
            item
            container
            spacing={spacing}
            direction="column"
          >
            <Grid
              item
              container
              spacing={spacing}
            >
              <Grid
                item
                xs={12}
                sm={6}
              >
                <MakeOrderTextControl
                  label="Nombre(s)"
                  name="shippingInformation.name"
                  capitalize
                  required={isDifferentReceiver}
                  trim
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
              >
                <MakeOrderTextControl
                  label="Apellidos"
                  name="shippingInformation.lastName"
                  capitalize
                  required={isDifferentReceiver}
                  trim
                />
              </Grid>
            </Grid>
            <Grid item>
              <MakeOrderPhoneControl
                label="Número de teléfono"
                name="shippingInformation.phoneNumber"
                required={isDifferentReceiver}
              />
            </Grid>
          </Grid>
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default MakerOrderShippingReceiverFields;
