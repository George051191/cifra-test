import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { TDivisionItemType } from '../services/types';
import { UpArrowIcon, DownArrowIcon, BasicSettingsIcon } from './icons';

const BasicDivisionItem = styled.li`
    width: 200px;
    height: 50px;
    border: 1px solid rgb(226, 227, 229);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    list-style: none;
    text-align: center;
    font-family: Alegreya;
    font-size: 17px;
    font-weight: 400;
   
`;

const DescriptionModal = styled.div`
  width: 200px;
  border: 1px solid #E2E3E5;
  border-radius: 6px;
  background-color:  '#FFFFFF';
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 200px;
  top: 0;
  right: -240px;
  font-family: Alegreya;
  font-size: 17px;
  font-weight: 400;
  justify-content: space-around;
`;

const DescriptionModalItem = styled.p`
  margin: 0;
  padding: 0;
`;

const DivisionItem: FC<TDivisionItemType> = ({
  itemName, arrowIconClick, createdAt, description, onClick, hasParent,
}) => {
  const [isOpen, setOpenstatus] = useState(false);
  const openFullDescription = () => {
    setOpenstatus(true);
  };
  const closeFullDescription = () => {
    setOpenstatus(false);
  };
  return (
    <BasicDivisionItem
      onMouseLeave={closeFullDescription}
      onMouseOver={openFullDescription}
      onClick={onClick}>
      {itemName}
      {hasParent && <DownArrowIcon onClick={arrowIconClick} />}
      {isOpen
        && (
        <DescriptionModal>
          <DescriptionModalItem>
            Дата формирования:
            {createdAt}
          </DescriptionModalItem>
          <DescriptionModalItem>
            Описание:
            {description }
          </DescriptionModalItem>
        </DescriptionModal>
        )}
      <BasicSettingsIcon />
    </BasicDivisionItem>
  );
};

export default DivisionItem;

/// Приложение позволяет добавлять/изменять/удалять подразделения и работников. Также позволяет менять структуру подразделений и переносить работника между подразделениями.
/// Добавление и редактирование должно происходить в отдельном модальном окне или отдельной странице.
/// клик по дивизиону присылает его работников
/// кнопка три точки открывает модалку для изменений
/// в модалке поля описание и название, создать дочернее подразделение отдельный филдсет с полями нового подразделения

/// !!!!!!!!!!!!!!!
/// клик по самой плашке дивизиона отправляет запрос на работников
/// клик по стрелке вниз отправляет запрос за дочерними категориями
/// клик по настройкам вызывает модалку с полями для изменения и создания новой подкатегории 