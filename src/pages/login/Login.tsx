import "./login.scss";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { login } from "../../redux/userReducer";

interface ILoginInputs {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const Login = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: ILoginInputs) => {
    const userInfo = await loginUser(data.email, data.password);
    dispatch(login(userInfo));

    navigate("/");
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="formGroup">
          <label>E-mail</label>
          <input
            {...register("email")}
            placeholder="Enter your email"
            className={errors.email?.message && "errorBorder"}
          />
          <p className="error">{errors.email?.message}</p>
        </div>
        <div className="formGroup">
          <label>Password</label>
          <input
            className={errors.password?.message && "errorBorder"}
            type="password"
            {...register("password")}
            placeholder="Enter your password"
          />
          <p className="error">{errors.password?.message}</p>
        </div>
        <button className="btn">Log In</button>
        <p className="message">
          Dont have account?{" "}
          <span>
            <Link to="/register">Go to register page</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
