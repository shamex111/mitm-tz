export interface ISkill {
  id: string;
  title: string;
}

export interface ISpecializedSubject {
  skills?: ISkill[];
}

export interface IProduct {
  id: string;
  title: string;
  specializedSubjects: ISpecializedSubject[];
}
