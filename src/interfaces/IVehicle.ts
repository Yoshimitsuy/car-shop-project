import { z } from 'zod';

const VechileZodSchema = z.object({
  model: z.string({
    required_error: 'model is required',
    invalid_type_error: 'model must be a string',
  }).min(3, {
    message: 'Model must be 3 or more characters long',
  }),

  year: z.number({
    required_error: 'year is required',
    invalid_type_error: 'year must be a number',
  }).int({
    message: 'values between 1900 and 2022',
  }).gte(1900).lte(2022),

  color: z.string({
    required_error: 'color is required',
    invalid_type_error: 'color must be  string',
  }).min(3, {
    message: 'Model must be 3 or more characters long',
  }),

  status: z.boolean({
    invalid_type_error: 'status must be True or False',
  }).optional(),

  buyValue: z.number({
    required_error: 'buyValue is required',
  }).int({
    message: 'buyValue must be a number',
  }),
});

type IVehicle = z.infer<typeof VechileZodSchema>;

export { VechileZodSchema, IVehicle };
