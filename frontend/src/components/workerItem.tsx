import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { TWorkerItemType } from '../services/types';

const TableItem = styled.td`
    border: 1px solid #E2E3E5;
`;

const WorkerItem: FC<TWorkerItemType> = ({
  fullName = 'ФИО',
  hasDriverLicense = 'Наличие водительских прав',
  birthDate = 'Дата рождения',
  gender = 'Пол',
  position = 'Должность',
  isHeader = false,
}) => {
  const [isOpen, openModal] = useState(false);
  const changeData = () => {
    openModal(true);
  };
  return (
    <tr onClick={changeData}>
      <TableItem>{fullName }</TableItem>
      <TableItem>{ birthDate }</TableItem>
      <TableItem>{ gender }</TableItem>
      <TableItem>{ position }</TableItem>
      <TableItem>{hasDriverLicense}</TableItem>
    </tr>
  );
};

export default WorkerItem;

/// при нажатии на tr открывается модалка и там можем менять все по рабочему и плюс его дивизион

/// вспомнить модалки и сделать их на каждый случай

/// Работник имеет след. поля: ФИО, Дата рождения, Пол, Должность, Наличие водительских прав.
