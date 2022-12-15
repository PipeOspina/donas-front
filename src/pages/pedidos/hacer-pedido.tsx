import {
  MakeOrderAppBar,
  MakeOrderProductSelect,
  MakeOrderStepper,
} from '@/components';
import { MakeOrderForm } from '@/types';
import Head from 'next/head';
import { FormProvider, useForm } from 'react-hook-form';

const MakeOrder = () => {
  const formMethods = useForm<MakeOrderForm>({
    defaultValues: {
      steps: { activeStep: 0, completedSteps: [] },
      selectedProducts: [],
    },
    mode: 'all',
  });

  const { watch } = formMethods;

  const activeStep = watch('steps.activeStep');

  return (
    <>
      <Head>
        <title>Pedidos - Hacer pedido</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
      </Head>
      <FormProvider {...formMethods}>
        <div style={{ width: '100%', paddingTop: 24, paddingBottom: 64 + 8 }}>
          <MakeOrderStepper />
          {activeStep === 0 && <MakeOrderProductSelect />}
        </div>
        <MakeOrderAppBar />
      </FormProvider>
    </>
  );
};

export default MakeOrder;
