import {
  IModalBase,
  TPaginationParams,
  TSelectData,
  TSortField,
} from "@domain/app";
import { Roles } from "@domain/roles";
import { IDefaultStoreStructure, TLoading } from "../../store";

export const MAX_AVAILABLE_LESSONS = 14;
export const MAX_DAYS_AVAILABLE = 30;

export enum EStudyScheduleTypes {
  UNIVERSITY = "UNIVERSITY",
  COLLEGE = "COLLEGE",
  SCHOOL = "SCHOOL",
}

export enum ELevelsOfEducation {
  UNDERGRADUATE = 1,
  MASTER_DEGREE,
  SPECIALTY,
}

export enum EFormsOfEducation {
  FULL_TIME = 1,
  PART_TIME,
  CORRESPONDENCE,
}

export enum EYearsOfEducation {
  COURSE_1 = 1,
  COURSE_2,
  COURSE_3,
  COURSE_4,
  COURSE_5,
}

export enum EYearsOfEducationCollege {
  COURSE_1 = 1,
  COURSE_2,
  COURSE_3,
  COURSE_4,
}

export enum EYearsOfEducationSchool {
  CLASS_1 = 1,
  CLASS_2,
  CLASS_3,
  CLASS_4,
  CLASS_5,
  CLASS_6,
  CLASS_7,
  CLASS_8,
  CLASS_9,
  CLASS_10,
  CLASS_11,
}

export enum ESubGroupList {
  GROUP_COMMON = 0,
  GROUP_1,
  GROUP_2,
  GROUP_3,
  GROUP_4,
  GROUP_5,
  GROUP_6,
  GROUP_7,
  GROUP_8,
  GROUP_9,
  GROUP_10,
}

export enum ELevelsOfEducationSchool {
  _0 = "A",
  _1 = "Б",
  _2 = "В",
  _3 = "Г",
  _4 = "Д",
  _5 = "Е",
  _6 = "Ё",
  _7 = "Ж",
  _8 = "З",
  _9 = "И",
  _10 = "Й",
  _11 = "К",
  _12 = "Л",
  _13 = "М",
  _14 = "Н",
  _15 = "О",
  _16 = "П",
  _17 = "Р",
  _18 = "С",
  _19 = "Т",
  _20 = "У",
  _21 = "Ф",
  _22 = "Х",
  _23 = "Ц",
  _24 = "Ч",
  _25 = "Ш",
  _26 = "Щ",
  _27 = "Ъ",
  _28 = "Ы",
  _29 = "Ь",
  _30 = "Э",
  _31 = "Ю",
  _32 = "Я",
}

/** STUDY SCHEDULE >> */

export interface IStudyScheduleStore extends IDefaultStoreStructure {
  type: EStudyScheduleTypes;
}

export type TLoadStudyScheduleUserDataResponse = {
  email: string;
  name: string;
  role: Roles;
  type: number;
};

/** << STUDY SCHEDULE */

/** BUILDING >> */

export interface IBuildingClassroomEntity {
  id?: Id;
  name: string;
}

export type TBuildingLoadParams = TPaginationParams;

export interface IBuildingEntity {
  id: Id;
  name: string;
  address: string;
  building_classrooms: IBuildingClassroomEntity[];
}

export type TBuildingNew = Omit<
  IBuildingEntity,
  "id" | "building_classrooms"
> & {
  building_classrooms: string;
};

export type TBuildingInputs = Omit<
  IBuildingEntity,
  "id" | "building_classrooms"
> & {
  building_classrooms: string;
};

export interface IBuildingStore extends IDefaultStoreStructure {
  list: IBuildingEntity[];

  createModal: IModalBase;
  editModal: IModalBase;
}

/** << BUILDING */

/** SETTINGS >> */

export type TModeCreateAction = {
  name: string;
  lessonCount: number;
};

export type TSetting = {
  id: Id;
  name: string;
};

export type TSettingsMode = TSetting & {
  loading?: TLoading;
  schedule_setting_items?: TSettingLesson[];
  lessons: TSettingsModeLesson[];
};

export type TSettingLesson = {
  time_start: string;
  time_end: string;
};

export type TSettingsModeLesson = TSettingLesson & {
  isChanged?: boolean;
  isLoading?: boolean;
  isValid?: boolean;

  isNew?: boolean;
};

export type TimeChangeProps = {
  field: keyof TSettingsModeLesson;
  value: string;
  lessonIndex: Id;
};

