import FormLayout from "@/components/Forms/FormLayout";

export default async function EditSession({
  params,
}: {
  params: { sessionId: string };
}) {
  const { sessionId } = await params;

  return <FormLayout title="Edit SESSION" />;
}
