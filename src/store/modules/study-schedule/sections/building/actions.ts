import { createAsyncThunk } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { appSlice } from "@store/modules/app/slice";
import { selectStudyScheduleBuilding } from "@store/modules/study-schedule/sections/building/selector";
import { RootState } from "@store/rootReducer";
import { TPaginationBase } from "@domain/app";
import { StudyScheduleApi } from "@domain/entity/study-schedule/api";
import {
  IBuildingClassroomEntity,
  IBuildingEntity,
  TBuildingLoadParams,
  TBuildingNew,
} from "@domain/entity/study-schedule/index";

export const loadBuildingAction = createAsyncThunk<
  TPaginationBase<IBuildingEntity[]>,
  TBuildingLoadParams
>("building/loadBuildingAction", async (params) => {
  return await StudyScheduleApi.building.getBuildings(params);
});

const splitClassroomIntoArray = (
  classroom: string,
): Omit<IBuildingClassroomEntity, "id">[] =>
  classroom.split(",").map((classroomName) => ({ name: classroomName.trim() }));

const convertClassroomRangeToList = (
  buildingClassrooms: IBuildingClassroomEntity[],
): IBuildingClassroomEntity[] =>
  buildingClassrooms
    .map((classroom) => {
      if (classroom.name.match("-")) {
        const classroomsFromRange = [];
        const classroomSplitResult = classroom.name.split("-");

        let start = parseInt(classroomSplitResult[0], 10);
        const end = parseInt(classroomSplitResult[1], 10);

        do {
          classroomsFromRange.push({
            name: start.toString(),
            id: v4(),
          });

          start++;
        } while (start !== end + 1);

        return classroomsFromRange;
      }

      return classroom;
    })
    .flat() as IBuildingClassroomEntity[];

export const createBuildingAction = createAsyncThunk<
  IBuildingEntity,
  TBuildingNew
>("building/createBuildingAction", async (buildingItem, thunkAPI) => {
  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  const buildingClassrooms: IBuildingClassroomEntity[] =
    splitClassroomIntoArray(buildingItem.building_classrooms).map((item) => ({
      ...item,
      id: v4(),
    }));

  try {
    return await StudyScheduleApi.building.addNewBuilding({
      ...buildingItem,
      building_classrooms: convertClassroomRangeToList(buildingClassrooms),
    });
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const editBuildingAction = createAsyncThunk<
  IBuildingEntity,
  Omit<IBuildingEntity, "building_classrooms"> & {
    building_classrooms: string;
  },
  {
    state: RootState;
  }
>("building/editBuildingAction", async (buildingItem, thunkAPI) => {
  const building = selectStudyScheduleBuilding(thunkAPI.getState());
  const currentBuildingItem = building.list.find(
    (item) => item.id === buildingItem.id,
  );

  thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(true));

  try {
    let buildingClassrooms: IBuildingClassroomEntity[] =
      splitClassroomIntoArray(buildingItem.building_classrooms);

    if (!currentBuildingItem) {
      return Promise.reject();
    }

    buildingClassrooms = buildingClassrooms.map((item) => ({
      ...item,
      id:
        currentBuildingItem.building_classrooms.find(
          (_item) => _item.name === item.name,
        )?.id || v4(),
    }));

    return await StudyScheduleApi.building.editBuilding({
      ...buildingItem,
      building_classrooms: convertClassroomRangeToList(buildingClassrooms),
    });
  } catch (error) {
    return Promise.reject();
  } finally {
    thunkAPI.dispatch(appSlice.actions.setActionLoaderStatus(false));
  }
});

export const deleteBuildingAction = createAsyncThunk<Id, Id>(
  "building/deleteBuildingAction",
  async (buildingId, { dispatch }) => {
    dispatch(appSlice.actions.setActionLoaderStatus(true));

    try {
      await StudyScheduleApi.building.deleteBuilding(buildingId);

      return buildingId;
    } catch (error) {
      return Promise.reject();
    } finally {
      dispatch(appSlice.actions.setActionLoaderStatus(false));
    }
  },
);