export type TSettingsRenameModeAction = {
  newName: string;
  modeId: Id;
  lessons: TSettingsModeLesson[];
};

export interface ISettingsStore extends IDefaultStoreStructure {
  modes: TSettingsMode[];
  currentModeId?: Id;
  modeModalCreate: IModalBase;
}

/** << SETTINGS */

/** FACULTIES >> */

type IDepartmentModal = IModalBase & {
  facultyId?: Id;
};

export type TFacultyModalActionPayload = {
  status: boolean;
  itemId?: Id;
};

export type TDepartmentModalActionPayload = {
  status: boolean;
  facultyId: Id;
  itemId?: Id;
};

export interface IFacultyEntity {
  id: Id;
  name: string;
  departments: IDepartmentEntity[];
}

export interface IDepartmentEntity {
  id: Id;
  faculty_id: Id;
  name: string;

  groups?: IGroupEntity[];
}

export type TFacultyNew = Omit<IFacultyEntity, "id" | "departments">;
export type TFacultyEdit = Omit<IFacultyEntity, "departments">;
export type TFacultyInputs = Omit<IFacultyEntity, "id" | "departments">;

export type TDepartmentNew = Omit<IDepartmentEntity, "id">;
export type TDepartmentInputs = Omit<IDepartmentEntity, "id" | "faculty_id">;

export interface IFacultyStore extends IDefaultStoreStructure {
  faculties: IFacultyEntity[];

  createFacultyModal: IModalBase;
  editFacultyModal: IModalBase;

  createDepartmentModal: IDepartmentModal;
  editDepartmentModal: IDepartmentModal;
}

/** << FACULTIES */

/** GROUP >> */

export interface IGroupEntity {
  id: Id;
  department_id?: Id;
  teacher_id: Id;
  teacher: ITeacherEntity;
  name: string;
  sub_group: number;
  degree: number;
  letter: string;
  year_of_education: number;
  form_of_education: number;
}

export type TGroupNew = Omit<IGroupEntity, "id" | "teacher"> & {
  parentId?: Id;
};
export type TGroupInputs = Omit<IGroupEntity, "id" | "teacher">;

export type TLoadGroupParams = TPaginationParams & {
  parentId?: Id;
};

export type TGroupFilter = TSelectData<{
  fieldName: keyof IGroupEntity;
  substring: string;
}>;

export type TGroupNamedFilter = Partial<
  Record<keyof IGroupEntity, TGroupFilter>
>;

export interface IGroupStore extends IDefaultStoreStructure {
  filters: TGroupFilter[];
  list: IGroupEntity[];

  departmentId: Id;

  createModal: IModalBase;
  editModal: IModalBase;
}

/** << GROUP */

/** SUBJECT >> */

export interface ISubjectEntity {
  id: Id;
  name: string;
  department_id?: Id;
}

export type TSubjectNew = Omit<ISubjectEntity, "id">;
export type TSubjectActionInputs = Omit<
  ISubjectEntity,
  "id" | "department_id"
> & {
  isAddInAllDepartments: boolean;
};

export type TLoadSubjectParams = TPaginationParams & {
  departmentId?: Id;
  parentId?: Id;
};

export interface ISubjectStore extends IDefaultStoreStructure {
  list: ISubjectEntity[];

  createModal: IModalBase & {
    facultyId?: Id;
    departmentId?: Id;
  };
  editModal: IModalBase & {
    facultyId?: Id;
    departmentId?: Id;
  };
}

/** << SUBJECT */

/** TEACHER >> */

export interface ITeacherStore extends IDefaultStoreStructure {
  currentSortType?: TSortField;
  list: ITeacherEntity[];

  createModal: IModalBase;
  editModal: IModalBase;
}

export interface ITeacherEntity {
  id: Id;
  department_id: Id;
  full_name: string;
  position?: string;
  degree: string;
}

export type TLoadTeachersParams = TPaginationParams & {
  parentId?: Id;
};

export type TTeacherInputs = Omit<ITeacherEntity, "id" | "department_id">;
export type TTeacherNew = Omit<ITeacherEntity, "id"> & {
  parentId?: Id;
};
export type TTeacherEdit = ITeacherEntity & {
  parentId?: Id;
};

/** << TEACHER */

/** DEPARTMENT DETAIL >> */

export interface IFacultyDepartmentDetailEntity {
  id: Id;
  name: string;
  department: IDepartmentEntity;
  departments: IDepartmentEntity[];
}

