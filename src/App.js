import React from 'react';
import {
  ChakraProvider,
  theme,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import Home from './Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Tabs>
        <TabList>
          <Tab>Home</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Home />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
}

export default App;
