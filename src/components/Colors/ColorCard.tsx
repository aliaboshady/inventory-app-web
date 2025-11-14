"use client";

import { Color } from "@/models/color.model";
import { Input } from "../ui/input";
import TableSettings from "../Table/TableSettings";
import { DialogSettings } from "@/models/shared.model";

const ColorCard = ({
  color,
  settings,
}: {
  color: Color;
  settings: DialogSettings[];
}) => {
  return (
    <div className="h-fit flex flex-row items-center gap-4 border rounded-md p-2">
      <Input
        type="color"
        className="w-20 p-0 border-none pointer-events-none"
        value={color?.color || "#000000"}
        readOnly
      />

      <p className="text-nowrap">{color?.name}</p>

      <TableSettings settings={settings} item={color} />
    </div>
  );
};

export default ColorCard;
