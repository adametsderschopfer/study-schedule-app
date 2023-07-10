import { RootState } from "@store/rootReducer";
import { IStudyScheduleStore } from "@domain/entity/study-schedule";

export const selectStudySchedule = (state: RootState): IStudyScheduleStore =>
  state.modules.studySchedule.root;
