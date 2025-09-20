import { ExternalLinkIcon, MoreVertical } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface DocumentMenuProps {
    documentId: import("../../../convex/_generated/dataModel").Id<"documents">;
    title: string;
    onNewTab: (id: import("../../../convex/_generated/dataModel").Id<"documents">) => void
}

function DocumentMenu({documentId, title, onNewTab}: DocumentMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="rounded-full">
        <MoreVertical className="size-4" />
        
      </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="size-4" />
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DocumentMenu;
