import { DropdownLanguage } from "./DropdownLanguage";
import { BellIcon, StarIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";

type Props = {
  role: string;
};

const Navbar = ({ role }: Props) => {
  return (
    <div className="bg-white w-full flex flex-col justify-between h-32 sm:h-20 pt-4 sm:pt-0 items-center">
      <div className="w-full h-full pe-4 flex flex-col sm:flex-row justify-start sm:justify-end items-end sm:items-center gap-4">
        <div className="flex flex-row items-center gap-4 order-2 sm:order-1">
          <Badge
            variant="default"
            className="text-lg gap-2 rounded-full text-nowrap"
          >
            <StarIcon size={18} weight="fill" />
            {role}
          </Badge>

          <button className="bg-secondary p-1.5 rounded-full">
            <BellIcon className="fill-primary" size={25} />
          </button>

          <button className="bg-secondary p-1.5 rounded-full">
            <UserIcon className="fill-primary" size={25} />
          </button>
        </div>

        <div className="order-1 sm:order-2">
          <DropdownLanguage />
        </div>
      </div>

      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
};

export default Navbar;
