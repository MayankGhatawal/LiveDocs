import React from "react";
import { Doc } from "../../../convex/_generated/dataModel";
import { TableCell, TableRow } from "@/components/ui/table";
import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon, MoreVertical } from "lucide-react";
import {format} from "date-fns"
import DocumentMenu from "./document-menu";

interface DocumentRowProps {
  document: Doc<"documents">;
}

function DocumentRow({ document }: DocumentRowProps) {
  return (
    <TableRow className="cursor-pointer">
      <TableCell className="w-[50px]">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>

      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md: flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="justify-end flex">
        <DocumentMenu />
      </TableCell>
    </TableRow>
  );
}

export default DocumentRow;
