import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  IconButton,
  HStack,
  Switch,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { connect } from 'react-redux';
import { addRoute } from '../../actions';
import _ from 'lodash';
class RouteAddForm extends React.Component {
  state = {
    stops: null,
    routeName: '',
    routStartLat: 0,
    routeEndLat: 0,
    routStartLong: 0,
    routeEndLong: 0,
    routeStatus: true,
  };
  addStop = () => {
    if (this.state.stops) {
      this.setState({
        stops: [...this.state.stops, { stopName: '', lat: 0, long: 0 }],
      });
    } else {
      this.setState({
        stops: [{ stopName: '', lat: 0, long: 0 }],
      });
    }
  };
  removeStop = index => {
    let newStops = this.state.stops;
    newStops.splice(index, 1);
    this.setState({ stops: newStops });
  };
  handleStopChange = (event, attr, index) => {
    let newStops = this.state.stops;
    newStops[index][attr] = event.target.value;
    this.setState({ stops: newStops });
  };
  handleSubmit = event => {
    event.preventDefault();
    const data = _.cloneDeep(this.state);
    this.props.addRoute(data);
  };
  handleRouteChange = (event, attr) => {
    switch (attr) {
      case 'routeName':
        this.setState({ routeName: event.target.value });
        break;
      case 'routStartLat':
        this.setState({ routStartLat: event.target.value });
        break;
      case 'routeEndLat':
        this.setState({ routeEndLat: event.target.value });
        break;
      case 'routStartLong':
        this.setState({ routStartLong: event.target.value });
        break;
      case 'routeEndLong':
        this.setState({ routeEndLong: event.target.value });
        break;
      case 'routeStatus':
        this.setState({ routeStatus: !this.state.routeStatus });
        break;
      default:
        break;
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormControl>
          <HStack marginBottom={'1'}>
            <FormLabel marginRight={'49px'}>Route Name</FormLabel>
            <Input
              isRequired
              type="text"
              width={'20%'}
              onChange={event => this.handleRouteChange(event, 'routeName')}
            />
          </HStack>
          <HStack marginBottom={'1'}>
            <FormLabel>Route start Long:</FormLabel>
            <Input
              max={180}
              step="0.0001"
              min={-180}
              isRequired
              type="number"
              width={'20%'}
              onChange={event => this.handleRouteChange(event, 'routStartLong')}
            />
            <Spacer />
            <FormLabel>Route start Lat:</FormLabel>
            <Input
              max={90}
              min={-90}
              step="0.0001"
              isRequired
              type="number"
              width={'20%'}
              onChange={event => this.handleRouteChange(event, 'routStartLat')}
            />
          </HStack>
          <HStack marginBottom={'1'}>
            <FormLabel marginRight={'19px'}>Route End Long:</FormLabel>
            <Input
              max={180}
              min={-180}
              step="0.0001"
              isRequired
              type="number"
              width={'20%'}
              onChange={event => this.handleRouteChange(event, 'routeEndLong')}
            />
            <Spacer />
            <FormLabel>Route End Lat:</FormLabel>
            <Input
              max={90}
              min={-90}
              step="0.0001"
              isRequired
              type="number"
              width={'20%'}
              onChange={event => this.handleRouteChange(event, 'routeEndLat')}
            />
          </HStack>
          <HStack>
            <FormLabel>Route status</FormLabel>
            <Switch
              isChecked={this.state.routeStatus}
              size="md"
              onChange={event => this.handleRouteChange(event, 'routeStatus')}
            />
            <FormLabel>Add Stops</FormLabel>
            <IconButton icon={<AddIcon />} onClick={() => this.addStop()} />
          </HStack>
          {this.state.stops &&
            this.state.stops.map((stop, index) => {
              return (
                <HStack key={index}>
                  <FormLabel>Stop Name</FormLabel>
                  <Input
                    isRequired
                    type="text"
                    value={stop.stopName}
                    onChange={event =>
                      this.handleStopChange(event, 'stopName', index)
                    }
                    width={'20%'}
                  />{' '}
                  <FormLabel> Lat</FormLabel>
                  <Input
                    isRequired
                    type="number"
                    step="0.0001"
                    max={90}
                    min={-90}
                    value={stop.lat}
                    onChange={event =>
                      this.handleStopChange(event, 'lat', index)
                    }
                    width={'20%'}
                  />{' '}
                  <FormLabel> Long</FormLabel>
                  <Input
                    isRequired
                    type="number"
                    max={180}
                    min={-180}
                    value={stop.long}
                    step="0.0001"
                    onChange={event =>
                      this.handleStopChange(event, 'long', index)
                    }
                    width={'20%'}
                  />
                  <IconButton
                    icon={<CloseIcon />}
                    onClick={() => this.removeStop(index)}
                  />
                </HStack>
              );
            })}
          <Button type="submit" width="full" mt={4}>
            Submit
          </Button>
        </FormControl>
      </form>
    );
  }
}

export default connect(null, { addRoute })(RouteAddForm);
