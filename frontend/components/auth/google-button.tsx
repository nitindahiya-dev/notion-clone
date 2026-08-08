"use client";

import { Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GoogleButton() {
  const handleGoogleLogin = () => {
    // OAuth will be connected during the backend phase.
    console.log("Google OAuth will be implemented later.");
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="h-11 w-full"
      onClick={handleGoogleLogin}
    >
      <Globe2 className="mr-2 size-4" />
      Continue with Google
    </Button>
  );
}