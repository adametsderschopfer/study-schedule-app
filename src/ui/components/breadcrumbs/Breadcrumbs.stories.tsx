import { BrowserRouter } from "react-router-dom";
import { Breadcrumbs } from "@ui/components/breadcrumbs/Breadcrumbs";

export default {
  title: "ui/breadcrumbs",
  component: Breadcrumbs,
};

export const Preview = (): JSX.Element => (
  <BrowserRouter>
    <Breadcrumbs
      crumbs={[
        {
          title: "Факультеты",
          href: "/",
        },
        {
          title: "Географический факультет",
          href: "/",
        },
        {
          title: "Кафедра картографии и геоинформатикит",
          href: "/",
        },
      ]}
    />
  </BrowserRouter>
);
