import { toast } from "sonner";

type ShowToastType = {
  status: "success" | "warning" | "info" | "error";
  description: string;
};
export const displayToast = (props: ShowToastType) => {
  const { status, description } = props;
  switch (status) {
    case "success":
      toast.success(description);
      break;
    case "error":
      toast.error(description);
      break;
    case "warning":
      toast.warning(description);
      break;
    case "info":
      toast.info(description);
      break;
    default:
      toast(description);
      break;
  }
};
