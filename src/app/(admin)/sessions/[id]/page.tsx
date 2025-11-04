import FormLayout from "@/components/Forms/FormLayout";

export default async function EditSession({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return <FormLayout title="Edit SESSION" />;
}
