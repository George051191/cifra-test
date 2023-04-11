import { ReactNode } from 'react';

export type TDivisionItemType = {
  itemName: string;
  onClick: (evt: React.MouseEvent<Element>) => void;
  createdAt: string;
  description: string;
  openSettingsMenu:(evt:React.MouseEvent<Element>)=> void
  arrowIconClick: (evt:React.MouseEvent<Element>) => void;
};
enum Gender {
  male = 'мужской',
  female = 'женский',
}

export type TWorkerItemType = {
  fullName?: string;
  birthDate?: string;
  gender?: string;
  position?: string;
  hasDriverLicense?: boolean | string;
  isHeader?: boolean;
  openModal?: (evt:React.MouseEvent<Element>) => void;
};

export type TModalProps = {
  onClose: (evt:React.MouseEvent<Element>) => void;
  children: ReactNode;
};

export type TDvisionSettings = {
  name: string;
  description: string;
  createdAt: string;
  onBlur?: () => void;
  createDivision?: () => void;
  changeDivision?: () => void;
  deleteDivision?: () => void;
};

export type TInputWithSelect = {
  dataArray: string[];
  optionValue: string;
  setValue: (key: Gender | string) => void;
  title: string;
}

export type TNotification = {
  errorMessage: string;
};

export type TDivision = {
  id: number;
  name: string;
  createdAt: string;
  description: string;
  parentDivision: number | null;
};



export type TWorker = {
  id: number;
  fullName: string;
  dateOfBirth: string;
  gender: Gender,
  position: string,
  hasDriverLicense: boolean,
  division: number
};

