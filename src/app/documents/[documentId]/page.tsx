import React from "react";

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
    <div>
      Document ID: {documentId}
    </div>
  );
};

export default DocumentIdPage;
