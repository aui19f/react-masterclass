import styled from "styled-components";
import {
  motion,
  useAnimate,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useLocation, useMatch, useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";

const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  background-color: black;
  font-size: 14px;
  padding: 20px;
  color: white;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
`;
const Logo = styled(motion.svg)`
  margin-right: 50px;
  width: 95px;
  height: 25px;
  fill: red// ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled.li`
  margin-right: 20px;

  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: pink; //;.
    &:hover {
      color: red;
      cursor: pointer;
    }
  }
`;

const Circle = styled(motion.span)`
  width: 6px;
  height: 6px;
  background-color: red;
  position: absolute;
  border-radius: 100%;
  bottom: -12px;
`;

const Search = styled.div`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  background-color: red;

  svg {
    position: absolute;
    right: 0;
    height: 25px;
  }
`;

const Input = styled(motion.input)`
  border: 0;
  padding: 4px 8px;

  border-radius: 4px;
  transform-origin: right center;
  position: absolute;
  right: 0px;
  padding: 5px 10px;
  padding-left: 40px;
  z-index: -1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid white;
`;

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0], //0
    transition: {
      repeat: Infinity, //5,
    },
  },
};

const scrollVariants = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const navAnimation = useAnimation();
  const { scrollY } = useScroll();
  const onClick = () => {
    if (isSearchOpen) {
      //닫는 애니메이션
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      //여는 애니메이션
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setIsSearchOpen((prev) => !prev);
  };

  let homeMatch = useMatch("netflix");
  let tvMatch = useMatch("netflix/tv");

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });

  return (
    <Nav variants={scrollVariants} animate={navAnimation} initial={"top"}>
      <Col>
        <Logo
          variants={logoVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="276.742"
          viewBox="0 0 1024 276.742"
        >
          <svg
            viewBox=".238 .034 919.406 248.488"
            width="1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke="#ffffff"
              stroke-width="4"
              d="m870.46 118.314 49.184 130.208c-14.495-2.07-28.982-4.663-43.733-6.999l-27.707-71.945-28.468 66.006c-13.973-2.336-27.698-3.114-41.672-4.928l49.955-113.89-45.309-116.732h41.937l25.362 65.22 27.185-65.22h42.442zm-120.864-118.28h-38.052v225.71c12.425.779 25.362 1.292 38.052 2.841zm-70.927 223.118c-34.68-2.328-69.37-4.39-104.829-5.177v-217.94h38.823v181.188c22.264.514 44.52 2.32 66.006 3.355zm-146.252-134.847v38.822h-53.06v88.263h-38.3v-215.356h108.713v38.822h-70.405v49.45h53.06zm-156.597-49.449v178.605c-12.946 0-26.14 0-38.83.514v-179.119h-40.122v-38.822h119.322v38.822zm-120.88 90.334c-17.08 0-37.274 0-51.769.787v57.715c22.778-1.557 45.556-3.363 68.59-4.141v37.273l-107.412 8.548v-229.338h107.405v38.822h-68.584v52.29c15.017 0 38.052-.778 51.768-.778v38.83zm-215.109-21.743v135.633c-13.965 1.557-26.398 3.371-39.593 5.442v-248.488h37.017l50.469 141.076v-141.076h38.83v232.436c-13.717 2.336-27.698 3.114-42.45 5.177z"
              fill="#e50914"
            />
          </svg>
        </Logo>
        <Items>
          <Item>
            <Link to="">HOME</Link>

            {homeMatch && <Circle layoutId="circel" />}
          </Item>
          <Item>
            <Link to="tv">TV SHOWS</Link>

            {tvMatch && <Circle layoutId="circel" />}
          </Item>
        </Items>
      </Col>

      <Col>
        <Search>
          <motion.svg
            onClick={onClick}
            animate={{ x: isSearchOpen ? -175 : 0 }}
            transition={{ type: "linear" }}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
            >
              <g transform="scale(5.12,5.12)">
                <path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path>
              </g>
            </g>
          </motion.svg>
          <Input
            transition={{ type: "linear" }}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            placeholder="Search Title"
          />
          {/* // animate={{ scaleX: isSearchOpen ? 1 : 0 }} */}
        </Search>
      </Col>
    </Nav>
  );
}
