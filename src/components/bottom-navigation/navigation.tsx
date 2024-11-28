import { Link, useLocation } from "react-router-dom";
import { Plus } from "lucide-react";
import { appMenu } from "../../routers/app-router";
import { Sheet, SheetTrigger } from "../ui/sheet";
import BottomSheet from "../bottom-sheet/bottom-sheet";
import AddTrip from "../../pages/dashboard/add-trip";
import { useState } from "react";

export default function NavigationMenu() {
  const location = useLocation();
  const [open, setOpen] = useState<boolean>(false);

  const onOpen = () => setOpen(!open);

  return (
    <nav className="fixed font-custom bottom-0 left-0 right-0 z-50 flex h-14 w-full items-center justify-around bg-background shadow-t">
      {appMenu.map((menu) =>
        menu.name ? (
          <Link
            key={menu.to}
            to={menu.to ?? ""}
            className={`flex p-1 flex-col items-center justify-center gap-1 text-primary transition-colors hover:text-gray-900 focus:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:text-gray-50 ${
              location.pathname === menu.match &&
              "border-t-primary p-1 border-t-2 delay-75 transition-all"
            }`}
          >
            {menu.icon}
            <span className={`text-xs `}>{menu.name}</span>
          </Link>
        ) : (
          <Sheet>
            <SheetTrigger>
              <div
                onClick={() => onOpen()}
                role="button"
                className="flex bg-muted mb-2 rounded-sm flex-col items-center justify-center gap-1 text-primary transition-colors hover:text-gray-900 focus:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 dark:focus:text-gray-50"
              >
                <Plus className="h-12 w-12" strokeWidth={2.2} />
              </div>
            </SheetTrigger>
          </Sheet>
        )
      )}
      <BottomSheet
        children={<AddTrip onClose={onOpen} />}
        onOpen={onOpen}
        onClose={onOpen}
        open={open}
        title="Add Trip"
      />
    </nav>
  );
}
