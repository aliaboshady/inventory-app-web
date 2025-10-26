import Filter from "@/components/admin/Beneficiaries/Filter";
import Table from "@/components/admin/Beneficiaries/Table";

export default async function Beneficiaries() {
  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Filter />
      <Table />
    </div>
  );
}
