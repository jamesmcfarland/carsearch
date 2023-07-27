"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

interface ComboBoxProps {
  form: any;
  label: string;
  name: string;
  values: any[][];
  placeHolder: string | "Select a value";
  description?: string;
  // eslint-disable-next-line unused-imports/no-unused-vars
  onChange?: (arg0: any) => void;
  enabled?: boolean;
  clearOnValuesUpdate?: boolean;
}

const getValue = (target: any, values: any[][]) => {
  const res = values.find(
    (value) => value[1].toLowerCase() === target.toLowerCase()
  );
  if (res === undefined) return target;
  return res[0];
};

export function Combobox({
  form,
  label,
  name,
  values,
  enabled,
  placeHolder,
  description,
  onChange,
  clearOnValuesUpdate = true,
}: ComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  React.useEffect(() => {
    if (clearOnValuesUpdate) {
      setValue("");
    }
  }, [values, clearOnValuesUpdate]);

  enabled = enabled === undefined ? true : enabled;

  const getCommandItems = (values: any[][]) => {
    // if (values === undefined) return <></>;

    return values.map((kv) => (
      <CommandItem
        key={kv[1] + ""}
        value={kv[1]}
        onSelect={(currentValue) => {
          setValue(currentValue === kv[0] + "" ? "" : currentValue);
          form.setValue(name, currentValue);
          setOpen(false);
          if (onChange) onChange(currentValue);
        }}
      >
        <Check
          className={cn(
            "mr-2 h-4 w-4",
            value === kv[0] + "" ? "opacity-100" : "opacity-0"
          )}
        />
        {kv[0] + ""}
      </CommandItem>
    ));
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
                disabled={!enabled}
              >
                {value ? getValue(value, values) : placeHolder}

                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder={placeHolder} />
                <CommandEmpty>No {label}s found.</CommandEmpty>
                <CommandGroup>{getCommandItems(values)}</CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
