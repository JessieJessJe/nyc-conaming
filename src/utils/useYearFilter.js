import { useEffect, useState } from "react";

const useYearFilter = ({ref}) => {
  const [year, setYear] = useState("all");

  useEffect(() => {
      setYear(ref.current.value); 
  }, [ref]);

  return year;
};

export default useYearFilter;

