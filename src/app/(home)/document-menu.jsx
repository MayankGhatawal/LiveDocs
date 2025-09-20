import { MoreVertical } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

function DocumentMenu() {
  return (
    <div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <MoreVertical className="size-4" />
      </Button>
    </div>
  );
}

export default DocumentMenu;
