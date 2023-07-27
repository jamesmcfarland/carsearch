import { CarFormSchema } from "@/schemas/CarFormSchema";
import * as z from "zod";
import { SearchLink } from "../types";
import { UCNIData } from "../../../data/ucni_data";

const makeAndModel = (
  request: string,
  data: z.infer<typeof CarFormSchema>
): string => {
  if (data.brand) {
    const brand = UCNIData.find((x) => x.name.toLowerCase() === data.brand);
    if (brand) {
      request += "&make=" + brand.id;

      if (data.model) {
        const model = brand.models.find(
          (x) => x.name.toLowerCase() === data.model
        );
        if (model) {
          request += "&model=" + model.id;
        }
      } else {
        console.log("unable to find model", data.model);
      }
    } else {
      console.log("unable to find brand", brand);
    }
  }
  return request;
};

const engines = (
  request: string,
  data: z.infer<typeof CarFormSchema>
): string => {
  if (!data.engineSizeMin && !data.engineSizeMax) return request;

  const minEngineSize = Number(data.engineSizeMin) || 1000;
  const maxEngineSize = Number(data.engineSizeMax) || 5000;

  for (
    let engineSize = minEngineSize;
    engineSize <= maxEngineSize;
    engineSize += 100
  ) {
    request += `&eng_size[]=${engineSize}`;
  }

  return request;
};

const colours = (
  request: string,
  data: z.infer<typeof CarFormSchema>
): string => {
  data.colour?.forEach((c) => {
    request += `&colour[]=${c}`;
  });

  return request;
};

const UsedCarsNIBuilder = (data: z.infer<typeof CarFormSchema>): SearchLink => {
  let request = "search_type=1";

  request = makeAndModel(request, data);

  request = engines(request, data);

  request = colours(request, data);

  if (data.yearFrom) request += "&age_from=" + data.yearFrom;
  if (data.yearFrom) request += "&age_to=" + data.yearTo;
  if (data.priceFrom) request += "&price_from=" + data.priceFrom;
  if (data.priceTo) request += "&price_to=" + data.priceTo;
  if (data.transmission) request += "&trans_type=" + data.transmission;
  if (data.fuel) request += "&fuel_type=" + data.fuel;
  if (data.maxMiles) request += "&mileage_to=" + data.maxMiles;

  return {
    name: "UsedCarsNI",
    url: `https://www.usedcarsni.com/search_results.php?${request}`,
  };
};

export default UsedCarsNIBuilder;
