import moment from "moment";
export function fomatCurrency(amount: number) {
  return Intl.NumberFormat("EN", {
    style: "currency",
    currency: "INR",
  }).format(amount);
}

export const formatDate = (date: string) => {
  return moment(date, "DD/MM/YYYY").format("MMM Do YY") ?? undefined;
};
