"use client";

import FileDropzone from "@/components/FileDropzone";
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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DialogProps } from "@/model/shared.models";
import { User } from "@/model/user.models";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const AddBeneficiaryDialog = ({ open, setOpen, item }: DialogProps<User>) => {
  const { t } = useTranslation();
  const [type, setType] = useState("individual");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[800px] w-[calc(100%-2rem)] rounded-lg">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl">Add beneficiary</DialogTitle>

          <RadioGroup
            defaultValue="individual"
            value={type}
            onValueChange={setType}
            className="flex flex-row gap-6 !mt-3"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="individual" id="r1" />
              <Label htmlFor="r1">Individual</Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem value="group" id="r2" />
              <Label htmlFor="r2">Group</Label>
            </div>
          </RadioGroup>
        </DialogHeader>

        {type === "individual" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
            <TextInput
              label={t("Username / case management number")}
              placeholder={t("Enter Username / case management number")}
              value={""}
              setValue={() => {}}
              className="w-full"
            />

            <TextInput
              label={t("Beneficiary Name")}
              placeholder={t("Enter Beneficiary Name")}
              value={""}
              setValue={() => {}}
              className="w-full"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 py-5">
            <div className="border p-3 rounded-lg flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-1">
                <Image alt="" src="/images/excel.png" width={25} height={35} />
                <p className="text-[12px] font-medium">Accounts Template</p>
              </div>

              <Button variant="secondary">Download</Button>
            </div>

            <FileDropzone />
          </div>
        )}

        <DialogFooter className="flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>

          <Button type="submit">Edit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddBeneficiaryDialog;
