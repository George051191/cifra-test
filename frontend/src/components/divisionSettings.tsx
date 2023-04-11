/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable default-case */
import React, {
  ChangeEvent, ChangeEventHandler, FC, MouseEvent, FormEvent, useState,
} from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from '../services/hooks';
import InputWithSelect from './inputWithSelect';
import changeDivisionDataThunk from '../thunks/change-division-data-thunk';
import deleteDivisionThunk from '../thunks/delete-division-thunk';
import createDivisionThunk from '../thunks/create-division-thunk';
import createWorkerThunk from '../thunks/create-worker-thunk';
import CreateDivision from './createDivision';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    font-family: Alegreya;
    font-size: 17px;
    font-weight: 400;
    align-items: center;
    gap: 10px;
`;

const Label = styled.label`
    
`;

const Input = styled.input`
    border-radius: 6px;
`;

const Legend = styled.legend`
    
`;

const FieldSet = styled.fieldset`
    border: none;
    display: flex;
    flex-direction: column;
`;

const Button = styled.button`
    width: 130px;
    height: 50px;
    border-radius: 6px;
    cursor: pointer;
`;

const LicenseTitle = styled.p`
    margin: 0;
    padding: 0;
`;

const DivisionSettings: FC = () => {
  const dispatch = useDispatch();
  const division = useSelector((state) => state.view.division)
  ?? {
    id: null,
    name: '',
    createdAt: '',
    description: '',
    parentDivision: null,
  };

  const [changeDataForm, setNewData] = useState<{ name: string, description: string }>({
    name: division.name,
    description: division.description,
  });
  const [optionValue, setValue] = useState<string>('');
  const [driverLicense, setDriverLicenseStatus] = useState<boolean>(true);

  const [newDivisionData, setData] = useState({
    name: '',
    description: '',
  });

  const [changeDataFormWorker, setNewDataForWorker] = useState({
    name: '',
    birthDate: '',
    position: '',
  });

  const onChange: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    setNewData({
      ...changeDataForm,
      [evt.target.name]: evt.target.value,
    });
  };

  const onBlur: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    switch (evt.target.name) {
      case 'name': {
        if (evt.target.value === '') {
          evt.target.value = division.name;
        }
        break;
      }
      case 'description': {
        if (evt.target.value === '') {
          evt.target.value = division.description;
        }
        break;
      }
    }
  };

  const onChangeWorkersInput: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    setNewDataForWorker({
      ...changeDataFormWorker,
      [evt.target.name]: evt.target.value,
    });
  };

  const setDriverLicense:ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    switch (evt.target.value) {
      case 'Нет': {
        setDriverLicenseStatus(false);
        break;
      }
      case 'Да': {
        setDriverLicenseStatus(true);
        break;
      }
    }
  };

  const changeDivision = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(changeDivisionDataThunk(division.id, changeDataForm, division.parentDivision));
  };

  const deleteDivision = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    dispatch(deleteDivisionThunk(division.id, division.parentDivision));
  };

  const createDivision = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(createDivisionThunk(newDivisionData, division.id));
  };

  const setDataForNewDivision: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...newDivisionData,
      [evt.target.name]: evt.target.value,
    });
  };

  const addWorker = (evt: FormEvent<HTMLFormElement>) => {
    const workerData = {
      fullName: changeDataFormWorker.name,
      dateOfBirth: changeDataFormWorker.birthDate,
      position: changeDataFormWorker.position,
      hasDriverLicense: driverLicense,
      gender: optionValue,
    };
    evt.preventDefault();
    dispatch(createWorkerThunk(workerData, division.id));
  };

  return (
    <Wrapper>
      <Form onSubmit={changeDivision}>
        <FieldSet>
          <Label htmlFor='name'>Наименование</Label>
          <Input onBlur={onBlur} name='name' id='name' value={changeDataForm.name} onChange={onChange} />
          <Label htmlFor='description'> Описание</Label>
          <Input onBlur={onBlur} name='description' id='description' value={changeDataForm.description} onChange={onChange} />
        </FieldSet>
        <Button type='submit'>Отправить изменения</Button>
        <Button onClick={(evt) => deleteDivision(evt)} type='button'>Удалить подразделение</Button>
      </Form>
      <Form onSubmit={addWorker}>
        <Legend>Добавить сотрудника</Legend>
        <Label htmlFor='name'>ФИО</Label>
        <Input name='name' id='name' value={changeDataFormWorker.name} onChange={onChangeWorkersInput} />
        <Label htmlFor='birthDate'>Дата рождения</Label>
        <Input name='birthDate' id='birthDate' value={changeDataFormWorker.birthDate} onChange={onChangeWorkersInput} />
        <Label htmlFor='position'>Должность</Label>
        <Input name='position' id='position' value={changeDataFormWorker.position} onChange={onChangeWorkersInput} />
        <InputWithSelect title='Пол' optionValue={optionValue} setValue={setValue} dataArray={['мужской', 'женский']} />
        <LicenseTitle>Наличие водительских прав</LicenseTitle>
        <Label htmlFor='licenseTrue'>Да</Label>
        <Input type='radio' name='license' id='licenseTrue' value='Да' onChange={setDriverLicense} />
        <Label htmlFor='licenseFalse'>Нет</Label>
        <Input type='radio' name='license' id='licenseFalse' value='Нет' onChange={setDriverLicense} />
        <Button type='submit'>Создать работника</Button>
      </Form>
      <CreateDivision
        title='Создать дочернее подразделение'
        name={newDivisionData.name}
        description={newDivisionData.description}
        onInputChange={setDataForNewDivision}
        onSubmit={createDivision} />
    </Wrapper>

  );
};

export default DivisionSettings;
