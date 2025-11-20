import Image from "next/image";
import useRequest from "@/hooks/useRequest";
import {
  ArmchairIcon,
  CircleNotchIcon,
  UserIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useTranslation } from "react-i18next";
import {
  ServerResponse,
  UploadFilePayload,
  UploadType,
} from "@/models/shared.model";
import { uploadFile } from "@/actions/upload/uploadFile";

type Props = {
  id: string;
  imageURL: string;
  type: UploadType;
  picture: File;
  setPicture: (file: File) => void;
  onUpload?: () => void;
};

const UploadPicture = ({
  id,
  imageURL,
  type,
  picture,
  setPicture,
  onUpload,
}: Props) => {
  const { t } = useTranslation();

  const { request: uploadPicture, isLoading: uploadLoading } = useRequest<
    UploadFilePayload,
    ServerResponse<void>
  >(uploadFile, { showSuccessToast: true });

  const handlePictureFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPicture(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!picture) return;
    await uploadPicture({ file: picture, type, id });
    onUpload?.();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative overflow-hidden bg-neutral-300 w-60 h-60 rounded-full flex justify-center items-center">
        {picture || imageURL ? (
          <Image
            src={picture ? URL.createObjectURL(picture) : imageURL}
            alt="Profile preview"
            fill
            className="object-contain"
          />
        ) : type === "user" ? (
          <UserIcon className="w-full h-full p-4 text-black" />
        ) : (
          <ArmchairIcon className="w-full h-full p-4 text-black" />
        )}

        {uploadLoading && (
          <CircleNotchIcon className="absolute animate-spin w-32 h-32 p-4 text-white" />
        )}
      </div>

      <div className="w-full flex flex-col gap-2">
        <Label>{t("PROFILE_PHOTO")}</Label>
        <div className="flex flex-row gap-2">
          <Input
            type="file"
            accept="image/*"
            disabled={uploadLoading}
            onChange={handlePictureFileChange}
          />

          <Button disabled={!picture || uploadLoading} onClick={handleUpload}>
            {t("UPLOAD")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UploadPicture;
