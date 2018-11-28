import React, { Component } from 'react';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faMapMarked, faListUl } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './SearchResults.css';
import List from './List';
import PlaceDetails from './PlaceDetails';

class SearchResults extends Component {
    state = {
        name: "",
        location: "",
        currentScreen: "List", // used in small screen to show one screen at a time
        results: [], // all locations avialable, used in locations list
        selectedPlace: -1, // selected place index
        places: [], // all places available, used in places list
        position: "Loading...", // if the postion is not loaded yet will show loading message, 
                                //if an error occured will show the error, 
                                //else will store the selected postion
        map: undefined,
        markers: [],
        placeObj: undefined // selected place details
    }

    /**
     * @description gets the params passed in the url (name, location),
     *              if the google maps api script is not loaded will load it,
     *              call the onScriptLoad to get the location and generate the map
     */
    componentDidMount() {
        let values = queryString.parse(this.props.location.search);
        this.setState({name: values.name});
        this.setState({location: values.location});
        console.clear();

        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.google.com/maps/api/js?key=AIzaSyCKqR6ij7M9c5777bw3uIgzsxKfo2Nc2Z0&v=3`;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
              this.onScriptLoad(values)
            })
          } else {
            this.onScriptLoad(values)
          }
    }

    /**
     * @description if the location is set to nearest, 
     *              will get the user location and generate a map based on this location,
     *              if not will use the geocoder api to get all the locations with the 
     *              same name to be added to the list and generate a map based on the first location in the results
     * @param {object} values conatins the params passed in the url (name, location)
     */
    onScriptLoad(values) {
        if(values.location === "nearest") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.setState({position: {lat: position.coords.latitude, lng: position.coords.longitude}});
                    this.generateMap();
                });
            } else {
                this.setState({position: "Geolocation is not supported by this browser."});
            }
        }
        else {
            var geocoder = new window.google.maps.Geocoder();
                var address = values.location;
                geocoder.geocode(
                  { 
                    address: address
                  }, function(results, status) {
                    if (status === 'OK') {
                        this.setState({results: results});
                        this.setState({position: {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()}});
                        this.generateMap();
                        console.log(status, results);
                    }
                    else {
                        this.setState({position: 'Geocode was not successful for the following reason: ' + status});
                    }
                  }.bind(this));
        }
    }

    /**
     * @description creates a new google map and store it in the state and calls getPlaces 
     *              to call the foursquare api and get a list of the nearest places
     */
    generateMap() {
        var map = new window.google.maps.Map(
            document.getElementById('map'), {center: this.state.position, zoom: 14});
        this.setState({map: map});
        this.getPlaces(this.state.position.lat, this.state.position.lng);
    }

    /**
     * @description recenters the map to the given location, 
     *              used when user change location and when user selects a place
     * @param {number} lat the latitude of the current location
     * @param {number} lng lng the longtude of the current location
     * @param {boolean} getPlaces if true will search for the nearest places if not will only recenter the map
     */
    moveToLocation(lat, lng, getPlaces = true){
        var center = new window.google.maps.LatLng(lat, lng);
        this.state.map.panTo(center);
        if(getPlaces) this.getPlaces(lat, lng);
    }

    /**
     * @description this function is invoked when the location is set, 
     *              it calls the foursquare API to search for the nearset places around this location
     * @param {number} lat the latitude of the current location
     * @param {number} lng the longtude of the current location
     */
    getPlaces(lat, lng) {
        // clientID and clientSecret are credentials given by the foursquare API
        let clientID = "QHBUGD5AWZF4Z5Y5FJO4ACVZRJKTYSMA3CGAYVZDIUSOC0OX";
        let clientSecret = "1UU2OPCFDTOHAN3DXEW3HNP0DJNJT45DP5SEJZGXDN3YYFYP";

        let str = "https://api.foursquare.com/v2/venues/search?";
        str += "client_id=" + clientID;
        str += "&client_secret=" + clientSecret;
        str += "&v=20180323"; // the api version number
        str += "&limit=10"; // limit the result to 10 places
        str += "&ll=" + lat.toString() + "," + lng.toString();
        str += "&query=" + this.state.name;

        console.log(str);

        fetch(str)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("result", result);
                if(result.response.venues) {
                    // sets the places prop to the returned venues to be shown in the list
                    this.setState({places: result.response.venues});
                    // add markers on the map for every place
                    this.addMakers();
                }
            },
            (error) => {
                // shows the error returned on the screen
                this.setState({places: error});
                console.log("error", error);
            }
        )
    }

    /**
     * @description this function is invoked when the location is set and 
     *              the foursquare API sends a list of places near this location
     *              to add a marker on the map for every place
     */
    addMakers() {
        let markers = [];
        let places = this.state.places;
        let map = this.state.map;

        for (let index = 0; index < places.length; index++) {
            let place = places[index];
            let marker = new window.google.maps.Marker({
                position: {lat: place.location.lat, lng: place.location.lng},
                map: map
              });
              window.google.maps.event.addListener(marker,'click', ((marker, place, index) => { 
                  return () => {
                    /* when a marker is clicked the selectedPlace prop is set to 
                        the index of the marker to set the selected place style,
                        a bounce animation is set to the marker with a timeout to stop the animation
                        incase of small screens will show only details */
                    this.setState({selectedPlace: index});
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
                    setTimeout(() => {
                        marker.setAnimation(null);
                      }, 400);
                    this.showPlaceDetails(place);
                    this.setState({currentScreen: "Details"});
                  }
            })(marker, place, index));  
            markers.push(marker);
        }

        this.setState({markers: markers});
    }

    /**
     * @description invoked when user selects a place from the list or a marker on the map
     * @param {object} place the selected place the user selected
     */
    showPlaceDetails (place) {
        // clientID and clientSecret are credentials given by the foursquare API
        let clientID = "QHBUGD5AWZF4Z5Y5FJO4ACVZRJKTYSMA3CGAYVZDIUSOC0OX";
        let clientSecret = "1UU2OPCFDTOHAN3DXEW3HNP0DJNJT45DP5SEJZGXDN3YYFYP";

        let str = "https://api.foursquare.com/v2/venues/"; 
        str += place.id + "?"; //unique id for every venue
        str += "client_id=" + clientID;
        str += "&client_secret=" + clientSecret;
        str += "&v=20180323"; //the api version number

        console.log(str);

        fetch(str)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("result", result);
                // assign the result venue to placeObj to shoe the PlaceDetails component
                this.setState({placeObj: result.response.venue});
            },
            (error) => {
                // TODO: show message to the use with the error
                console.log("error", error);
            }
        )
    }

    render() {
        return (
          <div className="search-results">
            <header>
                <Link tabIndex="0" to="/">
                <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                Back
                </Link>
               { /* toggle button only shows on screen with width less than 1024 to show only one component at a time */}
                {window.innerWidth < 1024 && 
                    <button tabIndex="0" className={this.state.currentScreen === "Details" ? "sm-hidden toggle-screen" : "toggle-screen"} onClick={() => {
                            if (this.state.currentScreen === "List") this.setState({currentScreen: "Map"});
                            else this.setState({currentScreen: "List"});
                        }}>Switch to {(this.state.currentScreen === "List") ? (
                            <span>
                                <FontAwesomeIcon icon={faMapMarked} size="lg" />
                                Map
                            </span>
                        ) : (
                            <span>
                                <FontAwesomeIcon icon={faListUl} size="lg" />
                                List
                            </span>
                    )}</button>
                }
            </header>
            {
                (typeof this.state.position === "string") ? (
                    /* contains the message displayed if there is an error message or the page is still loading */
                    <main><h1>{this.state.position}</h1></main>
                ) : (
                    <main>
                        {/* contains a list of locations found by google geocoder and places found foursquare api */}
                        <List location={this.state.location}
                            changeLoction={(index) => {
                                /* invoked when the user selects a location in the list, 
                                    sets postion to the new location,
                                    invoke the moveToLocation function to recenter the map to the selected location */
                                this.setState({position: {lat: this.state.results[index].geometry.location.lat(), lng: this.state.results[index].geometry.location.lng()}});
                                this.moveToLocation(this.state.results[index].geometry.location.lat(), this.state.results[index].geometry.location.lng());
                            }}
                            name={this.state.name}
                            places={this.state.places}
                            selectPlace={(index) => {
                                /* invoked when the user selects a place in the list, 
                                    sets selectedPlace to the index number of the place to add the selected place style,
                                    invoke the moveToLocation function to recenter the map to the selected place,
                                    invoke the showPlaceDetails to get the details of the selected place from foursquare API
                                    incase of small screens will hide list screen and show details only */
                                this.setState({selectedPlace: index});
                                let place = this.state.places[index];
                                this.moveToLocation(place.location.lat, place.location.lng, false);
                                this.showPlaceDetails(place);
                                this.setState({currentScreen: "Details"});
                            }}
                            results={this.state.results} 
                            selectedPlace = {this.state.selectedPlace} 
                            currentScreen = {this.state.currentScreen}
                        />
                        {this.state.placeObj &&
                            /* contains the details of the place selected by the user and is only shown when user select a place */
                            <PlaceDetails place={this.state.placeObj}
                                onClose={() => {
                                    /* when user clicks on the close button in the details component, 
                                        the placeObj is set to undefined to hide the component and 
                                        sets selectedPlace to -1 to remove the selected place style
                                        incase of small screens will show only list */
                                    this.setState({placeObj: undefined});
                                    this.setState({selectedPlace: -1});
                                    this.setState({currentScreen: "List"});
                                }}
                                currentScreen = {this.state.currentScreen}
                            />
                        }
                        {/* 
                            contains the google map 
                            class sm-hidden only works on screen with width less than 1024 to show only one component at a time
                        */}
                        <div id="map" className={this.state.currentScreen !== "Map" ? "sm-hidden" : ""}></div>
                    </main>
                )
            }
          </div>
        );
      }
}

export default SearchResults;