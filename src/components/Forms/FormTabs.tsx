export const FormTab = ({
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
    <div className="flex flex-col gap-2 justify-center items-center">
      <button
        onClick={() => setActiveId(id)}
        className={`rounded-full bg-white p-1 w-10 h-10 ${
          activeId === id ? "border shadow-md" : ""
        }`}
      >
        <div
          className={`rounded-full ${
            activeId === id ? "bg-primary" : "bg-white border-2"
          } w-full h-full flex justify-center items-center`}
        >
          <p className={`${activeId === id ? "text-white" : "text-black"}`}>
            {id}
          </p>
        </div>
      </button>

      <p
        className={`${
          activeId === id ? "text-primary" : "text-neutral-400"
        } text-xs font-medium text-nowrap`}
      >
        {title}
      </p>
    </div>
  );
};

export const FormPage = ({
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
      <div className="bg-white w-full sm:min-h-[calc(100vh-21.5rem)] flex flex-col gap-4 shadow-md p-4 border rounded-2xl">
        {children}
      </div>
    )
  );
};
