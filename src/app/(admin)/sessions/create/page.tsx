import FormLayout from "@/components/Forms/FormLayout";
import SessionDetailsForm from "@/components/Forms/SessionDetailsForm";

export default async function CreateSession() {
  return (
    <FormLayout title="SESSIONS">
      <SessionDetailsForm />
    </FormLayout>
  );
}
