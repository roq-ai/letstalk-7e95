import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  status: yup.string().required(),
  product_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
