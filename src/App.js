import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Filters from './components/Filters';
import Repo from './components/Repo';
import Spinner from './components/Spinner';
import useFilters from './hooks/useFilters';
import useInfiniteScroll from './hooks/useInfiniteScroll';

const Wrapper = styled.div`
  margin: auto;

  @media ${(props) => props.theme.device.laptop} {
    width: 80%;
  }
  @media ${(props) => props.theme.device.desktop} {
    width: 60%;
  }
`;

function App() {
  const [repos, setRepos] = useState([]);
  const loadingState = useState(false);
  const [isLoading, setLoading] = loadingState;

  const fetchData = (filtersParam, page) => fetch(`https://api.github.com/orgs/facebook/repos?${
    new URLSearchParams({
      ...filtersParam, page,
    })}`)
    .then((response) => response.json())
    .catch(() => {
      // eslint-disable-next-line no-alert
      alert('Data Fetching Error! Please Retry.');
    });

  const setDataToRepos = (filtersParam, page) => {
    setLoading(true);
    return fetchData(filtersParam, page)
      .then((data) => {
        setLoading(false);
        setRepos(data);
        return data;
      });
  };

  const {
    setInitialized: setInitializedInFilter,
    filters, setFilters,
  } = useFilters(setDataToRepos);

  const appendDataToRepos = (filtersParam = filters) => (page) => fetchData(
    filtersParam,
    page,
  )
    .then((data) => {
      setRepos((prevRepo) => prevRepo.concat(data));
      return data;
    });

  const {
    setInitialized: setInitializedInIS,
    reset: resetIS,
  } = useInfiniteScroll(appendDataToRepos, loadingState);

  useEffect(() => {
    setLoading(true);
    setDataToRepos(filters, 1).then(() => {
      setInitializedInFilter(true);
      setInitializedInIS(true);
      setLoading(false);
    });
  }, []);

  return (
    <Wrapper>
      <Filters useFiltersState={[filters, setFilters(repos.length, resetIS)]} />
      {repos.map((repo) => <Repo key={repo.id} repo={repo} />)}
      {isLoading && <Spinner />}
    </Wrapper>
  );
}

export default App;
