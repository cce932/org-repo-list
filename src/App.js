import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Filters from './components/Filters';
import Repo from './components/Repo';
import Spinner from './components/Spinner';
import { DIRECTION, SORT } from './constants/filter';
import useInfiniteScroll from './hooks/useInfiniteScroll';

const Wrapper = styled.div`
  margin: auto;
  padding: 25px;

  @media ${(props) => props.theme.device.laptop} {
    width: 80%;
  }
  @media ${(props) => props.theme.device.desktop} {
    width: 60%;
  }
`;

function App() {
  const [repos, setRepos] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    sort: 'created',
    direction: 'desc',
  });
  const loadingState = useState(true);
  const [isLoading, setLoading] = loadingState;

  const fetchData = (filtersParam, page) => fetch(`https://api.github.com/orgs/facebook/repos?${
    new URLSearchParams({
      ...filtersParam, page,
    })}`)
    .then((response) => {
      if (response.status === 403) {
        return Promise.reject(new Error({ msg: `Exceed the github api rate limit now.🤯 Please retry next hour. Ref:${response.body?.documentation_url}` }));
      }

      return response.json();
    })
    .catch(({ msg }) => {
      // eslint-disable-next-line no-alert
      alert(msg || 'Data Fetching Error! Please Retry.');
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

  const appendDataToRepos = (filtersParam = filters) => (page) => fetchData(
    filtersParam,
    page,
  )
    .then((data) => {
      setRepos((prevRepo) => prevRepo.concat(data));
      return data;
    });

  const {
    setInitialized,
    reset: resetInfiniteScroll,
  } = useInfiniteScroll(appendDataToRepos, setLoading);

  useEffect(() => {
    setDataToRepos(filters, 1).then(() => {
      setInitialized(true);
      setLoading(false);
    });
  }, []);

  const handleFiltersChange = (value, filterType) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    if ((filterType === SORT || filterType === DIRECTION) && !repos.length) return;

    setDataToRepos(newFilters, 1);
    resetInfiniteScroll();
  };

  return (
    <Wrapper>
      <Filters filters={filters} handleFiltersChange={handleFiltersChange} />
      {!repos.length && !isLoading
        && <p>This organization doesn’t have any repositories that match.</p>}
      {repos.map((repo) => <Repo key={repo.id} repo={repo} />)}
      {isLoading && <Spinner />}
    </Wrapper>
  );
}

export default App;
