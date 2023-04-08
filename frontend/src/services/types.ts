export type TDivisionItemType = {
  itemName: string;
  onClick: () => void;
  hasParent: boolean;
  createdAt: string;
  description: string;
  arrowIconClick: () => void;
};


export type TWorkerItemType = {
  fullName?: string;
  birthDate?: string;
  gender?: string;
  position?: string;
  hasDriverLicense?: boolean | string;
  isHeader: boolean;
}

//ФИО, Дата рождения, Пол, Должность, Наличие водительских прав.