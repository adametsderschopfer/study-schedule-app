import styled from "styled-components";

export const StyledLogin = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledLoginHead = styled.div`
  margin-bottom: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  top: 15%;
`;

export const StyledLoginIcon = styled.div`
  margin-bottom: 15px;
`;

export const StyledLoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;

  width: 100%;
  max-width: 380px;
`;

export const StyledLoginFields = styled.fieldset`
  width: 100%;
  border: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-bottom: 25px;
  padding: 0;
`;
