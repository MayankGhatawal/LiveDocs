"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams<{ documentId?: string }>();
  const documentId = params?.documentId;

  if (!documentId) return null;
  console.log(documentId);
  
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_CmdGiGM32f44w7kA3--LDlFvd6FBuYtXymBf8L79NEGjmGyqQ0J9gY_KFTxY2Iz2"}>
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}