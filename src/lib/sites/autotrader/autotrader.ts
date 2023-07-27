import { CarFormSchema } from "@/schemas/CarFormSchema";
import * as z from "zod";
import { SearchLink } from "../types";

const AutoTraderBuilder = (data: z.infer<typeof CarFormSchema>): SearchLink => {
  return {
    name: "AutoTrader",
    url: "",
  };
};

export default AutoTraderBuilder;
