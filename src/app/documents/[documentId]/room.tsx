"use client"

import type { ReactNode } from "react"
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react/suspense"
import { useParams } from "next/navigation"
import { FaSpinner } from "react-icons/fa"

export function Room({ children }: { children: ReactNode }) {
  const params = useParams<{ documentId?: string }>()
  const documentId = params?.documentId

  if (!documentId) return null
  console.log(documentId)

  return (
    <LiveblocksProvider publicApiKey={"pk_dev_CmdGiGM32f44w7kA3--LDlFvd6FBuYtXymBf8L79NEGjmGyqQ0J9gY_KFTxY2Iz2"}>
      <RoomProvider id={documentId}>
        <ClientSideSuspense
          fallback={
            <div className="flex justify-center items-center min-h-screen">
              <FaSpinner className="animate-spin text-7xl text-gray-500" />
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
