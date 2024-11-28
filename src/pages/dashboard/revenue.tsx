import React, { useMemo } from "react";
import { useQuery } from "react-query";
import { APISERVICE, AppServiceProps } from "../../service/app-service";
import AppLoader from "../../components/loader/loader";
import { RevenueColumns } from "../../components/table-columns";
import DataTable from "../../components/data-table/data-table";
import { fomatCurrency } from "../../utils/helper";

const Revenue = () => {
  const apiData: AppServiceProps = {
    method: "GET",
    path: "/revenue/generate",
  };
  async function fetchRevenue() {
    return await APISERVICE(apiData);
  }
  const {
    isLoading,
    data: revenue,
    isFetching,
  } = useQuery("revenue", fetchRevenue);

  const revenueSum = useMemo(() => {
    return revenue?.data?.revenue?.reduce((acc: any, curr: any) => {
      return acc + curr?.revenue;
    }, 0);
  }, [revenue?.data?.revenue]);
  const fuelCost = useMemo(() => {
    return revenue?.data?.revenue?.reduce((acc: any, curr: any) => {
      return acc + curr?.fuelCosts;
    }, 0);
  }, [revenue?.data?.revenue]);
  const maintainenceCost = useMemo(() => {
    return revenue?.data?.revenue?.reduce((acc: any, curr: any) => {
      return acc + curr?.maintenanceCosts;
    }, 0);
  }, [revenue?.data?.revenue]);

  const totalExpenses =
    fuelCost +
    maintainenceCost +
    revenue?.data?.outsideExpenses?.outsideMaintenanceCost +
    revenue?.data?.outsideExpenses?.outsideFuelCost;
  const totalProfit = revenueSum - totalExpenses;
  if (isLoading && isFetching) {
    return <AppLoader />;
  }

  return (
    <div className="px-2">
      <DataTable columnDefs={RevenueColumns} rowData={revenue?.data?.revenue} />

      <div>
        <div className="border flex flex-col mb-44 items-center gap-12 p-2">
          <div className="border w-full bg-muted p-2 flex flex-col gap-2">
            <p className="font-medium">Total Profits</p>
            <p>{fomatCurrency(totalProfit)}</p>
          </div>
          <div className="border w-full bg-muted p-2 flex flex-col gap-2">
            <p className="font-medium">Total Expenses</p>
            <p>{fomatCurrency(totalExpenses)}</p>
          </div>
          <div className="border w-full bg-muted p-2 flex flex-col gap-2">
            <p className="font-medium">Revenue</p>
            <p>{fomatCurrency(revenueSum)}</p>
          </div>
          <div className="border w-full bg-muted p-2 flex flex-col gap-2">
            <p className="font-medium">Fuel Costs</p>
            <p>{fomatCurrency(fuelCost)}</p>
          </div>
          <div className="border w-full bg-muted p-2 flex flex-col gap-2">
            <p className="font-medium">Maintainence Costs</p>
            <p>{fomatCurrency(maintainenceCost)}</p>
          </div>

          <div className="border w-full bg-muted p-2 flex flex-col gap-2">
            <p className="font-medium">Outside Fuel Costs</p>
            <p>
              {fomatCurrency(revenue?.data?.outsideExpenses?.outsideFuelCost)}
            </p>
          </div>
          <div className="border w-full bg-muted p-2 flex flex-col gap-2">
            <p className="font-medium">Outside Maintainence Costs</p>
            <p>
              {fomatCurrency(
                revenue?.data?.outsideExpenses?.outsideMaintenanceCost
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
