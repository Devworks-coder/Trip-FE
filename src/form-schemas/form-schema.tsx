import { z } from "zod";

export const addTripSchema = z.object({
  from: z.string({ required_error: "From is required" }),
  to: z.string({ required_error: "To is required" }),
  tripDate: z.string({ message: "Trip Date is required" }),
  distance: z
    .number({
      required_error: "Distance is required",
      invalid_type_error: "Distance must be a number",
    })
    .min(1, "Distance must be greater than 0"),
  tripPrice: z
    .number({
      required_error: "Trip Price is required",
      invalid_type_error: "Trip Price must be a number",
    })
    .min(1, "Trip Price must be greater than 0"),
  driverName: z.string({ required_error: "To is required" }).optional(),
  driverCost: z
    .number({
      required_error: "Driver Cost is required",
      invalid_type_error: "Driver Cost must be a number",
    })
    .min(1, "Driver Cost must be greater than 0"),
});

export const expenseSchema = z.object({
  date: z.string({ message: "Date is required" }),
  workDetails: z.string({ required_error: "Work Details is required" }),
  totalCost: z
    .number({
      required_error: "Cost is required",
      invalid_type_error: "Cost must be a number",
    })
    .min(1, "Cost must be greater than 0"),
});

export const fuelSchema = z.object({
  date: z.string({ message: "Date is required" }),
  fuelQuantity: z
    .number({
      required_error: "Fuel Quantity is required",
      invalid_type_error: "Fuel Quantity must be a number",
    })
    .min(1, "Fuel Quantity must be greater than 0"),
  totalCost: z
    .number({
      required_error: "Cost is required",
      invalid_type_error: "Cost must be a number",
    })
    .min(1, "Cost must be greater than 0"),
});

export type TripType = {
  _id: string;
  from: string;
  to: string;
  tripDate: string;
  distance: number;
  tripPrice: number;
  driverName?: string;
  driverCost: number;
  fuelQuantity: number;
  fuelCost: number;
};

export type MaintanenceType = {
  date: string;
  workDetails: string;
  totalCost: number;
};

export type FuelType = {
  date: string;
  fuelQuantity: number;
  totalCost: number;
};
