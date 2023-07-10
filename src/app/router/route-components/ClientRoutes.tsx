import React from "react";
import { createLoadableComponent } from "@ui/components/async-loadable/CreateLoadableComponent";
import { useAppSelector } from "@store/hooks";
import { selectUser } from "@store/modules/user/selector";

const StudyScheduleRoutes = createLoadableComponent({
  loader: () =>
    import("@app/router/route-components/client/StudyScheduleRoutes"),
});

export const ClientRoutes: React.FC = () => {
  const user = useAppSelector(selectUser);

  return (
    <React.Fragment>
      {user.data.isStudyScheduleEnabled && <StudyScheduleRoutes />}
    </React.Fragment>
  );
};
