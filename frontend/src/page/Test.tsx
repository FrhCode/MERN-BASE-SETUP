import { Variants, motion } from "framer-motion";

const divVariant: Variants = {
  visible: { opacity: 1, transition: { duration: 1 } },
  hidden: { opacity: 0 },
};

const pVariant: Variants = {
  visible: { scale: 1, transition: { duration: 1 } },
  hidden: { scale: 0 },
};

export default function Test() {
  return (
    <motion.div
      animate="visible"
      initial="hidden"
      // whileTap={{ scale: 0.9 }}
      // whileHover={{ cursor: "pointer" }}
      // drag="x"
      // dragConstraints={{ left: -100, right: 100 }}
      variants={divVariant}
      className="h-32 w-32 bg-red-500"
    >
      <motion.p variants={pVariant}>Hello guys</motion.p>
    </motion.div>
  );
}
