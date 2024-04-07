import Image from "next/image";

const BgImage = () => {
  return (
    <Image
      src="https://i.ibb.co/bKqy34C/white-aeroplane-design-free-vector.jpg"
      alt={"bg-image"}
      fill
      sizes="60vw"
      style={{ objectFit: "fill", zIndex: -3 }}
    ></Image>
  );
};

export default BgImage;
