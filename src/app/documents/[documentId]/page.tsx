import React from "react";
import { Editor } from "./editor";
import { Toolbar } from "./toolbar";

interface DocumentPageProps {
  params: {
    documentId: string;
  };
}

const DocumentIdPage = ({ params }: DocumentPageProps) => {
  const documentId = Number(params.documentId);

  if (isNaN(documentId)) {
    return <div>Error: Invalid Document ID</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar />
      <Editor />
    </div>
  );
};

export default DocumentIdPage;
