/* eslint-disable no-underscore-dangle */
import { DatePicker } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Text } from 'ui/Typography';
import ButtonShipping from './ButtonShipping';
import CompleteTable from './CompleteTable';
import DropdownShipping from './DropdownShipping';

const CompleteDeliveries: React.FC = () => {
  const [searchInput, setSearchInput] = useState({
    from: '',
    to: ''
  });
  const [isSearch, setIsSearch] = useState(false);
  const handleChangeSearch = (key: string, value: any) => {
    setSearchInput({ ...searchInput, [key]: value });
  };

  const handleSearch = () => {
    setIsSearch(true);
  };
  return (
    <Container>
      <Title>
        <Text ml='20px' strong $size='17px'>
          Complete Deliveries
        </Text>
      </Title>
      <Filter>
        <StyleText>Filter deliveries from</StyleText>
        <StyleDatePicker
          onChange={(e: any) => handleChangeSearch('from', e ? new Date(e._d).getTime() : '')}
        />
        <StyleText ml='15px'>to</StyleText>
        <StyleDatePicker
          onChange={(e: any) => handleChangeSearch('to', e ? new Date(e._d).getTime() : '')}
        />
        <ButtonShipping.ButtonSearch onClick={handleSearch} />
        <DropdownShipping />
        <ButtonShipping.ButtonExport />
      </Filter>
      <CompleteTable searchInput={searchInput} isSearch={isSearch} setIsSearch={setIsSearch} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 600px;
  margin-top: 10px;
  background-color: #f4f8ff;
  border-top: 1px solid #dbdbdc;
`;

const Title = styled.div`
  width: 100%;
  color: black;
  padding: 15px 0 15px 18px;
  margin-bottom: 10px;
  border-bottom: 1px solid #dbdbdc;
`;

const Filter = styled.div`
  width: 95%;
  height: 50px;
  margin: auto;
  display: flex;
`;

const StyleText = styled(Text)`
  margin-top: 15px;
  font-weight: bold;
  font-size: 16px;
`;

const StyleDatePicker = styled(DatePicker)`
  margin: 10px 0 0 15px;
  height: 35px;
`;

export default CompleteDeliveries;
