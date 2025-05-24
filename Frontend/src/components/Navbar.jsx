import { Button, Flex, HStack, Text, Container} from "@chakra-ui/react";
import {useColorMode } from "@/components/ui/color-mode"
import { Link } from "@chakra-ui/react";
import { FiPlusSquare } from "react-icons/fi"; 
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const buttonClick = () => {
    
  }

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          
            <Button>
              <a href="/create"><FiPlusSquare fontSize={20}/></a>
            </Button>
        
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