export interface IFacultyDepartmentDetailStore extends IDefaultStoreStructure {
  detailInfo?: IFacultyDepartmentDetailEntity;
}

/** << DEPARTMENT DETAIL */

/** SCHEDULE common >> */

export enum EDayOfWeek {
  MONDAY = 1,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  // SUNDAY,
}

export enum EScheduleRepeatability {
  ONCE, // единоразово
  EVERY_WEEK, // каждую неделю (EVEN_WEEK & ODD_WEEK)
  EVEN_WEEK, // четная неделя
  ODD_WEEK, // нечетная неделя
}

export enum EScheduleType {
  LECTURE = 1, // Лекция
  INTERNSHIP, // Производственная практика
  EDUCATIONAL_PRACTICE, // Учебная практика
  CONSULTATION, // Консультация
  EXAM, // Экзамен
}

export interface IScheduleEntity {
  executionDate?: string;
  id: Id;
  department_id: Id;
  building_id: Id;
  building_classroom_id: Id;
  schedule_setting_id: Id;
  subject_id: Id;
  group_id: Id;
  teacher_id: Id;
  schedule_setting_item_order: number;
  day_of_week: EDayOfWeek;
  repeatability: number;
  type: number;
  sub_group: number;
  repeat_start: string;
  repeat_end: string;
}

export interface IScheduleItem extends IScheduleEntity {
  department: IDepartmentEntity;
  schedule_setting_item: TSettingLesson[];
  schedule_setting: TSetting;
  group: IGroupEntity;
  building: IBuildingEntity;
  building_classroom?: IBuildingClassroomEntity;
  subject: ISubjectEntity;
  teacher: ITeacherEntity;
}

export type IScheduleApiResultRepeatability = {
  id: Id;
  date: string;
};

export type IScheduleApiResult = {
  data: IScheduleItem[];
  repeatabilities: IScheduleApiResultRepeatability[];
};

export type IScheduleTableRowWeekInfo = {
  schedule_setting_id: Id;
  order: number;
  time: {
    start: string;
    end: string;
  };
};

export type IScheduleTableRowCell = {
  date: string;
  schedule: IScheduleItem;
};

export interface IScheduleTableRow {
  info: IScheduleTableRowWeekInfo;
  cells: (IScheduleTableRowCell | null)[];
}

export interface IScheduleTableRowDate {
  date: string;
}

export interface IScheduleTableRowCreator {
  datesRow: IScheduleTableRowDate[];
  rows: IScheduleTableRow[];
}

export type TScheduleInputs = Partial<Omit<IScheduleEntity, "id">>;
/** << SCHEDULE common */

/** GROUP_SCHEDULE >> */
export type ICreateGroupScheduleModal = IModalBase & {
  item?: Partial<IScheduleItem>;
};

export type IEditGroupScheduleModal = IModalBase & {
  item?: Partial<IScheduleItem>;
};

export type TLoadSchedulesParams =
  | Partial<TGetScheduleParams & TPaginationParams>
  | undefined;

export type TGetScheduleParams =
  | {
      date_start?: string;
      date_end?: string;

      degree?: ELevelsOfEducation;
      year_of_education?: EYearsOfEducationSchool;
      letter?: ELevelsOfEducationSchool | number;

      department_id?: Id;
      teacher_id?: Id;
      group_id?: Id;
      building_id?: Id;
      building_classroom_id?: Id;
    }
  | undefined;

export interface IGroupScheduleStore extends IDefaultStoreStructure {
  list: IScheduleItem[];
  detailGroup: IGroupEntity;

  currentDate?: Date;
  dateStart?: string;
  dateEnd?: string;

  createModal: ICreateGroupScheduleModal;
  editModal: IEditGroupScheduleModal;
}
/** << GROUP_SCHEDULE */

/** SCHEDULE >> */
export type TSchedulePageFilter = {
  date_start: string;
  date_end?: string | undefined;
} & Omit<TGetScheduleParams, "date_start" | "date_end">;

export type TScheduleSetFilterPayload = {
  name: keyof TSchedulePageFilter | string;
  value: TSchedulePageFilter[keyof TSchedulePageFilter];
};

export interface IScheduleStore extends IDefaultStoreStructure {
  displayLoading: TLoading;
  xlsLoading: TLoading;

  list: IScheduleItem[];
  filter: TSchedulePageFilter;
}
/** << SCHEDULE */
