import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getShippingById, updateShippingById } from 'apiSdk/shippings';
import { Error } from 'components/error';
import { shippingValidationSchema } from 'validationSchema/shippings';
import { ShippingInterface } from 'interfaces/shipping';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { OrderInterface } from 'interfaces/order';
import { getOrders } from 'apiSdk/orders';

function ShippingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ShippingInterface>(
    () => (id ? `/shippings/${id}` : null),
    () => getShippingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ShippingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateShippingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/shippings');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ShippingInterface>({
    initialValues: data,
    validationSchema: shippingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Shipping
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="address" mb="4" isInvalid={!!formik.errors?.address}>
              <FormLabel>Address</FormLabel>
              <Input type="text" name="address" value={formik.values?.address} onChange={formik.handleChange} />
              {formik.errors.address && <FormErrorMessage>{formik.errors?.address}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<OrderInterface>
              formik={formik}
              name={'order_id'}
              label={'Select Order'}
              placeholder={'Select Order'}
              fetcher={getOrders}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.status}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'shipping',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ShippingEditPage);
