import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addTripSchema, TripType } from "../../form-schemas/form-schema";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "../../lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { APISERVICE, AppServiceProps } from "../../service/app-service";
import { displayToast } from "../../components/toast/toast";
import { useAuth } from "../../context/app-context-provider";
export interface FormProps {
  editing?: boolean;
  onClose: () => void;
  defualtTripValues?: Record<keyof TripType, any>;
}
const AddTrip = ({ editing, onClose, defualtTripValues }: FormProps) => {
  const { setIsTripAdded } = useAuth();
  // 1. Define your form.
  const form = useForm<z.infer<typeof addTripSchema>>({
    resolver: zodResolver(addTripSchema),
    mode: "onChange",
    defaultValues: {
      ...defualtTripValues,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof addTripSchema>) {
    const apiData: AppServiceProps = {
      path: "trip/create",
      method: "POST",
      body: values,
    };
    if (editing) {
      type keys =
        | "from"
        | "to"
        | "tripDate"
        | "driverName"
        | "driverCost"
        | "tripPrice"
        | "distance";
      const dirtyFields: keys[] = Object.keys(
        form.formState.dirtyFields
      ) as keys[];

      const dirtyValues: Partial<Record<keys, any>> = {};
      for (const keys of dirtyFields) {
        dirtyValues[keys] = form.getValues(keys);
      }

      apiData.path = `trip/update/${defualtTripValues?._id}`;
      apiData.method = "PATCH";
      apiData.body = dirtyValues;
    }

    const response = await APISERVICE(apiData);
    if (response?.status === "success") {
      displayToast({ status: response.status, description: response.message });
      onClose();
      setIsTripAdded(true);
    } else if (response?.status === "error") {
      displayToast({
        status: response.status,
        description: response.message,
      });
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <Input placeholder="From" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <Input placeholder="To" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tripDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Trip Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          <span>{field?.value}</span>
                        ) : (
                          <span>Pick Trip Date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      onSelect={(e) => {
                        field.onChange(e?.toLocaleDateString());
                      }}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="distance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Distance</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                    placeholder="Distance"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tripPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trip Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                      console.log(e.target.valueAsNumber);
                    }}
                    placeholder="Trip Price"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver Name</FormLabel>
                <FormControl>
                  <Input placeholder="Driver Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Driver Cost</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                    type="number"
                    placeholder="Driver Cost"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default AddTrip;
