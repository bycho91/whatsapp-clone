import { Circle } from "better-react-spinkit";

const Loading = () => {
  return (
    <center className="h-screen grid place-content-center">
      <div>
        <img
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png"
          alt="logo"
          className="h-[200px] mb-[10px]"
        />
        <Circle color="#3CBC28" size={60} />
      </div>
    </center>
  );
};

export default Loading;
