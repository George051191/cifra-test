import React, { FC, MouseEventHandler, useState } from 'react';
import styled from 'styled-components';
import DivisionItem from '../components/divisionItem';
import WorkerItem from '../components/workerItem';
import Modal from '../components/modal';
import DivisionSettings from '../components/divisionSettings';
import CreateDivision from '../components/createDivision';
import WorkerSettings from '../components/workerSettings';
import Notification from '../components/notification';

const MainSection = styled.table`
  border-collapse: collapse;
  border: 1px solid #E2E3E5;
  border-radius: 6px;
  background-color:  #FFFFFF;
  font-family: Alegreya;
  font-size: 17px;
  font-weight: 400;
 // display: flex;
 // align-items: center;
  //justify-content: center;
 // padding: 200px;
`;



const App: FC = () => {
  const [workerModalState, setWorkerModalState] = useState<boolean>(false);
  const [divisionModalState, setDivisionModalState] = useState<boolean>(false);
  const [divisionCreateModalState, setCreateModalState] = useState<boolean>(false);
  const handleWorkerModal = () => {
    setWorkerModalState(!workerModalState);
  };
  const handleDivisionModal = () => {
    setDivisionModalState(!divisionModalState);
  };
  const handleCreateModalState = () => {
    setCreateModalState(!divisionCreateModalState);
  };

  return (
    <MainSection>
      <Notification errorMessage='some problem here' />
      {workerModalState && (
      <Modal onClose={handleWorkerModal}>
        <WorkerSettings />
      </Modal>
      )}
      {divisionModalState && (
        <Modal onClose={handleDivisionModal}>
          <DivisionSettings name='' description='' createdAt='' />
        </Modal>
      )}
      {divisionCreateModalState && (
        <Modal onClose={handleCreateModalState}>
          <CreateDivision />
        </Modal>
      )}
      {/*  <WorkerItem isHeader/>
    <WorkerItem fullName='ivanov' position='director' hasDriverLicense gender='male' birthDate='05/11/2000' />
    <WorkerItem fullName='ivanov' position='director' hasDriverLicense gender='male' birthDate='05/11/2000' />
    <WorkerItem fullName='ivanov' position='director' hasDriverLicense gender='male' birthDate='05/11/2000' /> */}
      {/*  <DivisionItem arrowIconClick={() => console.log(577)}
      description='fhhf sudjudh dhudush dunsndjnjdsnjdnjsdn ndsjnjndjnjsndjnd'
      createdAt='05/11/91'
      itemName='electrici'
      hasParent
      onClick={() => console.log(123)} /> */}
    </MainSection>
  );
};

export default App;
