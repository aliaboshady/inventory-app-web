"use client";

import TextInput from "@/components/TextInput";
import Dropdown from "@/components/Dropdown";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogProps } from "@/models/shared.model";
import { User, UserRole } from "@/models/user.model";
import { useTranslation } from "react-i18next";
import { Label } from "../ui/label";
import { useState } from "react";
import { createUser } from "@/actions/users/createUser";
import { editUser } from "@/actions/users/editUser";

const EditUserDialog = ({
  open,
  setOpen,
  item,
  onAction,
  closeOnAction = true,
}: DialogProps<User>) => {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState(item?.firstName || "");
  const [lastName, setLastName] = useState(item?.lastName || "");
  const [email, setEmail] = useState(item?.email || "");
  const [password, setPassword] = useState(item?.password || "");
  const [role, setRole] = useState<UserRole>(item?.role || "STAFF");

  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "STAFF", label: "STAFF" },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);

    if (item) {
      await editUser({
        _id: item?._id,
        firstName,
        lastName,
        email,
        role: role as UserRole,
      });
    } else {
      await createUser({
        firstName,
        lastName,
        email,
        password,
        role: role as UserRole,
      });
    }

    setIsLoading(false);
    await onAction?.(item);
    if (closeOnAction) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">
            {t(item ? "EDIT_USER" : "ADD_USER")}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
          <TextInput
            label={t("FIRST_NAME")}
            placeholder={t("ENTER_FIRST_NAME")}
            value={firstName}
            setValue={setFirstName}
            className="w-full"
          />

          <TextInput
            label={t("LAST_NAME")}
            placeholder={t("ENTER_LAST_NAME")}
            value={lastName}
            setValue={setLastName}
            className="w-full"
          />

          <TextInput
            label={t("EMAIL")}
            placeholder={t("ENTER_EMAIL")}
            value={email}
            setValue={setEmail}
            className="w-full"
          />

          {!item && (
            <TextInput
              label={t("PASSWORD")}
              placeholder={t("ENTER_PASSWORD")}
              value={password}
              setValue={setPassword}
              className="w-full"
              isPassword
            />
          )}

          <div className="flex flex-col gap-2">
            <Label>{t("ROLE")}</Label>
            <Dropdown
              items={roles}
              selected={role}
              placeholder={t("ROLE")}
              setSelected={(val: any) => setRole(val)}
            />
          </div>
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose disabled={isLoading} asChild>
            <Button variant="secondary">{t("CANCEL")}</Button>
          </DialogClose>

          <Button disabled={isLoading} onClick={handleSubmit} type="submit">
            {t(item ? "EDIT" : "ADD")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserDialog;
