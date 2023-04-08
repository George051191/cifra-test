/* eslint-disable default-case */
import React, {
  ChangeEvent, ChangeEventHandler, FC, useState,
} from 'react';
import styled from 'styled-components';

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
  const [changeDataForm, setNewData] = useState({
    name: '',
    birthDate: '',
    gender: '',
    position: '',
  });

  const [driverLicense, setDriverLicenseStatus] = useState<boolean>();

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
      console.log(driverLicense)
  };

  const changeWorkerData = () => {
    /// запрос на изменение рабочего
  };
  const deleteWorker = () => {
    /// запрос на удаление
  };
  return (
    <Form onSubmit={changeWorkerData}>
      <FieldSet>
        <Label htmlFor='name'>ФИО</Label>
        <Input name='name' id='name' value={changeDataForm.name} onChange={onChange} />
        <Label htmlFor='birthDate'>Дата рождения</Label>
        <Input name='birthDate' id='birthDate' value={changeDataForm.birthDate} onChange={onChange} />
        <Label htmlFor='gender'>Пол</Label>
        <Input name='gender' id='gender' value={changeDataForm.gender} onChange={onChange} />
        <Label htmlFor='position'>Должность</Label>
        <Input name='position' id='position' value={changeDataForm.position} onChange={onChange} />
        <LicenseTitle>Наличие водительских прав</LicenseTitle>
        <Label htmlFor='licenseTrue'>Да</Label>
        <Input type='radio' name='license' id='licenseTrue' value='Да' onChange={setDriverLicense} />
        <Label htmlFor='licenseFalse'>Нет</Label>
        <Input type='radio' name='license' id='licenseFalse' value='Нет' onChange={setDriverLicense} />
      </FieldSet>
      <Button type='submit'>Отправить изменения</Button>
      <Button onClick={deleteWorker} type='button'>Удалить подразделение</Button>
    </Form>
  );
};

export default WorkerSettings;
/// / создание рабочего сделаьб еще
/// разобраться с инпутами
/// инпут с селектом добавить
