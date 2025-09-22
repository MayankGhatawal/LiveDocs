"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({
  children,
  documentId,
}: {
  children: ReactNode;
  documentId: string;
}) {
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_CmdGiGM32f44w7kA3--LDlFvd6FBuYtXymBf8L79NEGjmGyqQ0J9gY_KFTxY2Iz2"
      }
    >
      <RoomProvider id={documentId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
