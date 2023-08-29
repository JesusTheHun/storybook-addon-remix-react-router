import { useLocation } from 'react-router-dom';

export const useCurrentUrl = () => {
  const location = useLocation();

  let url = location.pathname;

  if (location.search.length > 0) {
    url += `?${location.search}`;
  }

  if (location.hash.length > 0) {
    url += `#${location.hash}`;
  }

  return url;
};
