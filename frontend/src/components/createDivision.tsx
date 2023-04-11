/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {
  ChangeEvent, ChangeEventHandler, FC, FormEvent, useState,
} from 'react';
import styled from 'styled-components';
import createDivisionThunk from '../thunks/create-division-thunk';
import { useDispatch } from '../services/hooks';

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

type TCreateDivision = {
  title: string,
  name: string;
  description: string;
  onInputChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (evt: FormEvent<HTMLFormElement>) => void;
};

const CreateDivision: FC<TCreateDivision> = ({
  title, name, description, onInputChange, onSubmit,
}) => (
  <Form onSubmit={onSubmit}>
    <Legend>{title}</Legend>
    <Label htmlFor='name'>Наименование</Label>
    <Input name='name' id='name' value={name} onChange={onInputChange} />
    <Label htmlFor='description'> Описание</Label>
    <Input name='description' id='description' value={description} onChange={onInputChange} />
    <Button type='submit'>Создать подразделение</Button>
  </Form>
);
export default CreateDivision;
