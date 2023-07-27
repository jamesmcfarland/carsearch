import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface QuickFormInputProps {
  control: any;
  label: string;
  placeholder: string;
  fieldName: string;
  existingValue?: string;
  type?: "text" | "number" | "email" | "password" | "tel";
  className?: string;
}

const QuickFormInput = ({
  control,
  label,
  placeholder,
  fieldName,
  existingValue,
  type,
  className,
}: QuickFormInputProps) => {
  type = type || "text";
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              defaultValue={existingValue}
              type={type}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default QuickFormInput;
