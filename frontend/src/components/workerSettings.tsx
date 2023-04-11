/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
/* eslint-disable default-case */
import React, {
  ChangeEvent, ChangeEventHandler, FC, FormEvent, useCallback, useEffect, useMemo, useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../services/hooks';
import InputWithSelect from './inputWithSelect';
import changeWorkerThunk from '../thunks/change-worker-thunk';
import deleteWorkerThunk from '../thunks/delete-worker-thunk';
import getAllDivisionsThunk from '../thunks/get-divisions-thunk';
import { TDivision } from '../services/types';
import { setCurrentWorkerDivision } from '../store/viewSlice';

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
    text-align: center;
`;

const Input = styled.input`
    border-radius: 6px;
`;

const LicenseTitle = styled.p`
    margin: 0;
    padding: 0;
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

const WorkerSettings: FC = () => {
  const {
    worker, currentDivisions, divisionsArray, currentWorkerDivision,
  } = useSelector((state) => state.view);
  const [optionValueDivision, setValueForDivision] = useState<string>(currentWorkerDivision);
  const dispatch = useDispatch();
  const [changeDataForm, setNewData] = useState({
    name: worker?.fullName,
    birthDate: worker?.dateOfBirth,
    position: worker?.position,
  });
  const [optionValue, setValue] = useState<string>(worker!.gender);
  const [driverLicense, setDriverLicenseStatus] = useState<boolean>();

  useEffect(() => {
    const specKey = true;
    dispatch(getAllDivisionsThunk(specKey));

    return () => {
      dispatch(setCurrentWorkerDivision(''));
    };
  }, [dispatch]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    setNewData({
      ...changeDataForm,
      [evt.target.name]: evt.target.value,
    });
  };

  const setDriverLicense:ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    switch (evt.target.value) {
      case 'Да': {
        setDriverLicenseStatus(true);
        break;
      }
      case 'Нет': {
        setDriverLicenseStatus(false);
        break;
      }
    }
  };
  const changeValue = useCallback(() => divisionsArray?.find((el) => el.name === optionValueDivision)?.id, [divisionsArray, optionValueDivision]);
  const changeWorkerData = (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const changedData = {
      fullName: changeDataForm.name,
      dateOfBirth: changeDataForm.birthDate,
      gender: optionValue,
      position: changeDataForm.position,
      hasDriverLicense: driverLicense,
      division: changeValue(),
    };
    dispatch(changeWorkerThunk(changedData, worker!.id, worker?.division, changedData.division));
  };
  const deleteWorker = () => {
    dispatch(deleteWorkerThunk(worker!.id, worker!.division));
  };
  return (
    <Form onSubmit={(evt) => changeWorkerData(evt)}>
      <FieldSet>
        <Label htmlFor='name'>ФИО</Label>
        <Input name='name' id='name' value={changeDataForm.name} onChange={onChange} />
        <Label htmlFor='birthDate'>Дата рождения</Label>
        <Input name='birthDate' id='birthDate' value={changeDataForm.birthDate} onChange={onChange} />
        <InputWithSelect title='Пол' optionValue={optionValue} setValue={setValue} dataArray={['мужской', 'женский']} />
        <Label htmlFor='position'>Должность</Label>
        <Input name='position' id='position' value={changeDataForm.position} onChange={onChange} />
        <LicenseTitle>Наличие водительских прав</LicenseTitle>
        <Label htmlFor='licenseTrue'>Да</Label>
        <Input type='radio' name='license' id='licenseTrue' value='Да' onChange={setDriverLicense} />
        <Label htmlFor='licenseFalse'>Нет</Label>
        <Input type='radio' name='license' id='licenseFalse' value='Нет' onChange={setDriverLicense} />
        <InputWithSelect optionValue={optionValueDivision} setValue={setValueForDivision} dataArray={currentDivisions} title='Изменить подразделение' />
      </FieldSet>
      <Button type='submit'>Отправить изменения</Button>
      <Button onClick={deleteWorker} type='button'>Удалить работника</Button>
    </Form>
  );
};

export default WorkerSettings;
