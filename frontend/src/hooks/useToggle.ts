import { useState } from "react";

function useToggle(initialValue?: boolean): readonly [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue || false);

  const toggle = () => setValue((prev) => !prev);

  return [value, toggle] as const;
}

export default useToggle;
