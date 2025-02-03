import { FC } from "react";

const InfoCards: FC = () => {
  return (
    <div className="flex xl:flex-row flex-col xl:space-y-[0] space-y-[23px] xl:space-x-[30px] mx-auto w-fit">
      <div className="relative bg-[#FF3535] text-white xl:w-[628px] w-[345px]">
        <h2 className="xl:text-[36px] text-[25px] font-bold mx-auto w-fit mt-[56px]">
          Практические модули
        </h2>
        <p className="mt-[24px] text-[20px] font-thin ml-[72px] mr-[60px] mb-[85px]">
          Работа над собственными проектами: практика групповых взаимодействий,
          кейс-методы, эссе
        </p>
      </div>
      <div className="relative bg-[#2D2C2A] text-white xl:w-[628px] w-[345px]">
        <h2 className="xl:text-[36px] text-[25px]font-bold mx-auto w-fit mt-[56px]">
          Итоговая аттестация
        </h2>
        <ul>
          <li
            className="mt-[24px] text-[20px] font-thin ml-[72px] mr-[60px]"
            style={{
              listStyleType: "disc",
              color: "#FF3535",
            }}
          >
            <div className="text-white">
              Бизнес-проектирование (подготовка итоговой аттестационной работы,
              консультирование по бизнес-проектированию)
            </div>
          </li>
          <li
            className="mt-[10px] text-[20px] font-thin ml-[72px] mr-[60px] mb-[85px]"
            style={{
              listStyleType: "disc",
              color: "#FF3535",
            }}
          >
            <div className="text-white">
              Защита итоговой аттестационной работы
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InfoCards;
