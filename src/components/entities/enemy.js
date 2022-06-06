import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { array, object, string } from 'prop-types';
import enemy from '../../images/soldier.png'
import { connect } from 'react-redux';

export class Monster extends Component {
    render() {
        const width = this.props.size[0];
        const height = this.props.size[1];
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height / 2;
        const whichMonster = allMonsters[this.props.killTimes % 3];
        return (
          <Image
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: width,
              height: height,
              transform: [{ scaleX: this.props.face }],
            }}
            source={whichMonster[`${this.props.state}${this.props.pose}`]}
          />
        );
      }
    }
    
    Monster.propTypes = {
      size: array,
      body: object,
      color: string,
    };
    
    const mapState = (state) => {
      return {
        killTimes: state.game.killTimes,
      };
    };
    
    export default connect(mapState, null)(Monster);
    