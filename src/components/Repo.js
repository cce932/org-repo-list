/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Topic from './Topic';
import {
  DateIcon, LanguageIcon, StarIcon, StorageIcon,
} from './Icons';

const Wrapper = styled.div`
  border: 2px solid ${(prop) => prop.theme.color.secondary};
  margin-top: 25px;
  padding: 20px;
`;

const HeaderWrapper = styled.div`
  border-bottom: 3px solid ${(prop) => prop.theme.color.primary};
  margin: 0 0 20px;
  padding: 2px 5px 5px;
  display: flex;
  color: ${(prop) => prop.theme.color.secondary};
`;

const Title = styled.h3`
  margin: 0;
  flex-grow: 1;

  > a {
    text-decoration: none;
    color: ${(prop) => prop.theme.color.accent};
  }
`;

const Align = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoWrapper = styled.div`
  * {
    margin-right: 15px;
  }
`;

const TopicWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const formatDate = (date) => new Date(date).toLocaleDateString('en-US');

function Repo({ repo }) {
  const {
    language,
    description,
    created_at,
    name,
    html_url,
    topics,
    stargazers_count,
    size,
  } = repo;

  return (
    <Wrapper>
      <HeaderWrapper>
        <Title><a href={html_url}>{name}</a></Title>

        <Align>
          <StarIcon />
          <span>{stargazers_count}</span>
        </Align>
      </HeaderWrapper>
      <p>{description}</p>
      <InfoWrapper>
        <div>
          <LanguageIcon />
          <span>{language}</span>
        </div>
        <div>
          <DateIcon />
          <span>{formatDate(created_at)}</span>
        </div>

        <div>
          <StorageIcon />
          <span>
            {size / 1000}
            KB
          </span>
        </div>
      </InfoWrapper>
      <TopicWrapper>
        {topics.map((topic) => <Topic key={topic} topic={topic} />)}
      </TopicWrapper>
    </Wrapper>
  );
}

Repo.propTypes = {
  repo: PropTypes.shape({
    language: PropTypes.string,
    description: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    html_url: PropTypes.string.isRequired,
    topics: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
    stargazers_count: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
  }).isRequired,
};

export default Repo;
