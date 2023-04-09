import { ReactNode } from 'react';

export type TDivisionItemType = {
  itemName: string;
  onClick: (evt: React.MouseEvent<Element>) => void;
  createdAt: string;
  description: string;
  openSettingsMenu:(evt:React.MouseEvent<Element>)=> void
  arrowIconClick: (evt:React.MouseEvent<Element>) => void;
};

export type TWorkerItemType = {
  fullName?: string;
  birthDate?: string;
  gender?: string;
  position?: string;
  hasDriverLicense?: boolean | string;
  isHeader?: boolean;
};

export type TModalProps = {
  onClose: () => void;
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

enum Gender {
  male = 'male',
  female = 'female',
}

export type TWorker = {
  id: number;
  fullName: string;
  dateOfBirth: string;
  gender: Gender,
  position: string,
  hasDriverLicense: boolean,
  division: number
};
/// все поля дивизии, onBlur, createDivision, changeDivision
