import { AddCardButton } from "@/components/buttton";
import { Separator } from "@/components/separator";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray } from "react-hook-form";
import { FaTrash } from "react-icons/fa6";

export const VersionCard = ({
  form,
  loading,
}: {
  form: any;
  loading: boolean;
}) => {
  const versionFormArray = useFieldArray({
    control: form.control,
    name: "versions",
  });

  const addNewVersion = () => {
    if (versionFormArray.fields.length === 0) {
      versionFormArray.append({
        version: null,
        whatNews: null,
        description: null,
        url: null,
      });
      return;
    }
    const lastField = versionFormArray.fields[
      versionFormArray.fields.length - 1
    ] as any;
    if (
      lastField.version === null &&
      lastField.whatNews === null &&
      lastField.description === null &&
      lastField.url === null
    ) {
      return;
    }

    versionFormArray.insert(versionFormArray.fields.length, {
      version: null,
      whatNews: null,
      description: null,
      url: null,
    });
  };

  return (
    <>
      <div className="col-span-2">
        <h2 className="mb-4">Versions</h2>
        <Separator />
      </div>
      {versionFormArray.fields.map((field, index) => (
        <div key={field.id} className="border p-2 rounded-md">
          <div className="flex items-center justify-between p-2">
            <h3>Version {index + 1}</h3>
            <Button
              disabled={loading}
              variant="destructive"
              size="sm"
              type="button"
              onClick={() => versionFormArray.remove(index)}
            >
              <FaTrash className="h-4 w-4" />
            </Button>
          </div>
          <Separator className="mb-2" />
          <FormField
            control={form.control}
            name={`versions[${index}].version`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`versions[${index}].version`}>
                  Version Number
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    {...field}
                    type="number"
                    step=".01"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`versions[${index}].description`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`versions[${index}].description`}>
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`versions[${index}].url`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`versions[${index}].url`}>
                  Release Notes URL
                </FormLabel>
                <FormControl>
                  <Input disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name={`versions[${index}].whatNews`}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={`versions[${index}].whatNews`}>
                  What&apos;s New
                </FormLabel>
                <FormControl>
                  <Textarea disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
      <AddCardButton onClick={addNewVersion} />
    </>
  );
};
