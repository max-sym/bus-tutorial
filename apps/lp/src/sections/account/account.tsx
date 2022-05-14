import React from "react"
import {
  Card,
  Text,
  CardHeading,
  CardContent,
  SectionAndOffset,
  Button,
  Separator,
  Modal,
  useModal,
} from "components"
import { data } from "data"
import { useAuthStore } from "store"
import { navigate, Link } from "gatsby"
import { FaUserCircle } from "@react-icons/all-files/fa/FaUserCircle"
import { EditDataModal } from "./edit-data-modal"
import { ChangePasswordModal } from "./change-password-modal"
import { DeleteAccountModal } from "./delete-account-modal"

const UserData = () => {
  const user = useAuthStore(store => store.user)

  const editDataModal = useModal({ customComponent: <EditDataModal /> })
  const deleteAccountModal = useModal({
    customComponent: <DeleteAccountModal />,
  })
  const changePasswordModal = useModal({
    customComponent: <ChangePasswordModal />,
  })

  const onEditDataClick = () => {
    editDataModal.setIsOpen(true)
  }

  const onChangePasswordClick = () => {
    changePasswordModal.setIsOpen(true)
  }

  const onDeleteAccountClick = () => {
    deleteAccountModal.setIsOpen(true)
  }

  if (!user) return null

  return (
    <Card className="mx-auto max-w-[500px]">
      <CardHeading>
        <Text variant="h5" className="text-center">
          {"Account"}
        </Text>
      </CardHeading>
      <CardContent>
        <div>
          <FaUserCircle className="w-16 h-16 mx-auto dark:fill-white fill-gray-500" />
          <div>
            <Text>{"Name: " + user.name}</Text>
            <Text>{"Email: " + user.email}</Text>
          </div>
        </div>
        <Separator className="w-full mt-4" />
        <div className="mt-4 space-y-4">
          <Button onClick={onEditDataClick}>{"Edit Data"}</Button>
          <Button onClick={onChangePasswordClick}>{"Change Password"}</Button>
          <Separator className="w-full mt-4" />
          <Link to="/account/reservations" className="block">
            <Button>{"My Reservations"}</Button>
          </Link>
          <Text variant="button">{"Danger Zone"}</Text>
          <Button onClick={onDeleteAccountClick} color="red">
            {"Delete Account"}
          </Button>
        </div>
        <Modal modal={editDataModal} />
        <Modal modal={changePasswordModal} />
        <Modal modal={deleteAccountModal} />
      </CardContent>
    </Card>
  )
}

export const AccountSection = () => {
  return (
    <SectionAndOffset>
      <UserData />
    </SectionAndOffset>
  )
}
