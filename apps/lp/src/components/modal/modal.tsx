import React from "react"
import { Dialog } from "@headlessui/react"
import {
  Card,
  CardContent,
  CardHeading,
  Text,
  CardFooter,
  Button,
} from "components"
import type { ModalType } from "./types"

const ModalContent = ({
  modal,
  onClose,
}: {
  modal: ModalType
  onClose: any
}) => {
  const onOkClick = () => {
    modal?.onOkClick?.()
    onClose()
  }

  const onCancelClick = () => {
    modal?.onCancelClick?.()
    onClose()
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeading>
        <Text>{modal.title}</Text>
      </CardHeading>
      <CardContent>
        <Text>{modal.description}</Text>
      </CardContent>
      <CardFooter>
        <Button onClick={onOkClick}>{"Ok"}</Button>
        <Button color="gray" onClick={onCancelClick}>
          {"Cancel"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export const Modal = ({ modal }: { modal: ModalType }) => {
  const onClose = () => {
    modal.setIsOpen(false)
  }

  return (
    <Dialog
      className="fixed inset-0 z-10 flex items-center justify-center h-screen transition backdrop-blur-md"
      onClose={onClose}
      open={modal.isOpen}
    >
      {!!modal.customComponent ? (
        modal.customComponent
      ) : (
        <ModalContent onClose={onClose} modal={modal} />
      )}
    </Dialog>
  )
}
