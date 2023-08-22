import { useLocation } from 'react-router-dom';

export const useCurrentUrl = () => {
  const location = useLocation();
  return `${location.pathname}?${location.search}${location.hash}`;
};
