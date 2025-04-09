
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, LogOut } from "lucide-react";

export function ProfileButton() {
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut();
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) {
    return (
      <Button asChild variant="outline" className="border-amber-700/50 text-amber-300 hover:bg-amber-900/20">
        <Link to="/auth">
          <UserCircle className="mr-2 h-4 w-4" />
          Sign In
        </Link>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-amber-700/50 text-amber-300 hover:bg-amber-900/20">
          <UserCircle className="mr-2 h-4 w-4" />
          {user.email?.split('@')[0] || 'User'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-slate-800 border-amber-900/30 text-slate-100">
        <DropdownMenuItem className="text-slate-300 cursor-default">
          Signed in as:<br />
          <span className="font-medium text-amber-300">{user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-amber-900/20" />
        <DropdownMenuItem 
          disabled={isLoggingOut}
          onClick={handleSignOut}
          className="text-red-400 focus:text-red-300 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? 'Signing out...' : 'Sign out'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
