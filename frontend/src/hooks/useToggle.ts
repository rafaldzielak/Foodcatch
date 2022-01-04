import { useState } from "react";

function useToggle(initialValue?: boolean): readonly [boolean, (valueToSet?: boolean) => void] {
  const [value, setValue] = useState<boolean>(initialValue || false);

  const toggle = (valueToSet?: boolean) => {
    if (value !== undefined) setValue(valueToSet!);
    else setValue((prev) => !prev);
  };

  return [value, toggle] as const;
}

export default useToggle;
