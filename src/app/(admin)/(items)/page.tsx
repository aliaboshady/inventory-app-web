import { getCategoriesSimpleList } from "@/actions/categories/getCategoriesSimpleList";
import { getColors } from "@/actions/colors/getColors";
import ItemsPage from "@/components/Items/ItemsPage";

export default async function Items() {
  const colors = await getColors({});
  const categories = await getCategoriesSimpleList();

  return <ItemsPage colors={colors?.data} categories={categories?.data} />;
}
