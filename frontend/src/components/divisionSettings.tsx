/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable default-case */
import React, {
  ChangeEvent, ChangeEventHandler, FC, useState,
} from 'react';
import styled from 'styled-components';
import { TDvisionSettings } from '../services/types';

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


const DivisionSettings: FC<TDvisionSettings> = ({
  name, description, createdAt,
}) => {
  const [changeDataForm, setNewData] = useState({
    name,
    description,
  });

  const [driverLicense, setDriverLicenseStatus] = useState<boolean>();

  const [newDivisionData, setData] = useState({
    name: '',
    description: '',
  });

  const [changeDataFormWorker, setNewDataForWorker] = useState({
    name: '',
    birthDate: '',
    gender: '',
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
          evt.target.value = name;
        }
        break;
      }
      case 'description': {
        if (evt.target.value === '') {
          evt.target.value = description;
        }
        break;
      }
    }
  };

  const onChangeWorkersInput: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.stopPropagation();
    setNewDataForWorker({
      ...changeDataFormWorker,
      [evt.target.name]: evt.target.value,
    });
  }

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

  const changeDivision = () => {
    /// уходит запрос на изменение данных
  };

  const deleteDivision = () => {
    console.log(978);
    /// запрос на удаление дивизии
  };

  const createDivision = () => {
    /// запрос на создание с указанием родителя у дивизии
  };

  const setDataForNewDivision: ChangeEventHandler<HTMLInputElement> = (evt: ChangeEvent<HTMLInputElement>) => {
    setData({
      ...newDivisionData,
      [evt.target.name]: evt.target.value,
    });
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
        <Button onClick={deleteDivision} type='button'>Удалить подразделение</Button>
      </Form>
      <Form>
        <Legend>Добавить сотрудника</Legend>
        <Label htmlFor='name'>ФИО</Label>
        <Input name='name' id='name' value={changeDataForm.name} onChange={onChange} />
        <Label htmlFor='birthDate'>Дата рождения</Label>
        <Input name='birthDate' id='birthDate' value={changeDataFormWorker.birthDate} onChange={onChange} />
        <Label htmlFor='gender'>Пол</Label>
        <Input name='gender' id='gender' value={changeDataFormWorker.gender} onChange={onChange} />
        <Label htmlFor='position'>Должность</Label>
        <Input name='position' id='position' value={changeDataFormWorker.position} onChange={onChange} />
        <LicenseTitle>Наличие водительских прав</LicenseTitle>
        <Label htmlFor='licenseTrue'>Да</Label>
        <Input type='radio' name='license' id='licenseTrue' value='Да' onChange={setDriverLicense} />
        <Label htmlFor='licenseFalse'>Нет</Label>
        <Input type='radio' name='license' id='licenseFalse' value='Нет' onChange={setDriverLicense} />
      </Form>
      <Form onSubmit={createDivision}>
        <Legend>Создать дочернее подразделение</Legend>
        <Label htmlFor='name'>Наименование</Label>
        <Input name='name' id='name' value={newDivisionData.name} onChange={setDataForNewDivision} />
        <Label htmlFor='description'> Описание</Label>
        <Input name='description' id='description' value={newDivisionData.description} onChange={setDataForNewDivision} />
        <Button type='submit'>Создать подразделение</Button>
      </Form>

    </Wrapper>

  );
};

export default DivisionSettings;

/// компонент берез все данные из стоора
/// валидация при отправке на сервер
/// создать рабочего добавить
