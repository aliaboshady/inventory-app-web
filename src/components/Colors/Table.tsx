"use client";

import {
  PencilSimpleLineIcon,
  TrashIcon,
} from "@phosphor-icons/react/dist/ssr";
import EditColorDialog from "./EditColorDialog";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import { DialogSettings, ServerResponse } from "@/models/shared.model";
import { useTranslation } from "react-i18next";
import { Color, ColorsPayload } from "@/models/color.model";
import ColorCard from "./ColorCard";
import { deleteColor } from "@/actions/colors/deleteColor";
import useRequest from "@/hooks/useRequest";

type Props = {
  data: Color[];
  name: string;
  fetch: (payload: ColorsPayload) => Promise<ServerResponse<Color[]>>;
};

const Table = ({ data, name, fetch }: Props) => {
  const { t } = useTranslation();

  const { request: deleteColorReq } = useRequest<string, ServerResponse<void>>(
    deleteColor,
    {
      showSuccessToast: true,
      successToastMessage: "COLOR_DELETE_SUCCESSFUL",
    }
  );

  const settings: DialogSettings[] = [
    {
      label: t("EDIT"),
      icon: <PencilSimpleLineIcon className="fill-neutral-600" size={18} />,
      dialog: EditColorDialog,
      props: {
        onAction: async () => {
          fetch({ search: name });
        },
      },
    },
    {
      label: t("DELETE"),
      icon: <TrashIcon className="fill-red-600" size={18} />,
      dialog: ConfirmationDialog,
      props: {
        onAction: async (color: Color) => {
          await deleteColorReq(color._id);
          fetch({ search: name });
        },
      },
    },
  ];

  return (
    <div className="w-full overflow-auto flex flex-wrap gap-4">
      {data?.map((color, i) => (
        <ColorCard key={i} color={color} settings={settings} />
      ))}
    </div>
  );
};

export default Table;
