/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, {
  FC, MouseEvent, useState, useEffect, ChangeEvent, FormEvent, ChangeEventHandler,
} from 'react';
import styled from 'styled-components';
import DivisionItem from '../components/divisionItem';
import WorkerItem from '../components/workerItem';
import Modal from '../components/modal';
import DivisionSettings from '../components/divisionSettings';
import CreateDivision from '../components/createDivision';
import WorkerSettings from '../components/workerSettings';
import getAllDivisionsThunk from '../thunks/get-divisions-thunk';
import getWorkersThunk from '../thunks/get-workers-thunk';
import { useDispatch, useSelector } from '../services/hooks';
import getPreviousDivisionsThunk from '../thunks/get-previous-divisions-thunk';
import { setCurrentDivision, setCurrentWorker } from '../store/viewSlice';
import { TWorker } from '../services/types';
import createDivisionThunk from '../thunks/create-division-thunk';

const MainSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color:  #b8b0b0;
  height: 100vh;
`;
const Button = styled.button`
    width: 130px;
    height: 50px;
    border-radius: 6px;
    cursor: pointer;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 180px;
`;

const ContainerHeader = styled.p`
   font-family: Alegreya;
    font-size: 25px;
    font-weight: 400;
    margin: 0;
`;

const WorkersTable = styled.table`
  border-collapse: collapse;
  border: 1px solid #E2E3E5;
  border-radius: 6px;
  background-color:  #FFFFFF;
  font-family: Alegreya;
  font-size: 17px;
  font-weight: 400;
  cursor: pointer;
`;

const App: FC = () => {
  const [workerModalState, setWorkerModalState] = useState<boolean>(false);
  const [divisionModalState, setDivisionModalState] = useState<boolean>(false);
  const [divisionCreateModalState, setCreateModalState] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { divisions, workers } = useSelector((state) => state.all);
  const { currentLevel, previousDivision } = useSelector((state) => state.view);

  const [newDivisionData, setData] = useState({
    name: '',
    description: '',
  });

  const setDataForNewDivision: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...newDivisionData,
      [evt.target.name]: evt.target.value,
    });
  };

  const createDivision = (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(createDivisionThunk(newDivisionData));
  };

  useEffect(() => {
    dispatch(getAllDivisionsThunk());
  }, [dispatch]);

  const handleWorkerModal = (evt: MouseEvent<Element>, el?:TWorker) => {
    evt.stopPropagation();
    dispatch(setCurrentWorker(el!));
    setWorkerModalState(!workerModalState);
  };
  const handleDivisionModal = () => {
    setDivisionModalState(!divisionModalState);
  };
  const handleCreateModalState = () => {
    setCreateModalState(!divisionCreateModalState);
  };

  const getPreviosDivisions = (evt: MouseEvent) => {
    evt.stopPropagation();
    dispatch(getPreviousDivisionsThunk(previousDivision > 0 ? previousDivision : divisions![0].parentDivision));
  };

  return (
    <MainSection>
      <ContentContainer>
        {currentLevel === 0 && <Button onClick={handleCreateModalState}>Создать подразделение</Button>}
        {currentLevel > 0 && <Button onClick={(evt) => getPreviosDivisions(evt)}>Назад</Button>}
        <ContainerHeader>Подразделения</ContainerHeader>
        {divisions && divisions.map((el) => (
          <DivisionItem
            key={el.id}
            itemName={el.name}
            createdAt={el.createdAt}
            description={el.description}
            onClick={(evt: MouseEvent<Element>) => { evt.stopPropagation(); dispatch(getWorkersThunk(el.id)); }}
            arrowIconClick={(evt: MouseEvent<Element>) => {
              evt.stopPropagation();
              const specKey = false;
              dispatch(getAllDivisionsThunk(specKey, el.id));
            }}
            openSettingsMenu={(evt: MouseEvent<Element>) => { evt.stopPropagation(); handleDivisionModal(); dispatch(setCurrentDivision(el)); }} />

        ))}
      </ContentContainer>
      <ContentContainer>
        <ContainerHeader>Сотрудники</ContainerHeader>
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
                birthDate={el.dateOfBirth}
                openModal={(evt) => { handleWorkerModal(evt, el); }} />

            ))}
          </tbody>
        </WorkersTable>
      </ContentContainer>
      {workerModalState && (
      <Modal onClose={(evt) => handleWorkerModal(evt)}>
        <WorkerSettings />
      </Modal>
      )}
      {divisionModalState && (
      <Modal onClose={handleDivisionModal}>
        <DivisionSettings />
      </Modal>
      )}
      {divisionCreateModalState && (
      <Modal onClose={handleCreateModalState}>
        <CreateDivision
          title='Создать подразделение'
          name={newDivisionData.name}
          description={newDivisionData.description}
          onInputChange={setDataForNewDivision}
          onSubmit={createDivision} />
      </Modal>
      )}
    </MainSection>
  );
};

export default App;
