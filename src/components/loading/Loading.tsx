import ReactLoading, { LoadingType } from "react-loading";

interface ILoading {
  type: LoadingType;
  color: string;
}

const Loading: React.FC<ILoading> = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={267} width={175} />
);

export default Loading;
