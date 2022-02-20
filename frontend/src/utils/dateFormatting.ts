export const getCurrentDateWithoutTime = () => new Date(new Date().setHours(0, 0, 0, 0));

export const compareDates = (
  chosenDate: Date,
  setChosenDate: (value: React.SetStateAction<Date>) => void
) => {
  const currentDate = getCurrentDateWithoutTime();
  if (chosenDate >= currentDate) return chosenDate;
  setChosenDate(currentDate);
  return currentDate;
};
