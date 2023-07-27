"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

// import { toast } from "@/components/ui/use-toast";
import { Form } from "./ui/form";
import { useMemo, useState } from "react";
import { Combobox } from "./form-components/combobox";
import QuickFormInput from "./form-components/quickinput";
import {
  getBrands,
  getColours,
  getEngineSizes,
  getFuel,
  getModels,
  getTransmission,
} from "@/data/cars";
import { CarFormSchema } from "../schemas/CarFormSchema";
import MultiSelectContainer from "./form-components/multiselect";

interface CarFormProps {
  // eslint-disable-next-line unused-imports/no-unused-vars
  generateLinks: (data: z.infer<typeof CarFormSchema>) => void;
}

export function CarForm({ generateLinks }: CarFormProps) {
  const [selectedBrand, setselectedBrand] = useState<string>("NONE");
  const [selectedModel, setselectedModel] = useState<string>("NONE");
  const [selectedMinEngine, setSelectedMinEngine] = useState<string>();
  const [selectedMaxEngine, setSelectedMaxEngine] = useState<string>();

  const colours = useMemo(() => getColours(selectedBrand), [selectedBrand]);
  const fuels = useMemo(() => getFuel(selectedBrand), [selectedBrand]);
  const transmissions = useMemo(
    () => getTransmission(selectedBrand),
    [selectedBrand]
  );
  const models = useMemo(() => getModels(selectedBrand), [selectedBrand]);
  const minEngines = useMemo(
    () =>
      getEngineSizes(
        selectedBrand,
        selectedModel,
        undefined,
        selectedMaxEngine
      ),
    [selectedBrand, selectedModel, selectedMaxEngine]
  );
  const maxEngines = useMemo(
    () => getEngineSizes(selectedBrand, selectedModel, selectedMinEngine),
    [selectedBrand, selectedModel, selectedMinEngine]
  );

  const form = useForm<z.infer<typeof CarFormSchema>>({
    resolver: zodResolver(CarFormSchema),
  });

  function onSubmit(data: z.infer<typeof CarFormSchema>) {
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
    generateLinks(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-4 w-full"
      >
        <Combobox
          name="brand"
          label="Brand"
          values={getBrands}
          form={form}
          placeHolder="Select brand"
          onChange={setselectedBrand}
        />
        <Combobox
          name="model"
          enabled={selectedBrand !== "NONE"}
          label="Model"
          values={models}
          form={form}
          placeHolder="Select model"
          onChange={setselectedModel}
        />

        <QuickFormInput
          fieldName="yearFrom"
          control={form.control}
          label="Year From"
          type="number"
          placeholder="2012"
        />
        <QuickFormInput
          fieldName="yearTo"
          control={form.control}
          label="Year To"
          type="number"
          placeholder="2022"
        />
        <QuickFormInput
          fieldName="priceFrom"
          control={form.control}
          label="Price From (£)"
          type="number"
          placeholder="1000"
        />
        <QuickFormInput
          fieldName="priceTo"
          control={form.control}
          label="Price To (£)"
          type="number"
          placeholder="3000"
        />
        <Combobox
          name="engineSizeMin"
          label="Minimum engine"
          values={minEngines}
          form={form}
          placeHolder="Select engine"
          onChange={setSelectedMinEngine}
          clearOnValuesUpdate={false}
        />
        <Combobox
          name="engineSizeMax"
          label="Maximum engine"
          values={maxEngines}
          form={form}
          placeHolder="Select engine"
          onChange={setSelectedMaxEngine}
          clearOnValuesUpdate={false}
        />
        <Combobox
          name="fuel"
          label="Fuel"
          values={fuels}
          form={form}
          placeHolder="Select fuel"
        />
        <Combobox
          name="transmission"
          label="Transmission"
          values={transmissions}
          form={form}
          placeHolder="Select transmission"
        />
        <QuickFormInput
          className="col-span-2 sm:col-span-1"
          fieldName="maxMiles"
          control={form.control}
          label="Maximum mileage"
          type="number"
          placeholder="90000"
        />
        <MultiSelectContainer
          form={form}
          name="colour"
          label="Colour"
          placeholder="Select colour"
          data={colours}
        />

        <Button type="submit" className="col-span-2">
          Generate links
        </Button>
      </form>
    </Form>
  );
}
