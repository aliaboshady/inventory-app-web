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
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogProps } from "@/models/shared.model";
import { User, UserRole } from "@/models/user.model";
import { useTranslation } from "react-i18next";
import { Label } from "./ui/label";
import { useState } from "react";
import { createUser } from "@/actions/users/createUser";
import { editUser } from "@/actions/users/editUser";
import { SidebarMenuButton } from "./ui/sidebar";
import { StarIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import { changeUserPassword } from "@/actions/users/changeUserPassword";

const AdminProfileDialog = ({ me }: { me: User }) => {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState(me?.firstName || "");
  const [lastName, setLastName] = useState(me?.lastName || "");
  const [email, setEmail] = useState(me?.email || "");
  const [password, setPassword] = useState(me?.password || "");
  const [role, setRole] = useState<UserRole>(me?.role || "STAFF");

  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "STAFF", label: "STAFF" },
  ];

  const handleSubmit = async () => {
    setIsLoading(true);

    await editUser({
      _id: me?._id,
      firstName,
      lastName,
      email,
      role: role as UserRole,
    });

    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip={t("PROFILE")}
          className="py-6 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:-translate-x-4 hover:bg-white/10 active:bg-secondary/30"
        >
          <div className="flex items-center gap-2">
            <div className="relative bg-secondary p-1.5 rounded-full">
              <UserIcon className="fill-primary" size={25} />

              {me && me.role === "ADMIN" && (
                <StarIcon
                  className="absolute -top-0.5 -end-0.5 fill-yellow-500"
                  size={16}
                  weight="fill"
                />
              )}
            </div>
            <span className="text-xl text-white text-nowrap">
              {me?.firstName || ""} {me?.lastName || ""}
            </span>
          </div>
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">{t("EDIT_PROFILE")}</DialogTitle>
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

          {me && me.role === "ADMIN" && (
            <div className="flex flex-col gap-2">
              <Label>{t("ROLE")}</Label>
              <Dropdown
                items={roles}
                selected={role}
                placeholder={t("ROLE")}
                setSelected={(val: any) => setRole(val)}
              />
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-row justify-end gap-2">
          <ChangePasswordDialog me={me} />

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

export default AdminProfileDialog;

const ChangePasswordDialog = ({ me }: { me: User }) => {
  const { t } = useTranslation();

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await changeUserPassword({ _id: me._id, password });
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">{t("CHANGE_PASSWORD")}</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px] w-[calc(100%-2rem)] rounded-lg">
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
