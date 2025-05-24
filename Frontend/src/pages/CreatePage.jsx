import { Input, VStack, Container, Heading, Box, Button } from '@chakra-ui/react';
import { useColorModeValue } from "@/components/ui/color-mode"
import { useState } from 'react'
import { useProductStore } from '@/store/product.js';
import { toaster } from "@/components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] =useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if(!success){
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
      } else {
        toaster.create({
          title: "Product Added",
          description: "Product has been added successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        })
      };
    }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
      <Heading as="h1" size={"2xl"} textAlign={"center"} mb={8}>
        Create A New Product
      </Heading>
       
       <Box 
       w={"full"} 
       bg={useColorModeValue("white", "gray.800")} 
       shadow={"md"} 
       rounded={"lg"} 
       p={6}> 
       <VStack spacing={4}>
        <Input 
         placeholder="Product Name"
         name="name"
         value = {newProduct.name}
         onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
        />
        <Input 
          placeholder="Product Price"
          name="price"
          type="number"
          value = {newProduct.price}
          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
        />
        <Input 
          placeholder="Image URL"
          name="image"
          value = {newProduct.image}
          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
          />
          <Button colorScheme="blue" onClick={handleAddProduct} w={"full"}>
            Add Product
            </Button>

       </VStack>
       </Box>
      </VStack>


    </Container>
  )
};
export default CreatePage;