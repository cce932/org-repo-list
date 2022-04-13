import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DIRECTION, SORT, TYPE } from '../constants/filter';

const Wrapper = styled.div`
  display: flex;
  border: 2px solid ${(props) => props.theme.color.accent};
  padding: 18px;
  margin: 25px;
  flex-direction: column;

  @media ${(props) => props.theme.device.laptop} {
    flex-direction: row;
  }
`;
const FilterWrapper = styled.div`
  margin: 4px 0;
  margin-right: 25px;
`;

const Select = styled.select`
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.color.secondary};
  background-color: transparent;
  color: ${(props) => props.theme.color.secondary};
  padding: 2px;
  outline: 0;
  font-family: 'Roboto Mono', monospace;
  width: 100px;
`;

function Filters({ useFiltersState }) {
  const [filter, setFilters] = useFiltersState;

  const handleTypeChange = (e) => {
    setFilters(e.target.value, TYPE);
  };

  const handleSortChange = (e) => {
    setFilters(e.target.value, SORT);
  };

  const handleDirectionChange = (e) => {
    setFilters(e.target.value, DIRECTION);
  };

  return (
    <Wrapper>
      <FilterWrapper>
        <label htmlFor="type">Type:</label>
        <Select id="type" value={filter.type} onChange={handleTypeChange}>
          <option value="all">All</option>
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="forks">Forks</option>
          <option value="sources">Sources</option>
          <option value="member">Member</option>
          <option value="internal">Internal</option>
        </Select>
      </FilterWrapper>

      <FilterWrapper>
        <label htmlFor="sort">Sort:</label>
        <Select id="sort" value={filter.sort} onChange={handleSortChange}>
          <option value="created">Created</option>
          <option value="updated">Updated</option>
          <option value="pushed">Pushed</option>
          <option value="full_name">Full Name</option>
        </Select>
      </FilterWrapper>

      <FilterWrapper>
        <label htmlFor="direction">Direction:</label>
        <Select id="direction" value={filter.direction} onChange={handleDirectionChange}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </Select>
      </FilterWrapper>
    </Wrapper>
  );
}

Filters.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  useFiltersState: PropTypes.array.isRequired,
};

export default Filters;
