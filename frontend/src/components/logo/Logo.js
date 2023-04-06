import logo from "../../eatGPT.png";

const Logo = ({ onClick }) => (
  <img
    src={logo}
    className="cursor-pointer flex rounded-lg  absolute left-0.5 top-0.5 scale-75"
    style={{ width: "220px", height: "80px" }}
    onClick={onClick}
    alt="Home"
  />
);

export default Logo;
