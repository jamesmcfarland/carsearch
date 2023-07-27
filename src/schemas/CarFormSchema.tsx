"use client";
import * as z from "zod";

export const CarFormSchema = z.object({
  brand: z.string().optional(),
  model: z.string().optional(),
  yearFrom: z.string().optional(),
  yearTo: z.string().optional(),
  priceFrom: z.string().optional(),
  priceTo: z.string().optional(),
  engineSizeMin: z.string().optional(),
  engineSizeMax: z.string().optional(),
  fuel: z.string().optional(),
  transmission: z.string().optional(),
  maxMiles: z.string().optional(),
  colour: z.string().array().optional(),
});
