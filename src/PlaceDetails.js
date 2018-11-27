import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar, faDollarSign, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import './PlaceDetails.css';

class PlaceDetails extends Component {
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

    render() {
        return (
            <div className="page-details">
                <button className="close-btn" onClick={() => {
                    this.props.onClose();
                }}>
                    <FontAwesomeIcon icon={faTimes} size="lg" />
                </button>
                <h2>{this.props.place.name}</h2>
                {this.setStars()}
            </div>
        )
    }
}

export default PlaceDetails;