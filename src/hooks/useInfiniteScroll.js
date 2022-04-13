import { useEffect, useState } from 'react';

const useInfiniteScroll = (fetchData, loadingState) => {
  const [isInitialized, setInitialized] = useState(false);
  const [isLoading, setLoading] = loadingState;
  const [isFinished, setFinished] = useState(false);
  const [page, setPage] = useState(2);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop
      < (document.documentElement.offsetHeight - 120)) return;

    if (!isFinished) setLoading(true);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFinished]);

  useEffect(() => {
    if (!isLoading || isFinished || !isInitialized) return;

    fetchData()(page).then((data) => {
      if (data.length < 30) {
        setFinished(true);
      } else {
        setPage((prev) => prev + 1);
      }
      setLoading(false);
    });
  }, [isLoading]);

  const reset = () => {
    setPage(2);
    setFinished(false);
  };

  return {
    setInitialized, reset,
  };
};

export default useInfiniteScroll;
