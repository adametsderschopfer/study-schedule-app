import React, {
  ComponentPropsWithoutRef,
  PropsWithChildren,
  useState,
} from "react";
import { RemovePrompt } from "@ui/components/modals/RemovePrompt";

export interface RemoveButtonProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<"button"> {
  onRemoveComplete(): void;

  headerTitle: string;
  removeTitle?: string;
}

export const RemoveButton: React.FC<RemoveButtonProps> = (props) => {
  const [isRemovePrompt, setIsRemovePrompt] = useState(false);
  // eslint-disable-next-line react/destructuring-assignment
  const { headerTitle, onRemoveComplete, removeTitle, ...buttonProps } = props;

  return (
    <>
      <button
        {...buttonProps}
        onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
          setIsRemovePrompt(true);

          if (buttonProps.onClick) {
            buttonProps.onClick(event);
          }
        }}
      >
        {buttonProps.children}
      </button>

      <RemovePrompt
        headerTitle={headerTitle}
        removeTitle={removeTitle}
        isOpen={isRemovePrompt}
        onRemoveComplete={onRemoveComplete}
        onClose={(): void => setIsRemovePrompt(false)}
      />
    </>
  );
};
