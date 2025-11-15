import { getColors } from "@/actions/colors/getColors";
import ItemsPage from "@/components/Items/ItemsPage";

export default async function Items() {
  const colors = await getColors({});

  return <ItemsPage colors={colors} />;
}
