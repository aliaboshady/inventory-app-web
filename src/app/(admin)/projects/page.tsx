import Filter from "@/components/users/Projects/Filter";
import Table from "@/components/users/Projects/Table";
import PageLayout from "@/components/PageLayout";

export default async function Projects() {
  return (
    <PageLayout title="PROJECTS">
      <Filter />
      <Table />
    </PageLayout>
  );
}
