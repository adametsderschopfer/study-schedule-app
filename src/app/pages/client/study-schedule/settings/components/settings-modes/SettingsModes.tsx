import { theme } from "@config/theme";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { DropdownMenu } from "@ui/components/dropdown-menu/DropdownMenu";
import { EmptyList } from "@ui/components/empty-list/EmptyList";
import { PageLoader } from "@ui/components/page-loader/PageLoader";
import { RemoveButton } from "@ui/components/remove-button/RemoveButton";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { settingsSlice } from "@store/modules";
import {
  loadSettingsModesAction,
  onModeDeleteAction,
  renameModeAction,
} from "@store/modules/study-schedule/sections/settings/actions";
import { selectStudyScheduleSettings } from "@store/modules/study-schedule/sections/settings/selector";
import {
  TSettingsMode,
  TSettingsModeLesson,
} from "@domain/entity/study-schedule";
import {
  StyledSettingsModesItem,
  StyledSettingsModesItems,
  StyledSettingsModesItemWrapper,
  StyledSettingsModesWrapper,
} from "@app/pages/client/study-schedule/settings/components/settings-modes/styled";

const langBasePath = "app.features.study-schedule.settings.settings-modes";

export const SettingsModes: React.FC = () => {
  const { modes, currentModeId, loading, pagination } = useAppSelector(
    selectStudyScheduleSettings,
  );

  const scrollParentRef = useRef<HTMLDivElement>();

  const [savedBeforeRenameValue, setSavedBeforeRenameValue] = useState("");
  const [errorEmpty, setErrorEmpty] = useState<number>();
  const [renameValue, setRenameValue] = useState("");
  const [renamingLessons, setRenamingLessons] = useState<TSettingsModeLesson[]>(
    [],
  );
  const [renamingId, setRenamingId] = useState<number>(-1);

  const refsById = useMemo(() => {
    const refs: Record<number, any> = {};

    if (modes?.length) {
      modes.forEach((mode) => {
        refs[mode.id as number] = React.createRef();
      });
    }

    return refs;
  }, [modes]);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  function onItemSelect(item: TSettingsMode): void {
    if (renamingId === item.id) {
      return;
    }

    onModeRenameCancel();
    dispatch(settingsSlice.actions.onCurrentModeChange(item));
  }

  function onModeRenameStart(id: number, lessons: TSettingsModeLesson[]): void {
    setRenamingId(id);
    setRenamingLessons(lessons);

    const element = refsById[id].current;

    setSavedBeforeRenameValue(element.innerText.trim());
    setRenameValue(element.innerText.trim());

    element.focus();
    document?.getSelection()?.collapse(element, 1);
  }

  function onModeRenameEnd(options?: { isBlur: boolean }): void {
    if (renamingId === -1) {
      return;
    }

    if (renameValue.length === 0) {
      if (!errorEmpty) {
        setErrorEmpty(toast.error(t("app.validation.cantBeEmpty")) as number);
      }

      if (options?.isBlur) {
        onModeRenameCancel();
      }
      return;
    }

    if (renameValue.length < 3) {
      toast.error(t("app.validation.lengthMoreThan3"));

      if (options?.isBlur) {
        onModeRenameCancel();
      }
      return;
    }

    if (renameValue !== savedBeforeRenameValue) {
      dispatch(
        renameModeAction({
          newName: renameValue,
          modeId: renamingId,
          lessons: renamingLessons,
        }),
      );
    } else {
      toast.info(
        t(
          "app.features.study-schedule.settings.settings-modes.editingCanceled",
        ),
      );
    }

    setRenameValue("");
    setSavedBeforeRenameValue("");
    setRenamingId(-1);
    setRenamingLessons([]);
  }

  function onModeRenameCancel(): void {
    if (renamingId === -1) {
      return;
    }

    const element = refsById[renamingId].current;

    element.innerText = savedBeforeRenameValue;

    setRenamingId(-1);
    setRenamingLessons([]);
    setRenameValue("");
    setSavedBeforeRenameValue("");

    toast.info(
      t("app.features.study-schedule.settings.settings-modes.editingCanceled"),
    );
  }

  function onModeNameChange(event: React.ChangeEvent<HTMLDivElement>): void {
    setRenameValue(event.target.innerText.trim());
  }

  function onKeyDown(event: React.KeyboardEvent): void {
    if (event.code === "Enter") {
      event.stopPropagation();
      event.preventDefault();

      setErrorEmpty(0);

      onModeRenameEnd();
    } else if (event.code === "Escape") {
      onModeRenameCancel();
    }
  }

  if (!modes.length) {
    return (
      <EmptyList
        title={t(`${langBasePath}.emptyModesTitle`)}
        description={t(`${langBasePath}.emptyModesDescription`)}
      />
    );
  }

  return (
    <StyledSettingsModesWrapper
      pageStart={1}
      useWindow={false}
      getScrollParent={(): HTMLDivElement =>
        scrollParentRef.current as HTMLDivElement
      }
      loadMore={(pageNumber): void => {
        dispatch(
          loadSettingsModesAction({
            page: pageNumber,
          }),
        );
      }}
      hasMore={
        loading === "still-loading" ? false : pagination?.total !== modes.length
      }>
      <StyledSettingsModesItems
        ref={scrollParentRef as React.MutableRefObject<HTMLDivElement>}>
        {modes.map((item, modeIndex) => {
          const isActive = currentModeId === item.id;

          return (
            <StyledSettingsModesItemWrapper
              key={`Settings_modes_item_${item.id}`}
              isActive={currentModeId === item.id}>
              <StyledSettingsModesItem
                onClick={(): void => onItemSelect(item)}
                isActive={isActive}
                onKeyDown={onKeyDown}
                onBlur={(): void => onModeRenameEnd({ isBlur: true })}
                onInput={onModeNameChange}
                tabIndex={-1}
                ref={refsById[item.id as number]}
                suppressContentEditableWarning={true}
                contentEditable={renamingId === item.id ? "true" : "false"}>
                {item.name}
              </StyledSettingsModesItem>

              <DropdownMenu
                triggerBg={(isActive && "#ffffff") || undefined}
                triggerSpanBg={(isActive && "#ffffff") || undefined}
                triggerSpanBgHover={
                  (isActive && theme.colors.primary) || undefined
                }
                position={
                  modes.length === 1
                    ? "bottom-left"
                    : modeIndex === modes.length - 1
                    ? "top-left"
                    : undefined
                }
                items={[
                  {
                    name: t(
                      "app.features.study-schedule.settings.settings-modes.rename",
                    ),
                    props: {
                      onClick: () =>
                        onModeRenameStart(item.id as number, item.lessons),
                    },
                  },
                  {
                    name: t(
                      "app.features.study-schedule.settings.settings-modes.delete",
                    ),
                    component: RemoveButton,
                    props: {
                      headerTitle: t(
                        "app.features.study-schedule.settings.settings-modes.ModeRemoveTitle",
                      ),
                      onRemoveComplete: () =>
                        dispatch(onModeDeleteAction(item.id)),
                    },
                  },
                ]}
              />
            </StyledSettingsModesItemWrapper>
          );
        })}
        {loading === "still-loading" && <PageLoader />}
      </StyledSettingsModesItems>
    </StyledSettingsModesWrapper>
  );
};
