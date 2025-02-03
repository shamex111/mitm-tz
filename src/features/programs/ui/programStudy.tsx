"use client";
import { FC, useState } from "react";
import cn from "classnames";
import InfoCards from "./infoCards";
import { useNormalizeProducts } from "../hooks";
import { useResize } from "../hooks/useResize";
import { IProduct, ISkill, ISpecializedSubject } from "@/shared/types";

interface IProgramStudy {
  data: IProduct[];
}

export const ProgramStudy: FC<IProgramStudy> = ({ data }) => {
  const [openModules, setOpenModules] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { normalizeData } = useNormalizeProducts(data);

  const { isMobile } = useResize();
  const toggleModule = (productId: string, module: number) => {
    if (!isMobile) return;
    setOpenModules((prev) => ({
      ...prev,
      [`${productId}-${module}`]: !prev[`${productId}-${module}`],
    }));
  };

  return (
    <div className="flex flex-col space-y-[89px]">
      <div className="mx-auto w-fit text-black xl:font-[700] xl:text-[36px] font-[500] text-[28px]">
        Специализированные дисциплины
      </div>
      <div className="flex flex-col mx-auto w-fit space-y-[62px]">
        {normalizeData.map((p) => {
          const allSkills = p.specializedSubjects.flatMap(
            (s: ISpecializedSubject) => s.skills || []
          );
          const midIndex = Math.ceil(allSkills.length / 2);

          return (
            <div key={p.id} className="flex flex-col space-y-[54px]">
              <div className="text-[26px] font-bold xl:m-0 m-auto">
                {p.title}
              </div>
              <div className="flex xl:flex-row flex-col xl:space-x-[45px]">
                {[1, 2].map((module) => {
                  const skills =
                    module === 1
                      ? allSkills.slice(0, midIndex)
                      : allSkills.slice(midIndex);
                  return (
                    <div
                      key={module}
                      className="xl:flex xl:flex-row flex-col xl:space-x-[80px] space-y-[5px]"
                    >
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
                              "bg-[#FF3535] text-white":
                                isMobile && openModules[`${p.id}-${module}`],
                              "bg-[#f7f7f7]":
                                isMobile && !openModules[`${p.id}-${module}`],
                            }
                          )}
                        >
                          {isMobile && (
                            <span
                              className={cn({
                                "text-white": openModules[`${p.id}-${module}`],
                                "text-[#d9d9d9]":
                                  !openModules[`${p.id}-${module}`],
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
                          {skills.map((skill: ISkill) => (
                            <li
                              key={skill.id}
                              className="ml-10 list-disc text-[#FF3535]"
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
