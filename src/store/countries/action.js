export const actionTypes = {
  SET_COUNTRY_STATES: 'SET_COUNTRY_STATES',
  SET_COUNTRY_STATE_CITIES: 'SET_COUNTRY_STATE_CITIES',
};

export function setCountryStates(countryId, states) {
  return { type: actionTypes.SET_COUNTRY_STATES, countryId, states };
}

export function setCountryStateCities(countryId, stateId, cities) {
  return {
    type: actionTypes.SET_COUNTRY_STATE_CITIES, countryId, stateId, cities,
  };
}
