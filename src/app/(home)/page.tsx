"use client";

import React from "react";
import { Navbar } from "./navbar";
import { TemplateGallery } from "./templates-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./document-table";

function Home() {
  const {results, status, loadMore} = usePaginatedQuery(api.documents.get, {}, { initialNumItems: 5 });
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <div className="p-4 space-y-2">
          <DocumentsTable 
          loadMore={loadMore}
          documents={results}
          status={status}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
