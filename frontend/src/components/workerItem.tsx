import React, { FC } from 'react';
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
  openModal,
}) => (
  <tr onClick={openModal}>
    <TableItem>{fullName }</TableItem>
    <TableItem>{ birthDate }</TableItem>
    <TableItem>{ gender }</TableItem>
    <TableItem>{ position }</TableItem>
    <TableItem>{hasDriverLicense}</TableItem>
  </tr>
);

export default WorkerItem;

