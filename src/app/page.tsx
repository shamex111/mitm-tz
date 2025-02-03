import { ProgramStudy } from "@/features/programs/ui";
import { IProduct } from "@/shared/types";

export default async function Home() {
  try {
    const res = await fetch("https://api.moscow.mba/products");
    if (!res.ok) throw new Error("Ошибка загрузки данных");

    const data: IProduct[] = await res.json();
    if (!data || data.length === 0) {
      return <div className="text-center">К сожалению, у нас отсутствуют данные</div>;
    }

    return <ProgramStudy data={data} />;
  } catch (error) {
    console.error(error);
    return (
      <div className="text-center text-red-500">Ошибка загрузки данных</div>
    );
  }
}
