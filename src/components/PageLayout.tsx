import { BellIcon, StarIcon, UserIcon } from "@phosphor-icons/react/dist/ssr";
import { Badge } from "@/components/ui/badge";
import { Separator } from "./ui/separator";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full px-20 py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-row justify-between items-center">
        <p className="bg-white w-full text-3xl font-semibold">Dashboard</p>

        <div className="flex flex-row gap-4">
          <Badge
            variant="default"
            className="text-lg gap-2 rounded-full text-nowrap"
          >
            <StarIcon size={18} weight="fill" />
            Super admin
          </Badge>

          <button className="bg-secondary p-1.5 rounded-full">
            <BellIcon className="fill-primary" size={25} />
          </button>

          <button className="bg-secondary p-1.5 rounded-full">
            <UserIcon className="fill-primary" size={25} />
          </button>
        </div>
      </div>

      <Separator />

      <div className="bg-white w-full p-4 flex-1 border rounded-2xl flex">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
