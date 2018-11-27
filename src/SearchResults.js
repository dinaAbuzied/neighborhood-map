import React, { Component } from 'react';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './SearchResults.css';
import List from './List';
import PlaceDetails from './PlaceDetails';

class SearchResults extends Component {
    state = {
        name: "",
        location: "",
        results: [],
        selectedPlace: -1,
        places: [],
        position: "Loading...",
        map: undefined,
        markers: [],
        placeObj: undefined
    }

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

    generateMap() {
        var map = new window.google.maps.Map(
            document.getElementById('map'), {center: this.state.position, zoom: 14});
        this.setState({map: map});
        this.getPlaces(this.state.position.lat, this.state.position.lng);
    }

    moveToLocation(lat, lng, getPlaces = true){
        var center = new window.google.maps.LatLng(lat, lng);
        this.state.map.panTo(center);
        if(getPlaces) this.getPlaces(lat, lng);
    }

    getPlaces(lat, lng) {
        let clientID = "QHBUGD5AWZF4Z5Y5FJO4ACVZRJKTYSMA3CGAYVZDIUSOC0OX";
        let clientSecret = "1UU2OPCFDTOHAN3DXEW3HNP0DJNJT45DP5SEJZGXDN3YYFYP";

        let str = "https://api.foursquare.com/v2/venues/search?";
        str += "client_id=" + clientID;
        str += "&client_secret=" + clientSecret;
        str += "&v=20180323";
        str += "&limit=10";
        str += "&ll=" + lat.toString() + "," + lng.toString();
        str += "&query=" + this.state.name;

        console.log(str);

        fetch(str)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("result", result);
                if(result.response.venues) {
                    this.setState({places: result.response.venues});
                    this.addMakers();
                }
            },
            (error) => {
                this.setState({places: error});
                console.log("error", error);
            }
        )
    }

    addMakers() {
        let markers = [];
        let places = this.state.places;
        let map = this.state.map;

        for (let index = 0; index < places.length; index++) {
            let place = places[index];
            let marker = new window.google.maps.Marker({
                position: {lat: place.location.lat, lng: place.location.lng},
                title: "marker",
                map: map
              });
              window.google.maps.event.addListener(marker,'click', ((marker, place, index) => { 
                  return () => {
                    this.setState({selectedPlace: index});
                    marker.setAnimation(window.google.maps.Animation.BOUNCE);
                    setTimeout(() => {
                        marker.setAnimation(null);
                      }, 400);
                    this.showPlaceDetails(place);
                  }
            })(marker, place, index));  
            markers.push(marker);
        }

        this.setState({markers: markers});
    }

    showPlaceDetails (place) {
        let clientID = "QHBUGD5AWZF4Z5Y5FJO4ACVZRJKTYSMA3CGAYVZDIUSOC0OX";
        let clientSecret = "1UU2OPCFDTOHAN3DXEW3HNP0DJNJT45DP5SEJZGXDN3YYFYP";

        let str = "https://api.foursquare.com/v2/venues/";
        str += place.id + "?";
        str += "client_id=" + clientID;
        str += "&client_secret=" + clientSecret;
        str += "&v=20180323";

        console.log(str);

        fetch(str)
        .then(res => res.json())
        .then(
            (result) => {
                console.log("result", result);
                this.setState({placeObj: result.response.venue});
            },
            (error) => {
                // this.setState({places: error});
                console.log("error", error);
            }
        )
    }

    render() {
        return (
          <div className="search-results">
            <header>
                <Link to="/">
                <FontAwesomeIcon icon={faAngleLeft} size="lg" />
                Back
                </Link>
            </header>
            {
                (typeof this.state.position === "string") ? (
                    <main><h1>{this.state.position}</h1></main>
                ) : (
                    <main>
                        <List location={this.state.location}
                            changeLoction={(index) => {
                                this.setState({position: {lat: this.state.results[index].geometry.location.lat(), lng: this.state.results[index].geometry.location.lng()}});
                                this.moveToLocation(this.state.results[index].geometry.location.lat(), this.state.results[index].geometry.location.lng());
                            }}
                            name={this.state.name}
                            places={this.state.places}
                            selectPlace={(index) => {
                                this.setState({selectedPlace: index});
                                let place = this.state.places[index];
                                this.moveToLocation(place.location.lat, place.location.lng, false);
                                this.showPlaceDetails(place);
                            }}
                            results={this.state.results} 
                            selectedPlace = {this.state.selectedPlace}
                        />
                        {this.state.placeObj &&
                            <PlaceDetails place={this.state.placeObj}
                                onClose={() => {
                                    this.setState({placeObj: undefined});
                                    this.setState({selectedPlace: -1});
                                }}
                            />
                        }
                        <div id="map"></div>
                    </main>
                )
            }
          </div>
        );
      }
}

export default SearchResults;