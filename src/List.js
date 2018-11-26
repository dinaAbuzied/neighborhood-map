import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import './List.css';

class List extends Component {
    state = {
        loactionCollapsed: false,
        selectedLocatin: 0
    }

    render() {
        return (
          <div className="list">
            <div className={this.state.loactionCollapsed ? "collapsed location" : "location"} 
                style={{height: this.props.results.length > 0 ? this.props.results.length * 40 + 40 : 80}}>
                <label className="title" onClick= {() => {
                    this.setState({loactionCollapsed: !this.state.loactionCollapsed})
                }}>Location
                <FontAwesomeIcon icon={faAngleUp} size="lg" />
                </label>
                {
                    (this.props.location === "nearest") ? (
                        <div className="item selected">Nearest to you</div>
                    ) : (
                        this.props.results.map((loc, index) => {
                           return <div key={"location" + index.toString()} 
                                    className={this.state.selectedLocatin === index ? "item selected" : "item"}
                                    onClick= {() => {
                                        this.setState({selectedLocatin: index});
                                        this.props.changeLoction(index);
                                        }}>
                                    <FontAwesomeIcon icon={faLocationArrow} />
                                    {loc.formatted_address}</div>
                        })
                    )
                }
            </div>
          </div>
        );
      }
}

export default List;