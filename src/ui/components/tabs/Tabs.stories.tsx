import {
  StyledTab,
  StyledTabList,
  StyledTabPanel,
  StyledTabs,
} from "@ui/components/tabs/styled";

export default {
  title: "ui/tabs",
};

export const Default = (): JSX.Element => (
  <StyledTabs>
    <StyledTabList>
      <StyledTab>Title 1</StyledTab>
      <StyledTab>Title 2</StyledTab>
      <StyledTab>Title 3</StyledTab>
    </StyledTabList>

    <StyledTabPanel>
      <h2>Any content 1</h2>
    </StyledTabPanel>
    <StyledTabPanel>
      <h2>Any content 2</h2>
    </StyledTabPanel>
    <StyledTabPanel>
      <h2>Any content 3</h2>
    </StyledTabPanel>
  </StyledTabs>
);
