import { FC, useEffect, useState } from "react";
import cn from "classnames";
import InfoCards from "./infoCards";

interface Skill {
  id: string;
  title: string;
}

interface SpecializedSubject {
  skills?: Skill[];
}

interface Product {
  id: string;
  title: string;
  specializedSubjects: SpecializedSubject[];
}

export const ProgramStudy: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [openModules, setOpenModules] = useState<{ [key: string]: boolean }>( {});

  useEffect(() => {
    const handleResize = () => {
      const isScreenMobile = window.innerWidth <= 768;
      setIsMobile(isScreenMobile);

      if (!isScreenMobile) {
        setOpenModules({});
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://api.moscow.mba/products");
        if (!res.ok) throw new Error("Ошибка загрузки данных");

        const data: Product[] = await res.json();
        setProducts(
          data
            .filter((p) => {
              if (p.specializedSubjects.length === 0) return false;
              let qty = 0;
              p.specializedSubjects.forEach((s) => (qty += s.skills?.length || 0));
              if (qty < 2) return false;
              return true;
            })
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleModule = (productId: string, module: number) => {
    if (!isMobile) return;
    setOpenModules((prev) => ({
      ...prev,
      [`${productId}-${module}`]: !prev[`${productId}-${module}`],
    }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col space-y-[89px]">
      <div className="mx-auto w-fit text-black xl:font-[700] xl:text-[36px] font-[500] text-[28px]">
        Специализированные дисциплины
      </div>
      <div className="flex flex-col mx-auto w-fit space-y-[62px]">
        {products.map((p) => {
          const allSkills = p.specializedSubjects.flatMap((s) => s.skills || []);
          const midIndex = Math.ceil(allSkills.length / 2);

          return (
            <div key={p.id} className="flex flex-col space-y-[54px]">
              <div className="text-[26px] font-bold xl:m-0 m-auto">
                {p.title}
              </div>
              <div className="flex xl:flex-row flex-col xl:space-x-[45px]">
                {[1, 2].map((module) => {
                  const skills =
                    module === 1 ? allSkills.slice(0, midIndex) : allSkills.slice(midIndex);
                  return (
                    <div key={module} className="xl:flex xl:flex-row flex-col xl:space-x-[80px] space-y-[5px]">
                      <div
                        className="cursor-pointer"
                        onClick={() => toggleModule(p.id, module)}
                      >
                        <div
                          className={cn(
                            "text-[32px] font-[400] xl:border-t-[2px] pt-[30px]",
                            {
                              "border-t-[#FF3535]": !isMobile,
                              "m-5 p-2": isMobile,
                              "bg-[#FF3535] text-white": isMobile && openModules[`${p.id}-${module}`],
                              "bg-[#f7f7f7]": isMobile && !openModules[`${p.id}-${module}`],
                            }
                          )}
                        >
                          {isMobile && (
                            <span
                              className={cn({
                                "text-white": openModules[`${p.id}-${module}`],
                                "text-[#d9d9d9]": !openModules[`${p.id}-${module}`],
                              })}
                            >
                              {openModules[`${p.id}-${module}`] ? "- " : "+ "}
                            </span>
                          )}
                          {module} модуль
                        </div>
                      </div>
                      {(openModules[`${p.id}-${module}`] || !isMobile) && (
                        <ul className="flex flex-col w-[373px] my-[10px]">
                          {skills.map((skill) => (
                            <li
                              key={skill.id}
                              className="ml-10"
                              style={{
                                listStyleType: "disc",
                                color: "#FF3535",
                              }}
                            >
                              <div className="text-black">{skill.title}</div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <InfoCards />
    </div>
  );
};

export default ProgramStudy;
