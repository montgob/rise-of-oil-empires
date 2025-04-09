
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";

export function ProfileButton() {
  return (
    <Button variant="outline" className="border-amber-700/50 text-amber-300 hover:bg-amber-900/20">
      <UserCircle className="mr-2 h-4 w-4" />
      Guest User
    </Button>
  );
}
