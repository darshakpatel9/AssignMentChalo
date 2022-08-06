import { Box, Flex, Spacer } from '@chakra-ui/react';
import React from 'react';
import Map from './Map';
import RouteAddForm from './RouteAddForm';
import RouteList from './RouteList';

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Flex>
          <Box
            w={'40%'}
            h={'400px'}
            bg="gray.50"
            padding={'2'}
            rounded="lg"
            border={'1px'}
            overflow="auto"
            borderOpacity={'0.7'}
          >
            <RouteAddForm />
          </Box>
          <Spacer w={'1%'} />
          <Box width={'59%'} h={'400px'} overflow="auto">
            <RouteList />
          </Box>
        </Flex>
        <Flex marginTop={'3'}>
          <Map />
        </Flex>
      </React.Fragment>
    );
  }
}
export default Home;
