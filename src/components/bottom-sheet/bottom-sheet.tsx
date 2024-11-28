import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";

type BottomSheetTypes = {
  title: string;
  children: React.ReactNode;
  onOpen: () => void;
  open: boolean;
  onClose?: () => void;
};
const BottomSheet = (props: BottomSheetTypes) => {
  return (
    <Sheet open={props.open} onOpenChange={props.onOpen}>
      <SheetContent className="flex flex-col" side={"right"}>
        <SheetHeader>
          <SheetTitle>{props.title}</SheetTitle>
        </SheetHeader>
        <div className="overflow-auto p-2">{props.children}</div>
      </SheetContent>
    </Sheet>
  );
};

export default BottomSheet;
