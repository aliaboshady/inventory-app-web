"use client";

import TextInput from "@/components/TextInput";
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
import { ChangeUserPasswordPayload, User } from "@/models/user.model";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { changeUserPassword } from "@/actions/users/changeUserPassword";
import useRequest from "@/hooks/useRequest";

const ChangeUserPasswordDialog = ({
  open,
  setOpen,
  item,
  onAction,
  closeOnAction = true,
}: DialogProps<User>) => {
  const { t } = useTranslation();

  const [password, setPassword] = useState("");

  const { request: changeUserPasswordReq, isLoading } = useRequest<
    ChangeUserPasswordPayload,
    User
  >(changeUserPassword);

  const handleSubmit = async () => {
    await changeUserPasswordReq({ _id: item._id, password });
    await onAction?.(item);
    if (closeOnAction) setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">{t("CHANGE_PASSWORD")}</DialogTitle>
        </DialogHeader>

        <TextInput
          label={t("NEW_PASSWORD")}
          placeholder={t("ENTER_NEW_PASSWORD")}
          value={password}
          setValue={setPassword}
          className="w-full"
          isPassword
        />

        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose disabled={isLoading} asChild>
            <Button variant="secondary">{t("CANCEL")}</Button>
          </DialogClose>

          <Button disabled={isLoading} onClick={handleSubmit} type="submit">
            {t("SUBMIT")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeUserPasswordDialog;
