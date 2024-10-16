import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)``;
const Box = styled(motion.div)``;

export default function Scroll() {
  return (
    <Container>
      <Box />
    </Container>
  );
}
