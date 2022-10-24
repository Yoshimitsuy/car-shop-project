import { z } from 'zod';
import { VechileZodSchema } from './IVehicle';

const CarZodSchema = VechileZodSchema.extend({
  doorsQty: z.number({
    required_error: 'doorsQty is required',
  }).int({
    message: 'values between 2 and 4',
  }).gte(2).lte(4),

  seatsQty: z.number({
    required_error: 'seatsQty is required',
  }).int({
    message: 'values between 2 and 7',
  }).gte(2).lte(7),
});

type ICar = z.infer<typeof CarZodSchema>;

export { CarZodSchema, ICar };