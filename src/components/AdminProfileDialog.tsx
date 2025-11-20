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
import { EditUserPayload, User, UserRole } from "@/models/user.model";
import { useTranslation } from "react-i18next";
import { Label } from "./ui/label";
import { useState } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import { StarIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import { updateMe } from "@/actions/users/updateMe";
import { changeMePassword } from "@/actions/users/changeMePassword";
import UploadPicture from "./UploadPicture";
import useRequest from "@/hooks/useRequest";
import Image from "next/image";
import { ServerResponse } from "@/models/shared.model";

const AdminProfileDialog = ({ me }: { me: User }) => {
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState(me?.firstName || "");
  const [lastName, setLastName] = useState(me?.lastName || "");
  const [email, setEmail] = useState(me?.email || "");
  const [role, setRole] = useState<UserRole>(me?.role || "STAFF");
  const [picture, setPicture] = useState<File>();

  const roles = [
    { value: "ADMIN", label: "ADMIN" },
    { value: "STAFF", label: "STAFF" },
  ];

  const { request: updateMeReq, isLoading } = useRequest<
    EditUserPayload,
    ServerResponse<User>
  >(updateMe);

  const handleSubmit = async () => {
    await updateMeReq({
      _id: me?._id,
      firstName,
      lastName,
      email,
      role: role as UserRole,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton
          tooltip={t("PROFILE")}
          className="py-6 group-data-[collapsible=icon]:p-2 ltr:group-data-[collapsible=icon]:-translate-x-4 rtl:group-data-[collapsible=icon]:translate-x-4 hover:bg-white/10 active:bg-secondary/30"
        >
          <div className="flex items-center gap-2 ltr:-translate-x-1 rtl:translate-x-1">
            <div className="flex justify-center items-center relative bg-neutral-300 rounded-full w-10 h-10">
              {me?.imageURL ? (
                <div className="relative w-full h-full overflow-hidden rounded-full">
                  <Image
                    src={me?.imageURL}
                    alt="Profile preview"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <UserIcon size={25} />
              )}

              {me && me.role === "ADMIN" && (
                <StarIcon
                  className="absolute -top-0.5 -end-1 fill-yellow-500"
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

      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] rounded-lg overflow-auto">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">{t("EDIT_PROFILE")}</DialogTitle>
        </DialogHeader>

        <UploadPicture
          id={me?._id}
          imageURL={me?.imageURL}
          picture={picture}
          setPicture={setPicture}
          type="user"
        />

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

        <DialogFooter className="flex flex-col sm:flex-row justify-end gap-2">
          <ChangePasswordDialog me={me} />

          <div className="flex flex-row justify-end gap-2">
            <DialogClose disabled={isLoading} asChild>
              <Button variant="secondary">{t("CANCEL")}</Button>
            </DialogClose>

            <DialogClose disabled={isLoading} asChild>
              <Button disabled={isLoading} onClick={handleSubmit} type="submit">
                {t("SUBMIT")}
              </Button>
            </DialogClose>
          </div>
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
    await changeMePassword(password);
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

          <DialogClose disabled={isLoading} asChild>
            <Button disabled={isLoading} onClick={handleSubmit} type="submit">
              {t("SUBMIT")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
