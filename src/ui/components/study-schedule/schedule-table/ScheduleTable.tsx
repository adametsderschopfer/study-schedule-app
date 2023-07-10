import { DateTime } from "luxon";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { EmptyList } from "@ui/components/empty-list/EmptyList";
import { ErrorBoundary } from "@ui/components/error-boundary/ErrorBoundary";
import { ErrorView } from "@ui/components/error-view/ErrorView";
import {
  StyledScheduleTable,
  StyledScheduleTableBody,
  StyledScheduleTableBodyTd,
  StyledScheduleTableBodyTdEven,
  StyledScheduleTableBodyTdEvenWrapper,
  StyledScheduleTableBodyTdLesson,
  StyledScheduleTableBodyTdTime,
  StyledScheduleTableBodyTr,
  StyledScheduleTableHead,
  StyledScheduleTableHeadTdEven,
  StyledScheduleTableHeadTdWeekDay,
  StyledScheduleTableHeadTdWeekDayWrapper,
  StyledScheduleTableHeadThWeekDayName,
  StyledScheduleTableHeadThWeekDayNumber,
  StyledScheduleTableWrapper,
} from "@ui/components/study-schedule/schedule-table/styled";
import { useAppSelector } from "@store/hooks";
import { selectStudySchedule } from "@store/modules/study-schedule/selector";
import { DATE_FORMAT } from "@domain/app";
import {
  IScheduleItem,
  IScheduleTableRow,
  IScheduleTableRowCreator,
} from "@domain/entity/study-schedule/index";

export type CellParams = {
  date: DateTime;
  scheduleItem: IScheduleItem | null;
  row: IScheduleTableRow;
  cellIndex: number;
};

export interface ScheduleTableProps {
  table: IScheduleTableRowCreator;
  renderCell(params: CellParams): JSX.Element;
}

export const ScheduleTable: React.FC<ScheduleTableProps> = (props) => {
  const { type: moduleType } = useAppSelector(selectStudySchedule);
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const scrollWrapperRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (scrollWrapperRef.current) {
      const element = scrollWrapperRef.current as HTMLDivElement;
      let isMousePressed = false;

      element.addEventListener("mouseleave", (): void => {
        isMousePressed = false;
        element.style.userSelect = "initial";
      });

      element.addEventListener("mouseup", (): void => {
        isMousePressed = false;
        element.style.userSelect = "initial";
      });

      element.addEventListener("mousedown", (): void => {
        isMousePressed = true;
        element.style.userSelect = "none";
      });

      element.addEventListener("mousemove", (event): void => {
        if (isMousePressed) {
          scrollWrapperRef.current?.scrollTo(
            element.scrollLeft - event.movementX,
            element.scrollTop - event.movementY,
          );
        }
      });
    }
  }, [scrollWrapperRef]);

  if (props.table.rows.length === 0) {
    return (
      <EmptyList
        title={t(
          "app.pages.StudySchedule.orgStructure.schedule.emptyListTitle",
        )}
        description={t(
          `app.pages.StudySchedule.orgStructure.schedule.emptyListDescription.${moduleType}`,
        )}
      />
    );
  }

  return (
    <StyledScheduleTableWrapper ref={scrollWrapperRef}>
      <StyledScheduleTable>
        <StyledScheduleTableBody>
          <StyledScheduleTableHead>
            <StyledScheduleTableHeadTdEven></StyledScheduleTableHeadTdEven>

            <ErrorBoundary>
              {props.table.datesRow.map((item) => {
                const date = DateTime.fromFormat(item.date, DATE_FORMAT);

                return (
                  <StyledScheduleTableHeadTdWeekDay key={`col:${item.date}`}>
                    <StyledScheduleTableHeadTdWeekDayWrapper>
                      <StyledScheduleTableHeadThWeekDayName>
                        {date.toFormat("ccc", {
                          locale: language,
                        })}
                      </StyledScheduleTableHeadThWeekDayName>

                      <StyledScheduleTableHeadThWeekDayNumber>
                        {date.day}
                      </StyledScheduleTableHeadThWeekDayNumber>
                    </StyledScheduleTableHeadTdWeekDayWrapper>
                  </StyledScheduleTableHeadTdWeekDay>
                );
              })}
            </ErrorBoundary>
          </StyledScheduleTableHead>

          <ErrorBoundary>
            {props.table.rows.map((row, rowIndex) => (
              <StyledScheduleTableBodyTr key={`table_body_row_${rowIndex}`}>
                <StyledScheduleTableBodyTdEven>
                  <StyledScheduleTableBodyTdEvenWrapper>
                    <StyledScheduleTableBodyTdTime>
                      {row.info.time.start} - {row.info.time.end}
                    </StyledScheduleTableBodyTdTime>
                    <StyledScheduleTableBodyTdLesson>
                      {`${row.info.order} ${t(
                        `app.pages.StudySchedule.orgStructure.schedule.lesson.${moduleType}`,
                      )}`}
                    </StyledScheduleTableBodyTdLesson>
                  </StyledScheduleTableBodyTdEvenWrapper>
                </StyledScheduleTableBodyTdEven>

                {row.cells.map((item, cellIndex) => (
                  <StyledScheduleTableBodyTd
                    key={`table_body_schedule_item_${cellIndex}_in_row_{rowIndex}`}
                    isActive={false}>
                    {props.renderCell ? (
                      <ErrorBoundary>
                        {props.renderCell({
                          scheduleItem: item?.schedule ?? null,
                          row,
                          cellIndex,
                          date: DateTime.fromFormat(
                            item?.date || props.table.datesRow[cellIndex].date,
                            DATE_FORMAT,
                          ),
                        })}
                      </ErrorBoundary>
                    ) : (
                      <ErrorView
                        type={"SyntaxError"}
                        title={"Error"}
                        description={"Function { renderCell } not declared"}
                      />
                    )}
                  </StyledScheduleTableBodyTd>
                ))}
              </StyledScheduleTableBodyTr>
            ))}
          </ErrorBoundary>
        </StyledScheduleTableBody>
      </StyledScheduleTable>
    </StyledScheduleTableWrapper>
  );
};
