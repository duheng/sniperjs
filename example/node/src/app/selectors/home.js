import { createSelector, } from 'reselect';


const getHome = state => {
  const { homeData, } = { ...state.home, };
  return {
    homeData
  };
};

export default createSelector(getHome, (home) => {
  return {
    home,
  };
});
