import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface QuickSelectProps {
  form: any;
  label: string;
  name: string;
  values: any[][];
  placeHolder: string | "Select a value";
  description?: string;
  onChange?: (arg0: any) => void;
  enabled?: boolean;
}

const getSelectItems = (values: any[][]) => {
  return values.map((kv) => (
    <SelectItem value={kv[1] + ""} key={kv[1] + ""}>
      {kv[0] + ""}
    </SelectItem>
  ));
};

const QuickSelect = ({
  form,
  label,
  name,
  values,
  enabled,
  placeHolder,
  description,
  onChange,
}: QuickSelectProps) => {
  if (enabled === undefined) {
    enabled = true;
  }

  const _onChange = (value: any, fieldOnChange: (arg0: any) => void) => {
    if (onChange) {
      onChange(value);
    }
    fieldOnChange(value);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select
            disabled={!enabled}
            onValueChange={(v) => {
              _onChange(v, field.onChange);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeHolder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{getSelectItems(values)}</SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default QuickSelect;
