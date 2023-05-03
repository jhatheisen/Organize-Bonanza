import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const SplashPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  if (sessionUser) return history.push("/products");

  return (
    <>
    <p>Please login or signup to use our service</p>
    </>
  )
}

export default SplashPage;
