/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { FC, useState } from 'react';
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

const CreateDivision: FC = () => {
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

  const createDivision = () => {
    /// создание дивизтт без указания дочерних
  };
  return (
    <Form onSubmit={createDivision}>
      <Legend>Создать дочернее подразделение</Legend>
      <Label htmlFor='name'>Наименование</Label>
      <Input name='name' id='name' value={newDivisionData.name} onChange={setDataForNewDivision} />
      <Label htmlFor='description'> Описание</Label>
      <Input name='description' id='description' value={newDivisionData.description} onChange={setDataForNewDivision} />
      <Button type='submit'>Создать подразделение</Button>
    </Form>
  );
};

export default CreateDivision;
