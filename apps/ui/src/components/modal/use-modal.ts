import { useState, useMemo, useCallback } from "react"
import type { ModalType } from "./types"

export const useModal = ({
  customComponent,
  title,
  description,
  onOkClick,
  onCancelClick,
}: {
  customComponent?: any
  title?: string
  description?: string
  onOkClick?: any
  onCancelClick?: any
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const onClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const result = useMemo<ModalType>(
    () => ({
      isOpen,
      setIsOpen,
      customComponent,
      onClose,
      onOkClick,
      onCancelClick,
      title,
      description,
    }),
    [
      isOpen,
      setIsOpen,
      customComponent,
      onClose,
      onOkClick,
      onCancelClick,
      title,
      description,
    ]
  )

  return result
}
