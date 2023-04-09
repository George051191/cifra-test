import React, {
  FC, MouseEventHandler, MouseEvent, useState, useEffect,
} from 'react';
import styled from 'styled-components';
import DivisionItem from '../components/divisionItem';
import WorkerItem from '../components/workerItem';
import Modal from '../components/modal';
import DivisionSettings from '../components/divisionSettings';
import CreateDivision from '../components/createDivision';
import WorkerSettings from '../components/workerSettings';
import Notification from '../components/notification';
import getAllDivisionsThunk from '../thunks/get-divisions-thunk';
import getWorkersThunk from '../thunks/get-workers-thunk';
import { useDispatch, useSelector } from '../services/hooks';

const MainSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color:  #b8b0b0;
  height: 100vh;
`;

const DivisionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WorkersTable = styled.table`
  border-collapse: collapse;
  border: 1px solid #E2E3E5;
  border-radius: 6px;
  background-color:  #FFFFFF;
  font-family: Alegreya;
  font-size: 17px;
  font-weight: 400;
`;

const App: FC = () => {
  const [workerModalState, setWorkerModalState] = useState<boolean>(false);
  const [divisionModalState, setDivisionModalState] = useState<boolean>(false);
  const [divisionCreateModalState, setCreateModalState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { divisions, workers } = useSelector((state) => state.all);

  useEffect(() => {
    dispatch(getAllDivisionsThunk());
  }, [dispatch]);

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
      <DivisionsContainer>
        {divisions && divisions.map((el) => (
          <DivisionItem
            key={el.id}
            itemName={el.name}
            createdAt={el.createdAt}
            description={el.description}
            onClick={(evt: MouseEvent<Element>) =>
            { evt.stopPropagation(); dispatch(getWorkersThunk(el.id)); }}
            arrowIconClick={(evt: MouseEvent<Element>) =>
            { evt.stopPropagation(); dispatch(getAllDivisionsThunk(el.id)); }}
            openSettingsMenu={(evt: MouseEvent<Element>) =>
            { evt.stopPropagation(); handleDivisionModal(); }} />

        ))}
      </DivisionsContainer>
      <WorkersTable>
        <tbody>
          {workers && <WorkerItem isHeader />}
          {workers && workers.map((el) => (
            <WorkerItem
              key={el.id}
              fullName={el.fullName}
              position={el.position}
              hasDriverLicense={el.hasDriverLicense ? 'Да' : 'Нет'}
              gender={el.gender}
              birthDate={el.dateOfBirth} />
          ))}
        </tbody>
      </WorkersTable>

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


/// разобоаться с озданиями всех. починить модалку и типизировать танки