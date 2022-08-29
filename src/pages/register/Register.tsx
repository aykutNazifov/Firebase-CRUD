import "./register.scss";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerUser } from "../../firebase";
import { useNavigate } from "react-router-dom";

interface IRegisterInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInputs>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = (data: IRegisterInputs) => {
    registerUser(data.email, data.password);
    navigate("/login");
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
        <div className="formGroup">
          <label>Confirm Password</label>
          <input
            className={errors.confirmPassword?.message && "errorBorder"}
            type="password"
            {...register("confirmPassword")}
            placeholder="Enter your password"
          />
          <p className="error">{errors.confirmPassword?.message}</p>
        </div>
        <button className="btn">Register</button>
        <p className="message">
          Already has account?{" "}
          <span>
            <Link to="/login">Go to login page</Link>
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
