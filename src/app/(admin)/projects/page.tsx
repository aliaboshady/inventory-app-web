import Filter from "@/components/admin/Projects/Filter";
import Table from "@/components/admin/Projects/Table";
import PageLayout from "@/components/PageLayout";

export default async function Projects() {
  return (
    <PageLayout title="PROJECTS">
      <Filter />
      <Table />
    </PageLayout>
  );
}
