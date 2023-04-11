/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable react/no-array-index-key */
import React, {
  FC, useState, MouseEvent, FormEvent, ChangeEvent, FormEventHandler, ChangeEventHandler,
} from 'react';
import styled from 'styled-components';
import { TInputWithSelect } from '../services/types';

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

const Input = styled.input`
    border-radius: 6px;
`;

const DataList = styled.datalist<{ isShown: boolean }>`
    position: absolute;
    border-radius: 0 0 6px 6px;
    display: ${(props) => (props.isShown ? 'flex' : 'none')};
    width: 100%;
    height: 80px;
    padding: 5px;
    overflow-y: auto;
    flex-direction: column;
    box-sizing: border-box;
    background-color:#FFFFFF;
    top: 45px;
    border:1px black solid;
`;

const Option = styled.option`
    display: flex;
    color: black;
    cursor: pointer;
`;

const Label = styled.label`
    text-align: center;
`;

const InputWithSelect: FC<TInputWithSelect> = ({
  dataArray, optionValue, setValue, title,
}) => {
  const [isShown, changeVisability] = useState<boolean>(false);

  return (
    <InputContainer>
      <Label htmlFor='input'>{title}</Label>
      <Input id='input' name='list' value={optionValue} onClick={() => { changeVisability(!isShown); }} />
      {isShown
      && (
      <DataList isShown={isShown} id='list'>
        {dataArray.map((el, index) => (
          <Option key={index} value={el} onClick={(evt: any) => { setValue(evt.target.value); }}>{el}</Option>
        ))}
      </DataList>
      )}

    </InputContainer>
  );
};

export default InputWithSelect;
