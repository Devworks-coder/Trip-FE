import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { APISERVICE, AppServiceProps } from "../../service/app-service";
import { Loader } from "lucide-react";
import AppLoader from "../../components/loader/loader";
import DataTable from "../../components/data-table/data-table";
import { TripColumns } from "../../components/table-columns";
import { useAuth } from "../../context/app-context-provider";

const Trips = () => {
  const { isTripAdded, setIsTripAdded } = useAuth();
  console.log(isTripAdded);

  const apiData: AppServiceProps = {
    path: "trips",
    method: "GET",
  };
  async function fetchTrips() {
    return await APISERVICE(apiData);
  }
  const {
    isLoading,
    data: trips,
    refetch,
    isFetching,
  } = useQuery("trips", fetchTrips);

  useEffect(() => {
    if (isTripAdded) {
      refetch();
      setIsTripAdded(false);
    }
  }, [refetch, isTripAdded, setIsTripAdded]);

  if (isLoading && isFetching) {
    return <AppLoader />;
  }

  return (
    <div className="px-2">
      <DataTable columnDefs={TripColumns} rowData={trips?.data} />
    </div>
  );
};

export default Trips;
