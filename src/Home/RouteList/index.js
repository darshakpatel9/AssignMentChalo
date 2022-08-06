import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Text,
  Spacer,
  Table,
  Thead,
  Tbody,
  Tr,
  Icon,
  Th,
  Td,
  TableCaption,
  TableContainer,
  IconButton,
  HStack,
  Checkbox,
  Flex,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { connect } from 'react-redux';
import { deleteRoute, setSelectedRoutes } from '../../actions';
import { DeleteIcon } from '@chakra-ui/icons';
import _ from 'lodash';

class RouteList extends React.Component {
  state = {
    selectedRoutes: [],
  };
  componentDidUpdate = prevProps => {
    if (this.props.routes !== prevProps.routes) {
      this.setState({ selectedRoutes: [] });
    }
  };
  deleteRoute = index => {
    this.props.deleteRoute(index);
    this.setState({ selectedRoutes: [] });
  };
  handleCheckBoxChange = (event, index) => {
    if (event.target.checked) {
      this.setState({ selectedRoutes: [...this.state.selectedRoutes, index] });
    } else {
      let newValues = this.state.selectedRoutes;
      newValues.splice(newValues.indexOf(index), 1);
      this.setState({ selectedRoutes: newValues });
    }
  };
  generatePolyline = () => {
    this.props.setSelectedRoutes(_.cloneDeep(this.state.selectedRoutes));
  };
  isChecked = index => {
    if (this.state.selectedRoutes.indexOf(index) !== -1) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    return (
      <>
        <Button
          onClick={this.generatePolyline}
          isDisabled={!(this.state.selectedRoutes.length > 0)}
        >
          Generate Polyine
        </Button>
        <Accordion allowMultiple>
          {this.props.routes.map((route, index) => {
            return (
              <AccordionItem key={index}>
                <HStack width={'95%'}>
                  <Box width={'20%'} textAlign="left">
                    <Flex>
                      {' '}
                      <Checkbox
                        marginRight={'5px'}
                        isChecked={this.isChecked(index)}
                        onChange={event =>
                          this.handleCheckBoxChange(event, index)
                        }
                      />
                      {route.routeName}
                    </Flex>
                  </Box>
                  <Box width={'35%'}>
                    Starting Lat: {route.routStartLat}
                    <Spacer />
                    Starting Long: {route.routStartLong}
                  </Box>
                  <Box width={'35%'} marginLeft={'1.5'}>
                    Destiantion Lat:{route.routeEndLat}
                    <Spacer />
                    Destiantion Long:{route.routeEndLong}
                  </Box>
                  <Box width={'5%'}>
                    <Icon viewBox="0 0 200 200" color="red.500">
                      <path
                        fill={route.routeStatus ? 'green' : 'red'}
                        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                      />
                    </Icon>
                  </Box>
                  <Box width={'5%'}>
                    <IconButton
                      icon={<DeleteIcon />}
                      onClick={() => this.deleteRoute(index)}
                    />
                  </Box>
                  <Box width={'5%'}>
                    <AccordionButton>
                      <AccordionIcon />
                    </AccordionButton>
                  </Box>
                </HStack>

                <AccordionPanel pb={4}>
                  {route.stops ? (
                    <TableContainer>
                      <Table variant="simple">
                        <TableCaption>Stops In A Route</TableCaption>
                        <Thead>
                          <Tr>
                            <Th>Stop Name</Th>
                            <Th>Stop Lat</Th>
                            <Th>Stop Long</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {route.stops.map(stop => (
                            <Tr>
                              <Td>{stop.stopName}</Td>
                              <Td>{stop.lat}</Td>
                              <Td>{stop.long}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Text align={'center'}>No Stop Added In This Route</Text>
                  )}
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </>
    );
  }
}
const mapStateToProps = state => {
  return {
    routes: state.routes,
  };
};
export default connect(mapStateToProps, { deleteRoute, setSelectedRoutes })(
  RouteList
);
