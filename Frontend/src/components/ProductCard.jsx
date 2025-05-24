import { Box, HStack, Image, Text, Heading, VStack, IconButton, Button } from '@chakra-ui/react'
import { FiDelete, FiEdit } from 'react-icons/fi'
import { useColorModeValue } from "@/components/ui/color-mode"
import { toaster } from "@/components/ui/toaster";
import { useProductStore } from '../store/product';
import { useState } from 'react'
import { DialogBody, DialogCloseTrigger, DialogContent, DialogActionTrigger, DialogFooter, DialogHeader, DialogRoot } from "@/components/ui/dialog"


const ProductCard = ({ product }) => {

  const [open, setOpen] = useState(false);

  const[updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");

  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {

    const { success, message } = await deleteProduct(pid)
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    } else {
      toaster.create({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success, message } = await updateProduct(pid, updatedProduct);
    setOpen();
    if(!success){
      toaster.create({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      } else {
        toaster.create({
          title: "Success",
          description: "Product Updated Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      };
    };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5PX)", shadow: "xl" }}
      bg={bg}
    >
      <Image src={product.image} alt={product.name} h="200px" w="full" objectFit="cover" />

      <Box p={4}
      >
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontSize="xl" fontWeight="bold" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton color="blue" onClick={() => setOpen(true)}><FiEdit /></IconButton>
          <IconButton color="red" onClick={() => handleDeleteProduct(product._id)}><FiDelete /></IconButton>

        </HStack>
        </Box>
        <DialogRoot lazyMount open={ open } onOpenChange={(e) => setOpen(e.open)}>
      
          <DialogContent>
            <DialogHeader>
              Update Product
            </DialogHeader>
            
            <DialogBody>

              <VStack spacing={4}>
                <input placeholder='Product Name' name='name'
                value={updatedProduct.name} onChange = {(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                <input placeholder='Price' name='price' type='number'
                value = {updatedProduct.price} onChange = {(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}/>
                <input placeholder='Image URL' name='image'
                 value= {updatedProduct.image} onChange = {(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}/>
              </VStack>

            </DialogBody>
            <DialogFooter>
              <Button color='blue' mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Update
              </Button>
              <DialogActionTrigger asChild>
              <Button variant='outline'>
                Cancel
              </Button>
              </DialogActionTrigger>
            </DialogFooter>
          

            <DialogCloseTrigger />
          </DialogContent>

        </DialogRoot>
    
    </Box>
  )
}

export default ProductCard