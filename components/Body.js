import Image from 'next/image';

const BodySection = () => {
  return (
    <div className="relative h-screen max-h-96 overflow-hidden bg-white bg-opacity-100">
      <div className="absolute inset-0 z-0">
        <Image
          src="/img/escritorio.png"
          alt="Background Image"
          layout="intrinsic"
          objectFit="cover"
          className="absolute top-0 left-80 transform translate-x-60 translate-y-0"
          quality={100}
          width={800}
          height={800}
        />
      </div>
      <div className="relative z-10 p-8">
        <h1 className="text-5xl font-bold text-center text-black">ALMOHADILLAS EPSON CHILE</h1>
        <p className="text-4xl text-left mt-8 text-black max-w-2xl pl-4 pt-2">
          Somos distribuidores de almohadillas para impresoras Epson, realizamos envíos a todo Chile.
        </p>
      </div>
    </div>
  );
};

export default BodySection;
