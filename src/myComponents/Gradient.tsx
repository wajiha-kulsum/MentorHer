import Spline from '@splinetool/react-spline/next';

export default function Gradient() {
  return (
    <div className="h-screen w-screen p-[20px] pr-[16px] pl-[16px] pb-[25px] flex justify-center items-center">
      <div className="h-full w-full rounded-3xl overflow-hidden">
        <Spline scene="https://prod.spline.design/2TOJeyduGhMdX1gk/scene.splinecode" />
      </div>
    </div>
  );
}
