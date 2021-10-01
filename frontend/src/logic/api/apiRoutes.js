//<--bases-->

const BASE = "https://codeweekapi.herokuapp.com";
const USER_BASE = `${BASE}/users`;
const COMPANY_BASE = `${BASE}/companies`;
const CORE_BASE = `${BASE}/core`;

//<--routes-->

//<user>

export const LOGIN = `${USER_BASE}/login/`;
export const REGISTER = `${USER_BASE}/register/`;

export const USER_INFO = `${USER_BASE}/user`;
export const USER_PROFILE = `${USER_BASE}/jsprofile`;
export const JOB_OFFERS = `${USER_BASE}/joboffers`;
export const JOB_OFFER_OPTIONS = `${JOB_OFFERS}/list_create`;
export const USER_LIST_OPTIONS = `${USER_BASE}/user-list`;

//<company>

export const COMPANY_PROFILE = `${COMPANY_BASE}/company_profile`;
export const COMPANY_POSITIONS = `${COMPANY_BASE}/positions`;
export const COMPANY_POSITION_OPTIONS = `${COMPANY_POSITIONS}/list_create/`;
export const COMPANY_SWIPING = `${COMPANY_POSITIONS}/match/`;
export const COMPANY_SWIPING_LIST_VIEW = `${COMPANY_SWIPING}list_view/`;

//<core>

export const OCCUPATIONS = `${CORE_BASE}/get_occupations`;
export const ONE_OCCUPATION = `${CORE_BASE}/occupations`;
export const OCCUPATION_CATEGORIES = `${CORE_BASE}/occupation_categories`;