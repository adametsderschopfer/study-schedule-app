import { StudyScheduleBuildingApi } from "@domain/entity/study-schedule/apis/Building";
import { StudyScheduleFacultyApi } from "@domain/entity/study-schedule/apis/Faculty";
import { StudyScheduleGroupApi } from "@domain/entity/study-schedule/apis/Group";
import { StudyScheduleRootApi } from "@domain/entity/study-schedule/apis/Root";
import { StudyScheduleScheduleApi } from "@domain/entity/study-schedule/apis/Schedule";
import { StudyScheduleSettingsApi } from "@domain/entity/study-schedule/apis/Settings";
import { StudyScheduleSubjectApi } from "@domain/entity/study-schedule/apis/Subject";
import { StudyScheduleTeacherApi } from "@domain/entity/study-schedule/apis/Teacher";

export class StudyScheduleApi {
  public static root = new StudyScheduleRootApi();
  public static settings = new StudyScheduleSettingsApi();
  public static building = new StudyScheduleBuildingApi();
  public static faculty = new StudyScheduleFacultyApi();
  public static teacher = new StudyScheduleTeacherApi();
  public static subject = new StudyScheduleSubjectApi();
  public static group = new StudyScheduleGroupApi();
  public static schedule = new StudyScheduleScheduleApi();
}
