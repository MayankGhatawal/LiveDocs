"use client";

import React from "react";
import { Room } from "./room";
import { Toolbar } from "./toolbar";
import { Editor } from "./editor";
import Navbar from "./navbar";
import { useParams } from "next/navigation";

const DocumentIdPage = () => {
  const params = useParams();
  const documentId = params?.documentId as string;

  if (!documentId) {
    return <div>Invalid document ID</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden h-[112px]">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Room>
          <Editor />
        </Room>
      </div>
    </div>
  );
};

export default DocumentIdPage;
