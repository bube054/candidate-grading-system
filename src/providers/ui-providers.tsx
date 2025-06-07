'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type UIStore, createUIStore } from '@/stores/ui'

export type UIStoreApi = ReturnType<typeof createUIStore>

export const UIStoreContext = createContext<UIStoreApi | undefined>(
  undefined,
)

export interface UIStoreProviderProps {
  children: ReactNode
}

export const UIStoreProvider = ({
  children,
}: UIStoreProviderProps) => {
  const storeRef = useRef<UIStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createUIStore()
  }

  return (
    <UIStoreContext.Provider value={storeRef.current}>
      {children}
    </UIStoreContext.Provider>
  )
}

export const useUIStore = <T,>(
  selector: (store: UIStore) => T,
): T => {
  const UiStoreContext = useContext(UIStoreContext)

  if (!UiStoreContext) {
    throw new Error(`useUIStore must be used within UIStoreProvider`)
  }

  return useStore(UiStoreContext, selector)
}
