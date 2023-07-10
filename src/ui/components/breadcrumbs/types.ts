export type TCrumb = {
  title: string;
  href?: string;
};

export interface IBreadcrumbsProps {
  crumbs: TCrumb[];
}
