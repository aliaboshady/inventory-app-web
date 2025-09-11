import noData from "../../../../public/animations/no-data.json";
import { LottiePlayer } from "@/components/LottiePlayer";

export default async function Dashboard() {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <LottiePlayer animation={noData} className="w-96" />
        <p className="text-xl font-medium">No data yet!</p>
      </div>
    </div>
  );
}
