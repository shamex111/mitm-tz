import { IProduct } from "@/shared/types";

export const useNormalizeProducts = (data: IProduct[]) => {
  const normalizeData = data
    .filter((p) => {
      if (p.specializedSubjects.length === 0) return false;
      let qty = 0;
      p.specializedSubjects.forEach((s) => (qty += s.skills?.length || 0));
      if (qty < 2) return false;
      return true;
    })
    .slice(0, 5);
  return { normalizeData };
};
