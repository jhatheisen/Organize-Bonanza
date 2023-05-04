import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import splashPic from './splashPic.jpg'

const SplashPage = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  if (sessionUser) return history.push("/products");

  const demoLogin = async (e) => {
    await dispatch(sessionActions.login({credential: "DemoUser1", password: "password1"}));
    history.push(`/orders`)
  }

  return (
    <div className="flex justify-between">
      <div className="m-4 w-[40%]">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-zinc-800">Organize Bonanza</h1>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-full"/>
        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-800">The best site for managing your inventory and orders.</h2>
        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-800">If you are a new member signup at the top with your access code.</h2>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 w-full"/>
        <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-zinc-800">Click to try our demo.</h2>
        <li className='mr-6 flex p-2'>
          <button onClick={demoLogin} className='bg-blue-500 hover:bg-blue-700 text-white text-2xl font-bold py-4 px-5 rounded'>Demo User</button>
        </li>
      </div>
      <img className="w-[55%] rounded m-4 object-cover" src={splashPic}/>
    </div>
  )
}

export default SplashPage;
