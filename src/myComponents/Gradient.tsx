import Spline from '@splinetool/react-spline/next';

export default function Gradient() {
  return (
    <div className="relative h-screen w-screen p-[20px] pr-[16px] pl-[16px] pb-[25px] flex">
      {/* Spline Background */}
      <div className="h-full w-full rounded-3xl overflow-hidden">
        <Spline scene="https://prod.spline.design/2TOJeyduGhMdX1gk/scene.splinecode" />
      </div>
      
      {/* Text Overlay with special font treatment */}
      <div className="absolute top-[300px] left-[80px]">
        <h1 className="text-8xl md:text-50xl lg:text-9xl font-extrabold leading-none tracking-tight text-gray-600">
          <span className="inline-block font-sans">Your Journey,</span><br />
          <span className="inline-block font-serif italic font-medium">Her Guidance,</span><br />
          <span className="inline-block font-sans">Limitless Possibilities.</span>
        </h1>
      </div>
    </div>
  );
}