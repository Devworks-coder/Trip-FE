import React from "react";
import { AuthData, useAuth } from "../../context/app-context-provider";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { LogOut } from "lucide-react";

const Account = () => {
  const { authData }: { authData: AuthData } = useAuth();
  const { logoutAction } = useAuth();
  const {
    user: { email, username },
  } = authData;

  return (
    <div className="relative">
      <div className="flex items-center flex-col gap-4">
        <Avatar className="h-28 w-28">
          <AvatarFallback className="text-5xl">
            {username?.[0].toUpperCase()}
            {username?.[1].toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <span className="text-sm text-muted-foreground">{email}</span>
        <Button
          onClick={logoutAction}
          variant={"link"}
          className="text-red-600"
        >
          Logout <LogOut size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Account;
