import { DataItem } from "@/components/form-components/multiselect";
import { UCNIData } from "@/data/ucni_data";
import { Array1Dto2D } from "@/lib/utils";
export const getModels = (brand: string) => {
  if (!brand) return [];
  return Array1Dto2D(
    UCNIData.find((d) => d.name.toLowerCase() === brand)?.models.map(
      (m) => m.name
    )
  );
};

export const getBrands = UCNIData.map((d) => [d.name, d.name.toLowerCase()]);

export const getFuel = (brand: string) => {
  let fuels = [
    ["Petrol", "1"],
    ["Diesel", "2"],
    ["Electric", "13"],
    ["Hybrid", "6270282"],
  ];
  const models = UCNIData.find(
    (d) => d.name.toLowerCase() == brand.toLowerCase()
  )?.models;
  if (!models) {
    return fuels;
  }
  let fuelsFilter = Array.from(fuels);
  let fuelsFiltered = [];
  for (const model of models) {
    const ind = fuelsFilter.findIndex((f) => f[0] === model.fuel_type.name);
    if (ind !== -1) {
      fuelsFiltered.push(fuelsFilter.splice(ind, 1)[0]);
    }
  }
  return fuelsFiltered;
};

export const getTransmission = (brand: string) => {
  let transmissions = [
    ["Manual", "1"],
    ["Automatic/Other", "2"],
  ];
  const models = UCNIData.find(
    (d) => d.name.toLowerCase() == brand.toLowerCase()
  )?.models;
  if (!models) {
    return transmissions;
  }
  let transFilter = Array.from(transmissions);
  let transFiltered = [];
  for (const model of models) {
    const ind = transFilter.findIndex((f) => f[0] === model.trans_type.name);
    if (ind !== -1) {
      transFiltered.push(transFilter.splice(ind, 1)[0]);
    }
  }
  return transFiltered;
};
export const getColours = (brand: string) => {
  let colours = [
    { value: "794", label: "Black" },
    { value: "808", label: "White" },
    { value: "788", label: "Red" },
    { value: "968", label: "Yellow" },
    { value: "822", label: "Grey" },
    { value: "796", label: "Blue" },
    { value: "798", label: "Silver" },
    { value: "810", label: "Cream/Gold" },
    { value: "792", label: "Green" },
    { value: "16383", label: "Orange" },
    { value: "1", label: "Pink/Purple" },
    { value: "1171", label: "Bronze/Brown" },
  ];
  const models = UCNIData.find(
    (d) => d.name.toLowerCase() == brand.toLowerCase()
  )?.models;
  if (!models) {
    return colours;
  }
  let filteredColours: DataItem[] = [];

  models.forEach((x) => {
    x.colour.forEach((c) => {
      filteredColours.push({ label: c.name, value: String(c.id) });
    });
  });
  filteredColours = filteredColours.filter(
    (v, i, a) => a.findIndex((v2) => v2.value === v.value) === i
  );
  return filteredColours;
};

export const getEngineSizes = (
  brand: string,
  model: string,
  min?: string,
  max?: string
): string[][] => {
  let engines;
  if (model === "NONE" || brand === "NONE") {
    engines = Array.from(Array(25).keys()).map((v) => {
      return [`${(v + 10) / 10.0} L`, ((v + 10) * 100).toString()];
    });
  } else {
    engines = UCNIData.find((mk) => mk.name.toLowerCase() === brand)
      ?.models.find((mdl) => mdl.name.toLowerCase() === model)
      ?.eng_size.map((eng) => [eng.name, eng.id.toString()]);
    if (!engines) return [[]];
  }

  if (min) {
    engines = engines.filter((engine) => Number(engine[1]) >= Number(min));
  }
  if (max) {
    engines = engines.filter((engine) => Number(engine[1]) <= Number(max));
  }

  return engines;
};
