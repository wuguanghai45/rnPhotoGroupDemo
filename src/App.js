import React, { Component } from 'react';
//import PropTypes from "prop-types";
//import PhotoList from "./PhotoList";
import { List } from "antd-mobile";

import {
  CameraRoll,
} from 'react-native';

const Item = List.Item;
const Brief = Item.Brief;

//const cnGroupName = {
  //"camera": "相机",
  //"screenshots": "截屏",
  //"Weixin": "微信",
  //"baiduNetdisk": "百度云",
//}

import _ from "lodash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
      currCategory: null,
    };
  }

  componentDidMount() {
    this.getPhotoTypes();
  }

  getPhotoTypes = async() => {
    const data = await CameraRoll.getPhotos({ first: 10000});
    const uniqTypesPics = _.groupBy(data.edges, (val) => {
      return val.node.group_name;
    });

    let categorys =_.keys(uniqTypesPics).map((key)=> {
      return {
        name: key,
        demoImage: uniqTypesPics[key][0].node.image,
        count: uniqTypesPics[key].length,
      };
    })
    this.setState({
      categorys: categorys
    });
    console.log(categorys);
  }

  renderGroups = () => {
    return this.state.categorys.map((category)=> {
      return (
        <Item
          key={category.name}
          arrow="horizontal"
          multipleLine
          thumb={category.demoImage.uri}
          onClick={() => {
            this.setState({
              currCategory: category.name
            });
          }}
          platform="android"
          extra={category.count}
        >
            <Brief>{ category.name} </Brief>
        </Item>
      )
    });
  }

  handleModalBack = () => {
    this.setState({
      currCategory: null
    });
  }

  //renderModal = () => {
    //if (this.state.currCategory) {
      //return (
        //<Modal
          //animationType={"slide"}
          //transparent={false}
          //visible
          //onRequestClose={() => {alert("Modal has been closed.")}}
        //>
          //<View style={{flex: 1}}>
            //<PhotoList groupName={this.state.currCategory} />
          //</View>
        //</Modal>
      //)
    //}
  //}

  render() {
    return (
      <List className="my-list">
        {this.renderGroups()}
        {/*this.renderModal()*/}
      </List>
    );
  }
}

export default App;
