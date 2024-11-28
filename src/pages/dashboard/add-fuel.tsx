import React from "react";
import { useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { fuelSchema } from "../../form-schemas/form-schema";
import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../../components/ui/calendar";
import { Input } from "../../components/ui/input";
import { APISERVICE, AppServiceProps } from "../../service/app-service";
import { displayToast } from "../../components/toast/toast";
import { FormProps } from "./add-trip";
import { useAuth } from "../../context/app-context-provider";

interface AddFuel extends FormProps {
  refetchFuel?: () => void;
  defaultValues?: any;
  editing?: boolean;
}

const AddFuel = ({ onClose, defaultValues, editing }: AddFuel) => {
  const { setIsFuelAdded } = useAuth();
  const form = useForm<z.infer<typeof fuelSchema>>({
    resolver: zodResolver(fuelSchema),
    mode: "onChange",
    defaultValues: {
      ...defaultValues,
    },
  });
  async function onSubmit(values: z.infer<typeof fuelSchema>) {
    const apiData: AppServiceProps = {
      path: "fuel/create",
      method: "POST",
      body: values,
    };
    if (editing) {
      apiData.method = "PATCH";
      apiData.path = `/fuel/update/${defaultValues?._id}`;
    }
    const response = await APISERVICE(apiData);
    if (response?.status === "success") {
      displayToast({ status: response.status, description: response.message });
      onClose();
      setIsFuelAdded(true);
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
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
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
            name="totalCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Cost</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                      console.log(e.target.valueAsNumber);
                    }}
                    placeholder="Total Cost"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fuelQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fuel Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                      console.log(e.target.valueAsNumber);
                    }}
                    placeholder="Fuel Quantity"
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

export default AddFuel;
