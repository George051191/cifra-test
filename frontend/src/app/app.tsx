import React, { FC } from 'react';
import styled from 'styled-components';
import DivisionItem from '../components/divisionItem';
import WorkerItem from '../components/workerItem';

const MainSection = styled.table`
border-collapse: collapse;
border: 1px solid #E2E3E5;
  border-radius: 6px;
  background-color:  '#FFFFFF';
  font-family: Alegreya;
  font-size: 17px;
  font-weight: 400;
 // display: flex;
 // align-items: center;
  //justify-content: center;
 // padding: 200px;
`;

const App: FC = () => (
  <MainSection>
    <WorkerItem isHeader/>
    <WorkerItem fullName='ivanov' position='director' hasDriverLicense gender='male' birthDate='05/11/2000' />
    <WorkerItem fullName='ivanov' position='director' hasDriverLicense gender='male' birthDate='05/11/2000' />
    <WorkerItem fullName='ivanov' position='director' hasDriverLicense gender='male' birthDate='05/11/2000' />
    {/*  <DivisionItem arrowIconClick={() => console.log(577)}
      description='fhhf sudjudh dhudush dunsndjnjdsnjdnjsdn ndsjnjndjnjsndjnd'
      createdAt='05/11/91'
      itemName='electrici'
      hasParent
      onClick={() => console.log(123)} /> */}
  </MainSection>

);

export default App;


