import React, { Component } from 'react';
import queryString from 'query-string';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './SearchResults.css';
import List from './List';

class SearchResults extends Component {
    state = {
        name: "",
        location: "",
        results: [],
        position: "Loading..."
    }

    componentDidMount() {
        let values = queryString.parse(this.props.location.search);
        this.setState({name: values.name});
        this.setState({location: values.location});
        console.clear();

        if(values.location === "nearest") {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    this.setState({position: {lat: position.coords.latitude, lng: position.coords.longitude}});
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
                        console.log(status, results);
                    }
                    else {
                        this.setState({position: 'Geocode was not successful for the following reason: ' + status});
                    }
                  }.bind(this));
        }
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
                            }}
                            name={this.state.name}
                            results={this.state.results}
                        />
                        <div id="map"></div>
                    </main>
                )
            }
          </div>
        );
      }
}

export default SearchResults;