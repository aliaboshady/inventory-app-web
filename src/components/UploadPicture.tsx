import Image from "next/image";
import useRequest from "@/hooks/useRequest";
import { CircleNotchIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useTranslation } from "react-i18next";
import { User } from "@/models/user.model";
import { UploadFilePayload, UploadType } from "@/models/shared.model";
import { uploadFile } from "@/actions/upload/uploadFile";

type Props = {
  me: User;
  type: UploadType;
  picture: File;
  setPicture: (file: File) => void;
};

const UploadPicture = ({ me, type, picture, setPicture }: Props) => {
  const { t } = useTranslation();

  const { request: uploadPicture, isLoading: uploadLoading } = useRequest<
    UploadFilePayload,
    void
  >(uploadFile);

  const handlePictureFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setPicture(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!picture) return;
    await uploadPicture({ file: picture, type, id: me?._id });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative overflow-hidden bg-neutral-300 w-60 h-60 rounded-full flex justify-center items-center">
        {picture || me?.imageURL ? (
          <Image
            src={picture ? URL.createObjectURL(picture) : me?.imageURL}
            alt="Profile preview"
            fill
            className="object-contain"
          />
        ) : (
          <UserIcon className="w-full h-full p-4 text-black" />
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
