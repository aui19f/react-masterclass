import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.div`
  padding: 24px;
  background-color: yellow;
`;
const Box = styled(motion.div)`
  width: 150px;
  height: 150px;
  background: white;
  border-radius: 30px;
`;

const boxVars = {
  hover: {
    scale: 1.2,
    rotate: 90,
  },
  click: {
    scale: 0.8,
    rotate: -90,
    borderRadius: "100%",
  },
};

export default function Gestures() {
  return (
    <Container>
      <Box variants={boxVars} whileHover="hover" whileTap="click" />
    </Container>
  );
}
