import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import BottomSheet from "../../components/bottom-sheet/bottom-sheet";
import AddExpense from "./add-expenses";
import DataTable from "../../components/data-table/data-table";
import { APISERVICE, AppServiceProps } from "../../service/app-service";
import { useQuery } from "react-query";
import AppLoader from "../../components/loader/loader";
import { ExpensesColumns, FuelColumns } from "../../components/table-columns";
import AddFuel from "./add-fuel";
import { useAuth } from "../../context/app-context-provider";

const Expenses = () => {
  const {
    isMaintainenceAdded,
    setIsMaintainenceAdded,
    isFuelAdded,
    setIsFuelAdded,
  } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [openMaintainece, setOpenMaintainence] = useState<boolean>(false);
  const onOpen = () => setOpen(!open);
  const onOpenMaintainence = () => setOpenMaintainence(!openMaintainece);
  // API configuration for maintenance data
  const maintenanceApiData: AppServiceProps = {
    path: "maintanences",
    method: "GET",
  };

  // API configuration for fuel data
  const fuelApiData: AppServiceProps = {
    path: "fuels", // Assuming fuel data is fetched from the "fuels" endpoint
    method: "GET",
  };

  // Fetching maintenance data
  async function fetchMaintenance() {
    return await APISERVICE(maintenanceApiData);
  }

  // Fetching fuel data
  async function fetchFuel() {
    return await APISERVICE(fuelApiData);
  }

  // React Query hooks to fetch maintenance and fuel data
  const {
    isLoading: isLoadingMaintenance,
    data: maintenanceData,
    refetch: refetchMaintenance,
    isFetching: isFetchingMaintenance,
  } = useQuery("maintenance", fetchMaintenance);

  const {
    isLoading: isLoadingFuel,
    data: fuelData,
    refetch: refetchFuel,
    isFetching: isFetchingFuel,
  } = useQuery("fuel", fetchFuel);

  useEffect(() => {
    if (isMaintainenceAdded) {
      refetchMaintenance();
      setIsMaintainenceAdded(false);
    }

    if (isFuelAdded) {
      refetchFuel();
      setIsFuelAdded(false);
    }
  }, [
    isMaintainenceAdded,
    setIsMaintainenceAdded,
    isFuelAdded,
    setIsFuelAdded,
    refetchFuel,
    refetchMaintenance,
  ]);
  // Show loading indicator if either maintenance or fuel data is still loading
  if (
    (isLoadingMaintenance && isFetchingMaintenance) ||
    (isLoadingFuel && isFetchingFuel)
  ) {
    return <AppLoader />;
  }

  return (
    <div>
      {/* Maintenance Data Section */}
      <div className="border bg-muted p-2 h-fit">
        <h1 className="text-center font-semibold text-xl">Maintenance Data</h1>
        <div className="py-4">
          <Button onClick={() => onOpenMaintainence()}>Create</Button>
        </div>

        {/* Pass maintenance data to the DataTable */}
        <DataTable
          rowData={maintenanceData?.data}
          columnDefs={ExpensesColumns}
        />
        <BottomSheet
          children={
            <AddExpense
              refetchMaintenance={refetchMaintenance}
              onClose={onOpenMaintainence}
            />
          }
          onOpen={onOpenMaintainence}
          onClose={onOpenMaintainence}
          open={openMaintainece}
          title="Add Maintenance"
        />
      </div>

      {/* Fuel Data Section */}
      <div className="border bg-muted p-2">
        <h1 className="text-center font-semibold text-xl">Fuel Data</h1>
        <div className="py-4">
          <Button onClick={() => onOpen()}>Create</Button>
        </div>

        {/* Pass fuel data to the DataTable */}
        <DataTable rowData={fuelData?.data} columnDefs={FuelColumns} />
        <BottomSheet
          children={
            <AddFuel
              editing={true}
              refetchFuel={refetchFuel}
              onClose={onOpen}
            />
          }
          onOpen={onOpen}
          onClose={onOpen}
          open={open}
          title="Add Fuel"
        />
      </div>
    </div>
  );
};

export default Expenses;
