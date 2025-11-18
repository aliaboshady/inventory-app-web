"use client";

import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { CircleNotchIcon, QrCodeIcon } from "@phosphor-icons/react/dist/ssr";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import Dropdown from "../Dropdown";
import { EditItemPayload, Item, ItemStatus } from "@/models/item.model";
import { useTranslation } from "react-i18next";
import useRequest from "@/hooks/useRequest";
import { editItem } from "@/actions/items/editItem";

type Props = {
  item: Item;
  onAction?: () => void;
};

const QRCodeDialog = ({ item, onAction }: Props) => {
  const { t } = useTranslation();
  const qrRef = useRef<HTMLCanvasElement | null>(null);
  const qrValue = `http://localhost:3000?id=${item?._id}`;
  const [status, setStatus] = useState<ItemStatus>(item?.status || "UNKNOWN");

  const { request: editItemReq, isLoading } = useRequest<EditItemPayload, Item>(
    editItem,
    {
      showSuccessToast: true,
      successToastMessage: "ITEM_EDIT_SUCCESSFUL",
    }
  );

  const handleSubmit = async () => {
    await editItemReq({ _id: item?._id, status });
    onAction?.();
  };

  const handleDownload = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    a.click();
  };

  const statuses = [
    {
      value: "IN_WAREHOUSE",
      label: "IN_WAREHOUSE",
    },
    {
      value: "OUT_OF_WAREHOUSE",
      label: "OUT_OF_WAREHOUSE",
    },
    {
      value: "UNKNOWN",
      label: "UNKNOWN",
    },
  ];

  return (
    <Dialog>
      <DialogTrigger className="w-full h-10">
        <QrCodeIcon className="w-full h-full" />
      </DialogTrigger>

      <DialogContent className="flex flex-col items-center justify-center gap-6 w-[calc(100%-2rem)] sm:max-w-[425px] rounded-lg">
        <DialogTitle className="text-xl">QR Code</DialogTitle>
        <p className="text-nowrap truncate w-full text-center">{item?._id}</p>
        <p className="text-nowrap truncate w-full text-center">{item?.name}</p>

        <div className="relative">
          <QRCodeCanvas
            ref={qrRef}
            value={qrValue}
            size={220}
            bgColor="#ffffff"
            fgColor="#000000"
            level="H"
          />

          {isLoading && (
            <div className="absolute top-0 bottom-0 start-0 end-0 bg-black/50 flex justify-center items-center">
              <CircleNotchIcon className="animate-spin w-32 h-32 p-4 text-white" />
            </div>
          )}
        </div>

        <Button disabled={isLoading} onClick={handleDownload}>
          {t("DOWNLOAD")}
        </Button>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-end w-full">
          <div className="flex flex-col gap-2 w-full">
            <Label>{t("STATUS")}</Label>
            <Dropdown
              items={statuses}
              selected={status}
              setSelected={(val: any) => setStatus(val)}
              placeholder="STATUS"
            />
          </div>

          <Button disabled={isLoading} onClick={handleSubmit} className="h-12">
            {t("SUBMIT")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRCodeDialog;
