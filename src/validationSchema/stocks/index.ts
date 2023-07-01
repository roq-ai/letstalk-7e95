import * as yup from 'yup';

export const stockValidationSchema = yup.object().shape({
  quantity: yup.number().integer().required(),
  product_id: yup.string().nullable(),
});
