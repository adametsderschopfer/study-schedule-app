import React from "react";
import {
  StyledUserProfileBarEmail,
  StyledUserProfileBarIcon,
  StyledUserProfileBarWrapper,
} from "@ui/components/user/user-profile/user-profile-bar/styled";
import { useAppSelector } from "@store/hooks";
import { selectUser } from "@store/modules/user/selector";

interface UserProfileBarProps {
  className?: string;
}

export const UserProfileBar: React.FC<UserProfileBarProps> = (props) => {
  const {
    data: { email },
  } = useAppSelector(selectUser);

  return (
    <StyledUserProfileBarWrapper className={props.className}>
      <StyledUserProfileBarEmail>{email}</StyledUserProfileBarEmail>

      <StyledUserProfileBarIcon>
        <svg
          width={"40"}
          height={"40"}
          viewBox={"0 0 40 40"}
          fill={"none"}
          xmlns={"http://www.w3.org/2000/svg"}
        >
          <path
            d={
              "M27 29V27C27 25.9391 26.5786 24.9217 25.8284 24.1716C25.0783 23.4214 24.0609 23 23 23H17C15.9391 23 14.9217 23.4214 14.1716 24.1716C13.4214 24.9217 13 25.9391 13 27V29"
            }
            stroke={"currentColor"}
            strokeWidth={"2"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
          />
          <path
            d={
              "M20 19C22.2091 19 24 17.2091 24 15C24 12.7909 22.2091 11 20 11C17.7909 11 16 12.7909 16 15C16 17.2091 17.7909 19 20 19Z"
            }
            stroke={"currentColor"}
            strokeWidth={"2"}
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
          />

          <rect
            x={"1"}
            y={"1"}
            width={"38"}
            height={"38"}
            rx={"19"}
            stroke={"#05B5E5"}
            strokeWidth={"2"}
          />
        </svg>
      </StyledUserProfileBarIcon>
    </StyledUserProfileBarWrapper>
  );
};
