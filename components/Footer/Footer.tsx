import "./Footer.scss";
import Image from "next/image";
import { Images } from "@/constants";
import Link from "next/link";

const footerLinks = [
  {
    name: "Home",
    link: "/"
  },
  {
    name: "About Us",
    link: "#"
  },
  {
    name: "Carrers",
    link: "#"
  },
  {
    name: "T's and C's",
    link: "#"
  },
  {
    name: "Help",
    link: "#"
  },
]
const footerSocials = [
  {
    name: "facebook",
    image: Images.facebookIcon,
    link: "https://www.facebook.com"
  },
  {
    name: "linkedin",
    image: Images.linkedInIcon,
    link: "https://www.linkedin.com"
  },
  {
    name: "instagram",
    image: Images.instagramIcon,
    link: "https://www.instagram.com"
  },
  {
    name: "x",
    image: Images.xIcon,
    link: "https://www.x.com"
  }
]
const Footer = () => {
  return (
    <div className="mt-[3rem] pt-6 pb-7 flex flex-col border-t-2 border-yellow w-full gap-6 sm:mb-0 mb-[2.5rem]">
      <div className="flex justify-center sm:gap-16 gap-3 w-full">
        {footerLinks.map((item, i) => (
          <div key={i} className={`${item.name !== 'Help' ? 'border-r-2 border-black' : ''} sm:pr-4 pr-1 sm:text-lg`}>
            <Link href={item.link} className="hover:text-green font-semibold">{item.name}</Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full sm:gap-16 gap-4">
        {footerSocials.map((item, i) => (
          <Link key={i} href={item.link}><Image priority={true} src={item.image} alt={item.name} width={30}/></Link>
        ))}
      </div>

    </div>    
  );
};

export default Footer;

