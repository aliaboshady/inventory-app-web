import Filter from "@/components/users/Users/Filter";
import Table from "@/components/users/Users/Table";
import PageLayout from "@/components/PageLayout";

export default async function Users() {
  return (
    <PageLayout title="USERS">
      <Filter />
      <Table />
    </PageLayout>
  );
}
