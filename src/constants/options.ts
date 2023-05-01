//Product constants
export enum PRODUCT_TYPE_VALUE {
  SUPPLIES = 'SUPPLIES',
  RAW_MATERIAL = 'RAW_MATERIAL',
  FINISHED_GOOD = 'FINISHED_GOOD',
  WORK_IN_PROGRESS = 'WORK_IN_PROGRESS',
}

export const PRODUCT_TYPE_LABEL = {
  [PRODUCT_TYPE_VALUE.SUPPLIES]: 'Supplies',
  [PRODUCT_TYPE_VALUE.RAW_MATERIAL]: 'Raw Material',
  [PRODUCT_TYPE_VALUE.FINISHED_GOOD]: 'Finished Good',
  [PRODUCT_TYPE_VALUE.WORK_IN_PROGRESS]: 'Work In Progress',
};

export const PRODUCT_TYPE_OPTIONS = [
  {
    id: 1,
    label: PRODUCT_TYPE_LABEL[PRODUCT_TYPE_VALUE.SUPPLIES],
    value: PRODUCT_TYPE_VALUE.SUPPLIES,
  },
  {
    id: 2,
    label: PRODUCT_TYPE_LABEL[PRODUCT_TYPE_VALUE.RAW_MATERIAL],
    value: PRODUCT_TYPE_VALUE.RAW_MATERIAL,
  },
  {
    id: 3,
    label: PRODUCT_TYPE_LABEL[PRODUCT_TYPE_VALUE.FINISHED_GOOD],
    value: PRODUCT_TYPE_VALUE.FINISHED_GOOD,
  },
  {
    id: 4,
    label: PRODUCT_TYPE_LABEL[PRODUCT_TYPE_VALUE.WORK_IN_PROGRESS],
    value: PRODUCT_TYPE_VALUE.WORK_IN_PROGRESS,
  },
];

//User constants
export enum USER_ROLES {
  MANAGER = 'manager',
  ADMIN = 'admin',
  STAFF = 'staff',
}

export const USER_ROLE_LABEL = {
  [USER_ROLES.MANAGER]: 'Manager',
  [USER_ROLES.ADMIN]: 'Admin',
  [USER_ROLES.STAFF]: 'Staff',
};

export const USER_TYPE_OPTIONS = [
  {
    id: 1,
    label: 'All',
    value: 'all',
  },
  {
    id: 2,
    label: USER_ROLE_LABEL[USER_ROLES.MANAGER],
    value: USER_ROLES.MANAGER,
  },
  {
    id: 3,
    label: USER_ROLE_LABEL[USER_ROLES.ADMIN],
    value: USER_ROLES.ADMIN,
  },
  {
    id: 4,
    label: USER_ROLE_LABEL[USER_ROLES.STAFF],
    value: USER_ROLES.STAFF,
  },
];
