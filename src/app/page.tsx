import { IProduct, ProgramStudy } from "@/features/programs/ui";

export default async function Home() {
  try {
    const res = await fetch("https://api.moscow.mba/products");
    if (!res.ok) throw new Error("Ошибка загрузки данных");

    const data: IProduct[] = await res.json();
    return <ProgramStudy data={data} />;
  } catch (error) {
    console.error(error);
    return (
      <div className="text-center text-red-500">Ошибка загрузки данных</div>
    );
  }
}
