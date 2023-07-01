import * as yup from 'yup';

export const shippingValidationSchema = yup.object().shape({
  address: yup.string().required(),
  order_id: yup.string().nullable(),
});
