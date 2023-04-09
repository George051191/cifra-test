import { ReactNode } from 'react';

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

export type TModalProps = {
  onClose: () => void;
  children: ReactNode;
}

export type TDvisionSettings = {
  name: string;
  description: string;
  createdAt: string;
  onBlur?: () => void;
  createDivision?: () => void;
  changeDivision?: () => void;
  deleteDivision?: () => void;
}

export type TNotification = {
  errorMessage: string;
}

/// все поля дивизии, onBlur, createDivision, changeDivision