import { Input, Stack, Textarea, VStack } from "@chakra-ui/react";
import React from "react";

const AddGift = () => {
  return (
    <VStack px={"100px"} py={"30px"}>
      <Input placeholder="선물명" variant={"filled"} />
      <Textarea
        placeholder="선물을 소개해주세요."
        resize={"none"}
        rows={10}
        variant={"filled"}
      />
    </VStack>
  );
};

export default AddGift;
