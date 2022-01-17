import { useCallback, useState } from "react";

function useToggle(initialValue?: boolean): readonly [boolean, (valueToSet?: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue || false);

  const toggle = useCallback((valueToSet?: boolean) => {
    if (valueToSet !== undefined) setValue(valueToSet!);
    else setValue((prev) => !prev);
  }, []);

  return [value, toggle] as const;
}

export default useToggle;
