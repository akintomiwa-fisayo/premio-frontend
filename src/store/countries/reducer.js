import { actionTypes } from './action';


/*
  COUNTRY SAMPLE
  [id]: {
    value: 'nigeria',
    states: {
      [id]: {
        value: 'Abia',
        cities: [ "city 1", "city 2", "city 3", ]
      }
      [id]: {
        value: 'Lagos',
        cities: [ "city 1", "city 2", "city 3", ]
      }
    }
  }
*/
export const initState = {
  AF: {
    value: 'Afghanistan',
    states: false,
  },
  AL: {
    value: 'Albania',
    states: false,
  },
  DZ: {
    value: 'Algeria',
    states: false,
  },
  AD: {
    value: 'Andorra',
    states: false,
  },
  AO: {
    value: 'Angola',
    states: false,
  },
  AI: {
    value: 'Anguilla',
    states: false,
  },
  AG: {
    value: 'Antigua and Barbuda',
    states: false,
  },
  AR: {
    value: 'Argentina',
    states: false,
  },
  AM: {
    value: 'Armenia',
    states: false,
  },
  AU: {
    value: 'Australia',
    states: false,
  },
  AT: {
    value: 'Austria',
    states: false,
  },
  AZ: {
    value: 'Azerbaijan',
    states: false,
  },
  BS: {
    value: 'Bahamas',
    states: false,
  },
  BH: {
    value: 'Bahrain',
    states: false,
  },
  BD: {
    value: 'Bangladesh',
    states: false,
  },
  BB: {
    value: 'Barbados',
    states: false,
  },
  BY: {
    value: 'Belarus',
    states: false,
  },
  BE: {
    value: 'Belgium',
    states: false,
  },
  BZ: {
    value: 'Belize',
    states: false,
  },
  BJ: {
    value: 'Benin',
    states: false,
  },
  BM: {
    value: 'Bermuda',
    states: false,
  },
  BT: {
    value: 'Bhutan',
    states: false,
  },
  BO: {
    value: 'Bolivia',
    states: false,
  },
  BA: {
    value: 'Bosnia and Herzegovina',
    states: false,
  },
  BW: {
    value: 'Botswana',
    states: false,
  },
  BR: {
    value: 'Brazil',
    states: false,
  },
  BN: {
    value: 'Brunei Darussalam',
    states: false,
  },
  BG: {
    value: 'Bulgaria',
    states: false,
  },
  BF: {
    value: 'Burkina Faso',
    states: false,
  },
  BI: {
    value: 'Burundi',
    states: false,
  },
  KH: {
    value: 'Cambodia',
    states: false,
  },
  CM: {
    value: 'Cameroon',
    states: false,
  },
  CA: {
    value: 'Canada',
    states: false,
  },
  CV: {
    value: 'Cape Verde',
    states: false,
  },
  KY: {
    value: 'Cayman Islands',
    states: false,
  },
  CF: {
    value: 'Central African Republic',
    states: false,
  },
  TD: {
    value: 'Chad',
    states: false,
  },
  CL: {
    value: 'Chile',
    states: false,
  },
  CN: {
    value: 'China',
    states: false,
  },
  CO: {
    value: 'Colombia',
    states: false,
  },
  KM: {
    value: 'Comoros',
    states: false,
  },
  CG: {
    value: 'Congo',
    states: false,
  },
  CR: {
    value: 'Costa Rica',
    states: false,
  },
  HR: {
    value: 'Croatia (Hrvatska)',
    states: false,
  },
  CU: {
    value: 'Cuba',
    states: false,
  },
  CY: {
    value: 'Cyprus',
    states: false,
  },
  CZ: {
    value: 'Czech Republic',
    states: false,
  },
  DK: {
    value: 'Denmark',
    states: false,
  },
  DJ: {
    value: 'Djibouti',
    states: false,
  },
  DM: {
    value: 'Dominica',
    states: false,
  },
  DO: {
    value: 'Dominican Republic',
    states: false,
  },
  EC: {
    value: 'Ecuador',
    states: false,
  },
  EG: {
    value: 'Egypt',
    states: false,
  },
  SV: {
    value: 'El Salvador',
    states: false,
  },
  GQ: {
    value: 'Equatorial Guinea',
    states: false,
  },
  ER: {
    value: 'Eritrea',
    states: false,
  },
  EE: {
    value: 'Estonia',
    states: false,
  },
  ET: {
    value: 'Ethiopia',
    states: false,
  },
  FO: {
    value: 'Faroe Islands',
    states: false,
  },
  FJ: {
    value: 'Fiji',
    states: false,
  },
  FI: {
    value: 'Finland',
    states: false,
  },
  FR: {
    value: 'France',
    states: false,
  },
  GF: {
    value: 'French Guiana',
    states: false,
  },
  PF: {
    value: 'French Polynesia',
    states: false,
  },
  TF: {
    value: 'French Southern Territories',
    states: false,
  },
  GA: {
    value: 'Gabon',
    states: false,
  },
  GM: {
    value: 'Gambia',
    states: false,
  },
  GE: {
    value: 'Georgia',
    states: false,
  },
  DE: {
    value: 'Germany',
    states: false,
  },
  GH: {
    value: 'Ghana',
    states: false,
  },
  GR: {
    value: 'Greece',
    states: false,
  },
  GL: {
    value: 'Greenland',
    states: false,
  },
  GD: {
    value: 'Grenada',
    states: false,
  },
  GP: {
    value: 'Guadeloupe',
    states: false,
  },
  GU: {
    value: 'Guam',
    states: false,
  },
  GT: {
    value: 'Guatemala',
    states: false,
  },
  GN: {
    value: 'Guinea',
    states: false,
  },
  GW: {
    value: 'Guinea-Bissau',
    states: false,
  },
  GY: {
    value: 'Guyana',
    states: false,
  },
  HT: {
    value: 'Haiti',
    states: false,
  },
  HN: {
    value: 'Honduras',
    states: false,
  },
  HK: {
    value: 'Hong Kong',
    states: false,
  },
  HU: {
    value: 'Hungary',
    states: false,
  },
  IS: {
    value: 'Iceland',
    states: false,
  },
  IN: {
    value: 'India',
    states: false,
  },
  IM: {
    value: 'Isle of Man',
    states: false,
  },
  ID: {
    value: 'Indonesia',
    states: false,
  },
  IR: {
    value: 'Iran',
    states: false,
  },
  IQ: {
    value: 'Iraq',
    states: false,
  },
  IE: {
    value: 'Ireland',
    states: false,
  },
  IL: {
    value: 'Israel',
    states: false,
  },
  IT: {
    value: 'Italy',
    states: false,
  },
  CI: {
    value: 'Ivory Coast',
    states: false,
  },
  JE: {
    value: 'Jersey',
    states: false,
  },
  JM: {
    value: 'Jamaica',
    states: false,
  },
  JP: {
    value: 'Japan',
    states: false,
  },
  JO: {
    value: 'Jordan',
    states: false,
  },
  KZ: {
    value: 'Kazakhstan',
    states: false,
  },
  KE: {
    value: 'Kenya',
    states: false,
  },
  KI: {
    value: 'Kiribati',
    states: false,
  },
  KP: {
    value: 'North Korea',
    states: false,
  },
  KR: {
    value: 'South Korea',
    states: false,
  },
  XK: {
    value: 'Kosovo',
    states: false,
  },
  KW: {
    value: 'Kuwait',
    states: false,
  },
  KG: {
    value: 'Kyrgyzstan',
    states: false,
  },
  LA: {
    value: 'Lao',
    states: false,
  },
  LV: {
    value: 'Latvia',
    states: false,
  },
  LB: {
    value: 'Lebanon',
    states: false,
  },
  LS: {
    value: 'Lesotho',
    states: false,
  },
  LR: {
    value: 'Liberia',
    states: false,
  },
  LY: {
    value: 'Libyan Arab Jamahiriya',
    states: false,
  },
  LI: {
    value: 'Liechtenstein',
    states: false,
  },
  LT: {
    value: 'Lithuania',
    states: false,
  },
  LU: {
    value: 'Luxembourg',
    states: false,
  },
  MK: {
    value: 'Macedonia',
    states: false,
  },
  MG: {
    value: 'Madagascar',
    states: false,
  },
  MW: {
    value: 'Malawi',
    states: false,
  },
  MY: {
    value: 'Malaysia',
    states: false,
  },
  MV: {
    value: 'Maldives',
    states: false,
  },
  ML: {
    value: 'Mali',
    states: false,
  },
  MT: {
    value: 'Malta',
    states: false,
  },
  MH: {
    value: 'Marshall Islands',
    states: false,
  },
  MQ: {
    value: 'Martinique',
    states: false,
  },
  MR: {
    value: 'Mauritania',
    states: false,
  },
  MU: {
    value: 'Mauritius',
    states: false,
  },
  MX: {
    value: 'Mexico',
    states: false,
  },
  FM: {
    value: 'Micronesia, Federated States of',
    states: false,
  },
  MD: {
    value: 'Moldova, Republic of',
    states: false,
  },
  MC: {
    value: 'Monaco',
    states: false,
  },
  MN: {
    value: 'Mongolia',
    states: false,
  },
  ME: {
    value: 'Montenegro',
    states: false,
  },
  MS: {
    value: 'Montserrat',
    states: false,
  },
  MA: {
    value: 'Morocco',
    states: false,
  },
  MZ: {
    value: 'Mozambique',
    states: false,
  },
  MM: {
    value: 'Myanmar',
    states: false,
  },
  NA: {
    value: 'Namibia',
    states: false,
  },
  NR: {
    value: 'Nauru',
    states: false,
  },
  NP: {
    value: 'Nepal',
    states: false,
  },
  NL: {
    value: 'Netherlands',
    states: false,
  },
  AN: {
    value: 'Netherlands Antilles',
    states: false,
  },
  NC: {
    value: 'New Caledonia',
    states: false,
  },
  NZ: {
    value: 'New Zealand',
    states: false,
  },
  NI: {
    value: 'Nicaragua',
    states: false,
  },
  NE: {
    value: 'Niger',
    states: false,
  },
  NG: {
    value: 'Nigeria',
    states: false,
  },
  MP: {
    value: 'Northern Mariana Islands',
    states: false,
  },
  NO: {
    value: 'Norway',
    states: false,
  },
  OM: {
    value: 'Oman',
    states: false,
  },
  PK: {
    value: 'Pakistan',
    states: false,
  },
  PW: {
    value: 'Palau',
    states: false,
  },
  PS: {
    value: 'Palestine',
    states: false,
  },
  PA: {
    value: 'Panama',
    states: false,
  },
  PG: {
    value: 'Papua New Guinea',
    states: false,
  },
  PY: {
    value: 'Paraguay',
    states: false,
  },
  PE: {
    value: 'Peru',
    states: false,
  },
  PH: {
    value: 'Philippines',
    states: false,
  },
  PL: {
    value: 'Poland',
    states: false,
  },
  PT: {
    value: 'Portugal',
    states: false,
  },
  PR: {
    value: 'Puerto Rico',
    states: false,
  },
  QA: {
    value: 'Qatar',
    states: false,
  },
  RE: {
    value: 'Reunion',
    states: false,
  },
  RO: {
    value: 'Romania',
    states: false,
  },
  RU: {
    value: 'Russian Federation',
    states: false,
  },
  RW: {
    value: 'Rwanda',
    states: false,
  },
  KN: {
    value: 'Saint Kitts and Nevis',
    states: false,
  },
  LC: {
    value: 'Saint Lucia',
    states: false,
  },
  VC: {
    value: 'Saint Vincent and the Grenadines',
    states: false,
  },
  WS: {
    value: 'Samoa',
    states: false,
  },
  SM: {
    value: 'San Marino',
    states: false,
  },
  ST: {
    value: 'Sao Tome and Principe',
    states: false,
  },
  SA: {
    value: 'Saudi Arabia',
    states: false,
  },
  SN: {
    value: 'Senegal',
    states: false,
  },
  RS: {
    value: 'Serbia',
    states: false,
  },
  SC: {
    value: 'Seychelles',
    states: false,
  },
  SL: {
    value: 'Sierra Leone',
    states: false,
  },
  SG: {
    value: 'Singapore',
    states: false,
  },
  SK: {
    value: 'Slovakia',
    states: false,
  },
  SI: {
    value: 'Slovenia',
    states: false,
  },
  SB: {
    value: 'Solomon Islands',
    states: false,
  },
  SO: {
    value: 'Somalia',
    states: false,
  },
  ZA: {
    value: 'South Africa',
    states: false,
  },
  ES: {
    value: 'Spain',
    states: false,
  },
  LK: {
    value: 'Sri Lanka',
    states: false,
  },
  SH: {
    value: 'St. Helena',
    states: false,
  },
  PM: {
    value: 'St. Pierre and Miquelon',
    states: false,
  },
  SD: {
    value: 'Sudan',
    states: false,
  },
  SR: {
    value: 'Suriname',
    states: false,
  },
  SJ: {
    value: 'Svalbard and Jan Mayen Islands',
    states: false,
  },
  SZ: {
    value: 'Swaziland',
    states: false,
  },
  SE: {
    value: 'Sweden',
    states: false,
  },
  CH: {
    value: 'Switzerland',
    states: false,
  },
  SY: {
    value: 'Syrian Arab Republic',
    states: false,
  },
  TW: {
    value: 'Taiwan',
    states: false,
  },
  TJ: {
    value: 'Tajikistan',
    states: false,
  },
  TZ: {
    value: 'Tanzania',
    states: false,
  },
  TH: {
    value: 'Thailand',
    states: false,
  },
  TG: {
    value: 'Togo',
    states: false,
  },
  TK: {
    value: 'Tokelau',
    states: false,
  },
  TO: {
    value: 'Tonga',
    states: false,
  },
  TT: {
    value: 'Trinidad and Tobago',
    states: false,
  },
  TN: {
    value: 'Tunisia',
    states: false,
  },
  TR: {
    value: 'Turkey',
    states: false,
  },
  TM: {
    value: 'Turkmenistan',
    states: false,
  },
  TV: {
    value: 'Tuvalu',
    states: false,
  },
  UG: {
    value: 'Uganda',
    states: false,
  },
  UA: {
    value: 'Ukraine',
    states: false,
  },
  AE: {
    value: 'United Arab Emirates',
    states: false,
  },
  GB: {
    value: 'United Kingdom',
    states: false,
  },
  US: {
    value: 'United States',
    states: false,
  },
  UM: {
    value: 'United States minor outlying islands',
    states: false,
  },
  UY: {
    value: 'Uruguay',
    states: false,
  },
  UZ: {
    value: 'Uzbekistan',
    states: false,
  },
  VU: {
    value: 'Vanuatu',
    states: false,
  },
  VE: {
    value: 'Venezuela',
    states: false,
  },
  VN: {
    value: 'Vietnam',
    states: false,
  },
  VI: {
    value: 'Virgin Islands (U.S.)',
    states: false,
  },
  WF: {
    value: 'Wallis and Futuna Islands',
    states: false,
  },
  YE: {
    value: 'Yemen',
    states: false,
  },
  ZM: {
    value: 'Zambia',
    states: false,
  },
  ZW: {
    value: 'Zimbabwe',
    states: false,
  },
};

function reducer(state = initState, action) {
  switch (action.type) {
    case actionTypes.SET_COUNTRY_STATES:
      return {
        ...state,
        [action.countryId]: {
          value: state[action.countryId].value,
          states: action.states,
        },
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        ...{ isLoggedIn: false },
      };
    case actionTypes.CHANGE_USER:
      return {
        ...state,
        user: {
          ...initState.user,
          ...action.user,
        },
      };
    default:
      return state;
  }
}

export default reducer;
