import React, { Component } from 'react';
import { List } from "antd-mobile"; //用来antd mobile
import _ from "lodash"; 

import {
  CameraRoll,
} from 'react-native';

const Item = List.Item;
const Brief = Item.Brief;

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
    const data = await CameraRoll.getPhotos({ first: 10000}); //得到10000条相片
    const uniqTypesPics = _.groupBy(data.edges, (val) => {
      return val.node.group_name;
    }); // 根据他的group_name进行分组


    let categorys =_.keys(uniqTypesPics).map((key)=> {
      return {
        name: key,
        demoImage: uniqTypesPics[key][0].node.image,//拿到分组的第一张图片作为样例
        count: uniqTypesPics[key].length,//拿到分组的图片数量
      };
    })

    this.setState({
      categorys: categorys
    }); //对筛选的分组进行存储 因为是异步操作所以是不能直接得到值的。要先存到state里面
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

  render() {
    return (
      <List className="my-list">
        {this.renderGroups()}
      </List>
    );
  }
}

export default App;
