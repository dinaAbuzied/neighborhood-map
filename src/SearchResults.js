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
        results: [], // all locations avialable, used in locations list
        selectedPlace: -1, // selected place index
        places: [], // all places available, used in places list
        position: "Loading...", // if the postion is not loaded yet will show loading message, 
                                //if an error occured will show the error, 
                                //else will store the selected postion
        map: undefined,
        markers: [],
        //placeObj: undefined // selected place details
        placeObj:  {
                "id": "412d2800f964a520df0c1fe3",
                "name": "Central Park",
                "contact": {
                  "phone": "2123106600",
                  "formattedPhone": "(212) 310-6600",
                  "twitter": "centralparknyc",
                  "instagram": "centralparknyc",
                  "facebook": "37965424481",
                  "facebookUsername": "centralparknyc",
                  "facebookName": "Central Park"
                },
                "price": {
                    "tier": 2,
                    "message": "Moderate",
                    "currency": "$"
                    },
                "location": {
                  "address": "59th St to 110th St",
                  "crossStreet": "5th Ave to Central Park West",
                  "lat": 40.78408342593807,
                  "lng": -73.96485328674316,
                  "postalCode": "10028",
                  "cc": "US",
                  "city": "New York",
                  "state": "NY",
                  "country": "United States",
                  "formattedAddress": [
                    "59th St to 110th St (5th Ave to Central Park West)",
                    "New York, NY 10028",
                    "United States"
                  ]
                },
                "canonicalUrl": "https://foursquare.com/v/central-park/412d2800f964a520df0c1fe3",
                "categories": [
                  {
                    "id": "4bf58dd8d48988d163941735",
                    "name": "Park",
                    "pluralName": "Parks",
                    "shortName": "Park",
                    "icon": {
                      "prefix": "https://ss3.4sqi.net/img/categories_v2/parks_outdoors/park_",
                      "suffix": ".png"
                    },
                    "primary": true
                  }
                ],
                "verified": true,
                "stats": {
                  "checkinsCount": 364591,
                  "usersCount": 311634,
                  "tipCount": 1583,
                  "visitsCount": 854553
                },
                "url": "http://www.centralparknyc.org",
                "likes": {
                  "count": 17370,
                  "summary": "17370 Likes"
                },
                "rating": 9.8,
                "ratingColor": "00B551",
                "ratingSignals": 18854,
                "beenHere": {
                  "count": 0,
                  "unconfirmedCount": 0,
                  "marked": false,
                  "lastCheckinExpiredAt": 0
                },
                "photos": {
                  "count": 26681,
                  "groups": [
                    {
                      "type": "venue",
                      "name": "Venue photos",
                      "count": 26681,
                      "items": [
                        {
                          "id": "513bd223e4b0e8ef8292ee54",
                          "createdAt": 1362874915,
                          "source": {
                            "name": "Instagram",
                            "url": "http://instagram.com"
                          },
                          "prefix": "https://igx.4sqi.net/img/general/",
                          "suffix": "/655018_Zp3vA90Sy4IIDApvfAo5KnDItoV0uEDZeST7bWT-qzk.jpg",
                          "width": 612,
                          "height": 612,
                          "user": {
                            "id": "123456",
                            "firstName": "John",
                            "lastName": "Doe",
                            "gender": "male"
                          },
                          "visibility": "public"
                        }
                      ]
                    }
                  ]
                },
                "description": "Central Park is the 843-acre green heart of Manhattan and is maintained by the Central Park Conservancy. It was designed in the 19th century by Frederick Law Olmsted and Calvert Vaux as an urban escape for New Yorkers, and now receives over 40 million visits per year.",
                "storeId": "",
                "page": {
                  "pageInfo": {
                    "description": "The mission of the Central Park Conservancy, a private non-profit, is to restore, manage, and enhance Central Park, in partnership with the public.",
                    "banner": "https://is1.4sqi.net/userpix/HS2JAA2IAAAR2WZO.jpg",
                    "links": {
                      "count": 1,
                      "items": [
                        {
                          "url": "http://www.centralparknyc.org"
                        }
                      ]
                    }
                  },
                  "user": {
                    "id": "29060351",
                    "firstName": "Central Park",
                    "gender": "none",
                    "photo": {
                      "prefix": "https://igx.4sqi.net/img/user/",
                      "suffix": "/PCPGGJ2N3ULA5O05.jpg"
                    },
                    "type": "chain",
                    "tips": {
                      "count": 37
                    },
                    "lists": {
                      "groups": [
                        {
                          "type": "created",
                          "count": 2,
                          "items": []
                        }
                      ]
                    },
                    "homeCity": "New York, NY",
                    "bio": "",
                    "contact": {
                      "twitter": "centralparknyc",
                      "facebook": "37965424481"
                    }
                  }
                },
                "hereNow": {
                  "count": 16,
                  "summary": "16 people are here",
                  "groups": [
                    {
                      "type": "others",
                      "name": "Other people here",
                      "count": 16,
                      "items": []
                    }
                  ]
                },
                "createdAt": 1093478400,
                "tips": {
                  "count": 1583,
                  "groups": [
                    {
                      "type": "others",
                      "name": "All tips",
                      "count": 1583,
                      "items": [
                        {
                          "id": "5150464ee4b02f70eb28eee4",
                          "createdAt": 1364215374,
                          "text": "Did you know? To create that feeling of being in the countryside, and not in the middle of a city, the four Transverse Roads were sunken down eight feet below the park’s surface.",
                          "type": "user",
                          "canonicalUrl": "https://foursquare.com/item/5150464ee4b02f70eb28eee4",
                          "photo": {
                            "id": "5150464f52625adbe29d04c2",
                            "createdAt": 1364215375,
                            "source": {
                              "name": "Foursquare Web",
                              "url": "https://foursquare.com"
                            },
                            "prefix": "https://igx.4sqi.net/img/general/",
                            "suffix": "/13764780_Ao02DfJpgG1ar2PfgP51hOKWsn38iai8bsSpzKd0GcM.jpg",
                            "width": 800,
                            "height": 542,
                            "visibility": "public"
                          },
                          "photourl": "https://igx.4sqi.net/img/general/original/13764780_Ao02DfJpgG1ar2PfgP51hOKWsn38iai8bsSpzKd0GcM.jpg",
                          "lang": "en",
                          "likes": {
                            "count": 247,
                            "groups": [
                              {
                                "type": "others",
                                "count": 247,
                                "items": []
                              }
                            ],
                            "summary": "247 likes"
                          },
                          "logView": true,
                          "agreeCount": 246,
                          "disagreeCount": 0,
                          "todo": {
                            "count": 30
                          },
                          "user": {
                            "id": "13764780",
                            "firstName": "City of New York",
                            "gender": "none",
                            "photo": {
                              "prefix": "https://igx.4sqi.net/img/user/",
                              "suffix": "/2X1FKJPUY3DGRRK3.png"
                            },
                            "type": "page"
                          }
                        },
                        {
                          "id": "522afa5b11d2740e9aeeb336",
                          "createdAt": 1378548315,
                          "text": "Lots of squirrels in the park! パーク内にはリスがたくさんいます！しかも思ったよりデカイです。",
                          "type": "user",
                          "logView": true,
                          "editedAt": 1399418942,
                          "agreeCount": 61,
                          "disagreeCount": 0,
                          "todo": {
                            "count": 1
                          },
                          "user": {
                            "id": "5053872",
                            "firstName": "Nnkoji",
                            "gender": "male",
                            "photo": {
                              "prefix": "https://igx.4sqi.net/img/user/",
                              "suffix": "/5053872-DUZ51RAOUVH3GU33.jpg"
                            }
                          },
                          "authorInteractionType": "liked"
                        },
                        {
                          "id": "4cd5bda1b6962c0fd19c2e96",
                          "createdAt": 1289076129,
                          "text": "PHOTO: 1975 was the last year the New York City marathon was raced entirely inside Central Park. In this photo, runners at the marathon starting line.",
                          "type": "user",
                          "url": "http://www.nydailynewspix.com/sales/largeview.php?name=87g0km0g.jpg&id=152059&lbx=-1&return_page=searchResults.php&page=2",
                          "canonicalUrl": "https://foursquare.com/item/4cd5bda1b6962c0fd19c2e96",
                          "lang": "en",
                          "likes": {
                            "count": 26,
                            "groups": [
                              {
                                "type": "others",
                                "count": 26,
                                "items": []
                              }
                            ],
                            "summary": "26 likes"
                          },
                          "logView": true,
                          "agreeCount": 25,
                          "disagreeCount": 0,
                          "todo": {
                            "count": 16
                          },
                          "user": {
                            "id": "1241858",
                            "firstName": "The New York Daily News",
                            "gender": "none",
                            "photo": {
                              "prefix": "https://igx.4sqi.net/img/user/",
                              "suffix": "/3EV01452MGIUWBAQ.jpg"
                            },
                            "type": "page"
                          }
                        }
                      ]
                    }
                  ]
                },
                "shortUrl": "http://4sq.com/2UsPUp",
                "timeZone": "America/New_York",
                "listed": {
                  "count": 5731,
                  "groups": [
                    {
                      "type": "others",
                      "name": "Lists from other people",
                      "count": 5731,
                      "items": [
                        {
                          "id": "4fad24a2e4b0bcc0c18be03c",
                          "name": "101 places to see in Manhattan before you die",
                          "description": "Best spots to see in Manhattan (New York City) as restaurants, monuments and public spaces. Enjoy!",
                          "type": "others",
                          "user": {
                            "id": "356747",
                            "firstName": "John",
                            "lastName": "Doe",
                            "gender": "male",
                            "photo": {
                              "prefix": "https://igx.4sqi.net/img/user/",
                              "suffix": "/356747-WQOTM2ASOIERONL3.jpg"
                            }
                          },
                          "editable": false,
                          "public": true,
                          "collaborative": false,
                          "url": "/boke/list/101-places-to-see-in-manhattan-before-you-die",
                          "canonicalUrl": "https://foursquare.com/boke/list/101-places-to-see-in-manhattan-before-you-die",
                          "createdAt": 1336747170,
                          "updatedAt": 1406242886,
                          "photo": {
                            "id": "4fa97b0c121d8a3faef6f2df",
                            "createdAt": 1336507148,
                            "prefix": "https://igx.4sqi.net/img/general/",
                            "suffix": "/IcmBihQCVr4Zt0Vxt9l237NHv--nxg1Z5_8QIMjeD8E.jpg",
                            "width": 325,
                            "height": 487,
                            "user": {
                              "id": "13125997",
                              "firstName": "IWalked Audio Tours",
                              "gender": "none",
                              "photo": {
                                "prefix": "https://igx.4sqi.net/img/user/",
                                "suffix": "/KZCTVBJ0FXUHSQA5.jpg"
                              },
                              "type": "page"
                            },
                            "visibility": "public"
                          },
                          "followers": {
                            "count": 944
                          },
                          "listItems": {
                            "count": 101,
                            "items": [
                              {
                                "id": "t4b67904a70c603bb845291b4",
                                "createdAt": 1336747293,
                                "photo": {
                                  "id": "4faa9dd9e4b01bd5523d1de8",
                                  "createdAt": 1336581593,
                                  "prefix": "https://igx.4sqi.net/img/general/",
                                  "suffix": "/KaAuGPKMZev1Te0uucRYHk92RiULGj3-GYWkX_zXbjM.jpg",
                                  "width": 720,
                                  "height": 532,
                                  "visibility": "public"
                                }
                              }
                            ]
                          }
                        }
                      ]
                    }
                  ]
                },
                "phrases": [
                  {
                    "phrase": "parque todo",
                    "sample": {
                      "entities": [
                        {
                          "indices": [
                            22,
                            33
                          ],
                          "type": "keyPhrase"
                        }
                      ],
                      "text": "... a ponta, curtir o parque todo, sem pressa, admirando cada lugar. Se puder..."
                    },
                    "count": 4
                  }
                ],
                "hours": {
                  "status": "Open until 1:00 AM",
                  "isOpen": true,
                  "isLocalHoliday": false,
                  "timeframes": [
                    {
                      "days": "Mon–Sun",
                      "includesToday": true,
                      "open": [
                        {
                          "renderedTime": "6:00 AM–1:00 AM"
                        }
                      ],
                      "segments": []
                    }
                  ]
                },
                "popular": {
                  "status": "Likely open",
                  "isOpen": true,
                  "isLocalHoliday": false,
                  "timeframes": [
                    {
                      "days": "Tue–Thu",
                      "open": [
                        {
                          "renderedTime": "Noon–8:00 PM"
                        }
                      ],
                      "segments": []
                    },
                    {
                      "days": "Fri",
                      "open": [
                        {
                          "renderedTime": "11:00 AM–7:00 PM"
                        }
                      ],
                      "segments": []
                    },
                    {
                      "days": "Sat",
                      "open": [
                        {
                          "renderedTime": "8:00 AM–8:00 PM"
                        }
                      ],
                      "segments": []
                    },
                    {
                      "days": "Sun",
                      "open": [
                        {
                          "renderedTime": "8:00 AM–7:00 PM"
                        }
                      ],
                      "segments": []
                    }
                  ]
                },
                "pageUpdates": {
                  "count": 12,
                  "items": []
                },
                "inbox": {
                  "count": 0,
                  "items": []
                },
                "venueChains": [],
                "attributes": {
                  "groups": [
                    {
                      "type": "payments",
                      "name": "Credit Cards",
                      "summary": "No Credit Cards",
                      "count": 7,
                      "items": [
                        {
                          "displayName": "Credit Cards",
                          "displayValue": "No"
                        }
                      ]
                    }
                  ]
                },
                "bestPhoto": {
                  "id": "513bd223e4b0e8ef8292ee54",
                  "createdAt": 1362874915,
                  "source": {
                    "name": "Instagram",
                    "url": "http://instagram.com"
                  },
                  "prefix": "https://igx.4sqi.net/img/general/",
                  "suffix": "/655018_Zp3vA90Sy4IIDApvfAo5KnDItoV0uEDZeST7bWT-qzk.jpg",
                  "width": 612,
                  "height": 612,
                  "visibility": "public"
                }
              }
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
                        a bounce animation is set to the marker with a timeout to stop the animation */
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
                                    invoke the showPlaceDetails to get the details of the selected place from foursquare API */
                                this.setState({selectedPlace: index});
                                let place = this.state.places[index];
                                this.moveToLocation(place.location.lat, place.location.lng, false);
                                this.showPlaceDetails(place);
                            }}
                            results={this.state.results} 
                            selectedPlace = {this.state.selectedPlace}
                        />
                        {this.state.placeObj &&
                            /* contains the details of the place selected by the user and is only shown when user select a place */
                            <PlaceDetails place={this.state.placeObj}
                                onClose={() => {
                                    /* when user clicks on the close button in the details component, 
                                        the placeObj is set to undefined to hide the component and 
                                        sets selectedPlace to -1 to remove the selected place style */
                                    this.setState({placeObj: undefined});
                                    this.setState({selectedPlace: -1});
                                }}
                            />
                        }
                        {/* contains the google map */}
                        <div id="map"></div>
                    </main>
                )
            }
          </div>
        );
      }
}

export default SearchResults;