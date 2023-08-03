interface ShowIfProps {
    value: boolean;
    children: JSX.Element;
  }
  
  export function ShowIf({ value, children }: ShowIfProps): JSX.Element | null {
    if (value !== false) {
      return children;
    }
    return null;
  }