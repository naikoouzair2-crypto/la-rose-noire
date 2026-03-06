import CarScroll from "@/components/CarScroll";
import ExtraDetails from "@/components/ExtraDetails";

export default function Home() {
  return (
    <main className="bg-[#0a0a0a] min-h-screen selection:bg-crimson selection:text-white">
      <CarScroll />
      <ExtraDetails />
    </main>
  );
}
