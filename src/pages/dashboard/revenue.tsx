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
          <div className="border w-full p-2 flex flex-col gap-2 bg-green-400/20">
            <p className="font-semibold text-green-800">Total Profits</p>
            <p className="text-green-800">{fomatCurrency(totalProfit)}</p>
          </div>
          <div className="border w-full p-2 flex flex-col gap-2 bg-red-700/20">
            <p className="font-semibold text-red-800">Total Expenses</p>
            <p className="text-red-800">{fomatCurrency(totalExpenses)}</p>
          </div>
          <div className="border w-full p-2 flex flex-col gap-2 bg-blue-600/20">
            <p className="font-semibold text-blue-600">Revenue</p>
            <p className="text-blue-600">{fomatCurrency(revenueSum)}</p>
          </div>
          <div className="border w-full bg-sky-600/20 p-2 flex flex-col gap-2">
            <p className="font-semibold  text-sky-600">Fuel Costs</p>
            <p className="text-sky-600">{fomatCurrency(fuelCost)}</p>
          </div>
          <div className="border bg-violet-600/20 w-full p-2 flex flex-col gap-2">
            <p className="font-semibold text-violet-600">Maintainence Costs</p>
            <p className="text-violet-600">{fomatCurrency(maintainenceCost)}</p>
          </div>

          <div className="border w-full bg-yellow-400/20 p-2 flex flex-col gap-2">
            <p className="font-semibold text-yellow-500">Outside Fuel Costs</p>
            <p className="text-yellow-500">
              {fomatCurrency(revenue?.data?.outsideExpenses?.outsideFuelCost)}
            </p>
          </div>
          <div className="bg-lime-200/20 border w-full p-2 flex flex-col gap-2">
            <p className="font-semibold text-lime-700">
              Outside Maintainence Costs
            </p>
            <p className="text-lime-700">
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
