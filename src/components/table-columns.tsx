import { ColDef } from "@ag-grid-community/core";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomCellRendererProps } from "ag-grid-react";
import { fomatCurrency, formatDate } from "../utils/helper";
import { Button } from "./ui/button";
import { FilePenLine, MoreVerticalIcon } from "lucide-react";
import { useState } from "react";
import BottomSheet from "./bottom-sheet/bottom-sheet";
import AddTrip from "../pages/dashboard/add-trip";
import AddExpense from "../pages/dashboard/add-expenses";
import AddFuel from "../pages/dashboard/add-fuel";
export const TripColumns: ColDef[] = [
  {
    headerName: "From",
    field: "from",
    autoHeight: true,
    wrapText: true,
    width: 200,
  },
  {
    headerName: "To",
    field: "to",
    autoHeight: true,
    wrapText: true,
    width: 200,
  },

  {
    headerName: "Distance",
    field: "distance",
    autoHeight: true,
    wrapText: true,
    width: 100,
    cellRenderer: (params: CustomCellRendererProps) => {
      return <p>{params?.data?.distance} Km</p>;
    },
  },
  {
    headerName: "Trip Date",
    field: "tripDate",
    autoHeight: true,
    wrapText: true,
    width: 160,
    cellRenderer: (params: CustomCellRendererProps) => {
      return <p>{formatDate(params?.data?.tripDate)}</p>;
    },
  },
  {
    headerName: "Driver Name",
    field: "driverName",
    autoHeight: true,
    wrapText: true,
    width: 150,
  },
  {
    headerName: "Driver Cost",
    field: "driverCost",
    autoHeight: true,
    wrapText: true,
    width: 130,
    cellRenderer: (params: CustomCellRendererProps) => {
      return <p>{fomatCurrency(params?.data?.driverCost)}</p>;
    },
  },
  {
    width: 140,
    headerName: "Actions",
    field: "actions",

    cellRenderer: (params: CustomCellRendererProps) => {
      const [open, setOpen] = useState<boolean>(false);
      const onOpen = () => setOpen(!open);

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex">
              <Button variant={"outline"}>
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onOpen()}
              >
                <FilePenLine className="mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <BottomSheet
            children={
              <AddTrip
                editing={true}
                defualtTripValues={params?.data}
                onClose={onOpen}
              />
            }
            onOpen={onOpen}
            onClose={onOpen}
            open={open}
            title="Edit Trip"
          />
        </div>
      );
    },
  },
];
export const ExpensesColumns: ColDef[] = [
  {
    headerName: "Date",
    field: "date",
    autoHeight: true,
    wrapText: true,
    width: 120,
    cellRenderer: (params: CustomCellRendererProps) => {
      return <p>{formatDate(params?.data?.date)}</p>;
    },
  },
  {
    headerName: "Work Details",
    field: "workDetails",
    autoHeight: true,
    wrapText: true,
    width: 150,
  },
  {
    headerName: "Total Cost",
    field: "totalCost",
    autoHeight: true,
    wrapText: true,
    width: 130,
    cellRenderer: (params: CustomCellRendererProps) => {
      return <p>{fomatCurrency(params?.data?.totalCost)}</p>;
    },
  },
  {
    width: 140,
    headerName: "Actions",
    field: "actions",

    cellRenderer: (params: CustomCellRendererProps) => {
      const [open, setOpen] = useState<boolean>(false);
      const onOpen = () => setOpen(!open);
      console.log(params);

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex">
              <Button variant={"outline"}>
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onOpen()}
              >
                <FilePenLine className="mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <BottomSheet
            children={
              <AddExpense
                defaultValues={params?.data}
                editing={true}
                onClose={onOpen}
              />
            }
            onOpen={onOpen}
            onClose={onOpen}
            open={open}
            title="Edit Maintainence"
          />
        </div>
      );
    },
  },
];
export const FuelColumns: ColDef[] = [
  {
    headerName: "Date",
    field: "date",
    autoHeight: true,
    wrapText: true,
    width: 120,
    cellRenderer: (params: CustomCellRendererProps) => {
      return <p>{formatDate(params?.data?.date)}</p>;
    },
  },
  {
    headerName: "Fuel Quantity",
    field: "fuelQuantity",
    autoHeight: true,
    wrapText: true,
    width: 150,
  },
  {
    headerName: "Total Cost",
    field: "totalCost",
    autoHeight: true,
    wrapText: true,
    width: 130,
    cellRenderer: (params: CustomCellRendererProps) => {
      return <p>{fomatCurrency(params?.data?.totalCost)}</p>;
    },
  },
  {
    width: 140,
    headerName: "Actions",
    field: "actions",

    cellRenderer: (params: CustomCellRendererProps) => {
      const [open, setOpen] = useState<boolean>(false);
      const onOpen = () => setOpen(!open);

      return (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="flex">
              <Button variant={"outline"}>
                <MoreVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => onOpen()}
              >
                <FilePenLine className="mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <BottomSheet
            children={
              <AddFuel
                defaultValues={params?.data}
                editing={true}
                onClose={onOpen}
              />
            }
            onOpen={onOpen}
            onClose={onOpen}
            open={open}
            title="Edit Fuel"
          />
        </div>
      );
    },
  },
];

export const RevenueColumns: ColDef[] = [
  {
    headerName: "From",
    field: "from",
    autoHeight: true,
    wrapText: true,
    width: 200,
  },
  {
    headerName: "To",
    field: "to",
    autoHeight: true,
    wrapText: true,
    width: 200,
  },
  {
    headerName: "Trip Date",
    field: "tripDate",
    autoHeight: true,
    wrapText: true,
    width: 150,
  },
  {
    headerName: "Revenue",
    field: "revenue",
    autoHeight: true,
    wrapText: true,
    width: 150,
  },
  {
    headerName: "Fuel Cost",
    field: "fuelCosts",
    autoHeight: true,
    wrapText: true,
    width: 150,
  },
  {
    headerName: "Maintainence Cost",
    field: "maintenanceCosts",
    autoHeight: true,
    wrapText: true,
    width: 150,
  },
];
