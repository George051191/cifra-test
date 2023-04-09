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
    background-color:  #FFFFFF;
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
  background-color:  #FFFFFF;
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
  itemName, arrowIconClick, createdAt, description, onClick, openSettingsMenu,
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
      <DownArrowIcon onClick={arrowIconClick} />
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
      <BasicSettingsIcon onClick={openSettingsMenu} />
    </BasicDivisionItem>
  );
};

export default DivisionItem;
