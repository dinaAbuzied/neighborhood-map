import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar, faDollarSign, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { faFacebookSquare, faTwitterSquare, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './PlaceDetails.css';

class PlaceDetails extends Component {
    /**
     * @description creates a div holding the rating in numbers and creates five star icons,
     *              calculates which stars are full - empty - half (ex. rating = 3.5 creates 3 full 1 half 1 empty)
     *              note that the rating sent by foursquare api are of 10 it gets divided by 2 to show 5 stars
     */
    setStars() {
        if(this.props.place.rating) {
            let stars = [];
            for (let index = 0; index < 5; index++) {
                if(index < Math.floor(this.props.place.rating / 2))
                    stars.push(<span className="star" key={"star" + index.toString()}><FontAwesomeIcon icon={faStar} /></span>)
                else if(index === Math.floor(this.props.place.rating / 2) && Math.round(this.props.place.rating / 2) >= this.props.place.rating / 2)
                    stars.push(<span className="star" key={"star" + index.toString()}><FontAwesomeIcon icon={faStarHalfAlt} /></span>)
                else
                    stars.push(<span className="star" key={"star" + index.toString()}><FontAwesomeIcon icon={faStarEmpty} /></span>)
            }
            return <div className="ratings" style={{color: this.props.place.ratingColor ? "#" + this.props.place.ratingColor : "#777"}}>
                <span className="number">{this.props.place.rating / 2}</span>
                {stars}
            </div>
        }
    }

    /**
     * @description creates div holding num f dollar sign icons based on the price value ( 1 is min, 4 is max)
     */
    setPrice() {
        if(this.props.place.price) {
            let price = [];
            for (let index = 0; index < this.props.place.price.tier; index++) {
                price.push(<span className="price" key={"price" + index.toString()}><FontAwesomeIcon icon={faDollarSign} /></span>)
            }
            return <span className="pricing">
                {price}
            </span>
        }
    }

    render() {
        return (
            // class sm-hidden only works on screen with width less than 1024 to show only one component at a time
            <div className={this.props.currentScreen !== "Details" ? "sm-hidden page-details" : "page-details"}>
                <button tabIndex="0" className="close-btn" onClick={() => {
                    // calls the onClose function in SearchResults to remove the PlaceDetails component
                    this.props.onClose();
                }}>
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
                <h2>{this.props.place.name} {this.setPrice()}</h2>
                {this.setStars()}
                <hr/>
                {this.props.place.description &&
                     <p className="description">{this.props.place.description}</p>
                }
                {this.props.place.location && this.props.place.location.formattedAddress &&
                     <div className="address">
                        <span className="title">Address:</span> 
                        <span className="details">{this.props.place.location.formattedAddress}</span>
                    </div>
                }
                {this.props.place.contact && this.props.place.contact.phone && 
                    <div className="phone">
                        <span className="title">Phone:</span> 
                        <span className="details">{this.props.place.contact.phone}</span>
                    </div>
                }
                {this.props.place.hours && this.props.place.hours.status && 
                    <div className="hours">
                        <span className="title">Hours:</span> 
                        <span className="details">{this.props.place.hours.status}</span>
                    </div>
                }
                {this.props.place.contact && 
                    <div className="social-container">
                        <div className="social">
                            {this.props.place.contact.facebookUsername && 
                                <a tabIndex="0" href={"https://www.facebook.com/" + this.props.place.contact.instagram} rel="noopener noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faFacebookSquare} size="lg" />
                                </a>
                            }
                            {this.props.place.contact.twitter && 
                                <a tabIndex="0" href={"https://twitter.com/" + this.props.place.contact.twitter}  rel="noopener noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faTwitterSquare} size="lg" />
                                </a>
                            }
                            {this.props.place.contact.instagram && 
                                <a tabIndex="0" href={"https://www.instagram.com/" + this.props.place.contact.instagram}  rel="noopener noreferrer" target="_blank">
                                    <FontAwesomeIcon icon={faInstagram} size="lg" />
                                </a>
                            }
                        </div>
                    </div>
                }
                <hr/>
                {this.props.place.bestPhoto && 
                    <div className="photo">
                        <img src={this.props.place.bestPhoto.prefix + this.props.place.bestPhoto.width +"x" + this.props.place.bestPhoto.height + this.props.place.bestPhoto.suffix} alt={this.props.place.name}/>
                    </div>
                }
            </div>
        )
    }
}

export default PlaceDetails;