import { MakeOrderForm } from '@/types';
import {
  Collapse,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import {
  MakeOrderEmailControl,
  MakeOrderPhoneControl,
  MakeOrderTextControl,
} from '../../Controls';
import MakeOrderBillingDocumentFields from './DocumentFields';
import MakeOrderBillingRutFields from './RutFields';

const spacing = 2;

const MakeOrderBillingFields = () => {
  const { control, setValue, clearErrors } = useFormContext<MakeOrderForm>();

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
      <Grid
        item
        container
        display="flex"
        spacing={spacing}
        justifyContent="center"
      >
        <Controller
          name="billingInformation.billingType"
          render={({ field: { onChange, ...field } }) => (
            <>
              <Grid item>
                <FormControl>
                  <FormLabel>Tipo de facturación</FormLabel>
                  <RadioGroup
                    {...field}
                    onChange={(event, type) => {
                      onChange(event);
                      if (type === 'electronic') {
                        setValue('billingInformation.documentType', 'nit');
                        clearErrors('billingInformation.documentType');
                        setValue('billingInformation.documentNumber', '');
                        clearErrors('billingInformation.documentNumber');
                      }
                    }}
                    row
                  >
                    <FormControlLabel
                      control={<Radio />}
                      value="charge"
                      label="Cuenta de cobro"
                    />
                    <FormControlLabel
                      control={<Radio />}
                      value="electronic"
                      label="Factura electrónica"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item>
                <Collapse in={field.value === 'electronic'}>
                  <Typography
                    variant="body2"
                    color="primary"
                    style={{ textAlign: 'center' }}
                  >
                    La facturación electrónica requiere cobro por IVA a nuestros
                    productos, para evitarlo seleccione &quot;Cuenta de
                    cobro&quot; (de igual modo llegará dicha cuenta al correo
                    electrónico ingresado)
                  </Typography>
                </Collapse>
              </Grid>
            </>
          )}
          control={control}
        />
      </Grid>
      <Grid
        item
        container
        spacing={spacing}
      >
        <Grid
          item
          xs={isMobile ? 12 : 6}
        >
          <MakeOrderTextControl
            label="Nombre(s)"
            name="billingInformation.name"
            required
            trim
            capitalize
          />
        </Grid>
        <Grid
          item
          xs={isMobile ? 12 : 6}
        >
          <MakeOrderTextControl
            label="Apellidos"
            name="billingInformation.lastName"
            required
            trim
            capitalize
          />
        </Grid>
      </Grid>
      <Grid
        item
        container
        spacing={spacing}
      >
        <Grid
          item
          xs={isMobile ? 12 : 6}
        >
          <MakeOrderEmailControl
            label="Correo electrónico"
            name="billingInformation.email"
            required
          />
        </Grid>
        <Grid
          item
          xs={isMobile ? 12 : 6}
        >
          <MakeOrderPhoneControl
            label="Número de teléfono"
            name="billingInformation.phoneNumber"
            required
          />
        </Grid>
      </Grid>
      <MakeOrderBillingDocumentFields
        spacing={spacing}
        item
        required
      />
      <Grid item>
        <MakeOrderBillingRutFields
          required
          spacing={spacing}
        />
      </Grid>
    </Grid>
  );
};

export default MakeOrderBillingFields;
