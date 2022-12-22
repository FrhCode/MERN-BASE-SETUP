import { Location, useLocation, useNavigate } from "react-router-dom";

export default function useNavigateNext() {
  const navigate = useNavigate();
  const location = useLocation();

  return (defaultTarget: string) => {
    const query = location.search;
    const regex = /\/[a-z\/]*/i;

    const nextPage = query.match(regex)
      ? query.match(regex)![0]
      : defaultTarget;

    navigate(nextPage);
  };
}
