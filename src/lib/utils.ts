import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const generateYearsArray = (years: number) => {
  const currentYear = new Date().getFullYear();
  return Array.from(Array(years).keys()).map((year) => currentYear - year);
};

export const Array1Dto2D = (values: any[] | undefined): any[][] => {
  if (values === undefined) return [];
  return values.map((value) => [value, value]);
};
