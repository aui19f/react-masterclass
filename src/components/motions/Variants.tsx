/**
 * Variants
 * 애니메이션의 무대
 *
 */

import { motion } from "framer-motion";
import styled from "styled-components";
const Contents = styled.div`
  background-color: purple;
  padding: 24px;
`;
const Box = styled(motion.ul)`
  width: 150px;
  height: 150px;
  display: grid;
  overflow: hidden;
  margin: 0;
  list-style: none;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
`;

const Circle = styled(motion.li)`
  background: white;
  border-radius: 100%;
`;

const boxVars = {
  hidden: {
    opacity: 1,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVars = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};
// <Box variants={myVars} initial="active" animate="inactive"></Box>;
// const myVars = {
//   active: {
//     scale: 0,
//   },
//   inactive: {
//     scale: 1,
//     rotateZ: 360,
//     transition: {
//       type: "spring",
//       damping: 20,
//     },
//   },
// };
export default function Variants() {
  return (
    <Contents>
      <Box variants={boxVars} initial="hidden" animate="visible">
        <Circle variants={itemVars} />
        <Circle variants={itemVars} />
        <Circle variants={itemVars} />
        <Circle variants={itemVars} />
      </Box>
    </Contents>
  );
}
