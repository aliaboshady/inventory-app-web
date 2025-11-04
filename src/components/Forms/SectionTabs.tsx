import { Button } from "../ui/button";

export const SectionTab = ({
  id,
  title,
  activeId,
  setActiveId,
}: {
  id: number;
  title: string;
  activeId: number;
  setActiveId: (val: number) => void;
}) => {
  return (
    <Button
      variant={id === activeId ? "secondary" : "outline"}
      className="font-normal"
      onClick={() => setActiveId(id)}
    >
      {title}
    </Button>
  );
};

export const SectionPage = ({
  children,
  id,
  activeId,
}: {
  children: React.ReactNode;
  id: number;
  activeId: number;
}) => {
  return (
    id === activeId && (
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">{children}</div>
    )
  );
};
