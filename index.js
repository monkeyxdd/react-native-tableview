/*
    列表组件封装
*/

import React, { Component } from 'react';

import {
    Platform,
    requireNativeComponent,
    NativeModules,
    Dimensions,
    View,
    FlatList
} from 'react-native';
// var NativeTableView = Platform.OS == 'ios'? require('react-native-tableview') : '';
import NativeTableView from Platform.OS == 'ios'?'./ios/index':'';

// var Item = TableViewIOS.Item;
const { width, height } = Dimensions.get('window');

export default class TableView extends Component {
    constructor(props) {
        super(props);
        //this._onChange = this._onChange.bind(this);
        this._onPress = this._onPress.bind(this);
        this._onFooter = this._onFooter.bind(this);
        this._onHeader = this._onHeader.bind(this);
    }
    _onChange(event) {
        this.props.onChange(event.nativeEvent.value);
    }
    _onHeader(event) {
        this.props.onHeader();
    }
    _onFooter(event) {
        this.props.onFooter();
    }
    _onPress(event) {
        this.props.onPress(event);
    }
    _isFetchError = () => {
        this.refs.tableview.isFetchError(false);
    }
    _renderRow = (data) =>{
        return (
            data.map((item, index) => <NativeTableView.Cell key={index} style={{ height: 88 }}>{
                this.props.renderItem({item,index})
                }
                </NativeTableView.Cell>
        ))
    }
    render() {
        const { isNeedHeader, isNeedFooter, dataSource, renderItem, fetchError, style } = this.props;
        if (Platform.OS === 'android') {
            return (
                <FlatList
                    style={this.props.style}
                    data={dataSource}
                    renderItem={this.props.renderItem}
                    onEndReachedThreshold={0.05}
                    keyExtractor={this.props.keyExtractor ? this.props.keyExtractor : (item, index) => index}
                />
            );
        }
        return (
            <NativeTableView
                ref={'tableview'}
                style={this.props.style}
                isNeedFooter={isNeedFooter || false}
                isNeedHeader={isNeedHeader || false}
                allowsMultipleSelection={true}
                tableViewCellStyle={NativeTableView.Consts.CellStyle.Subtitle}
                tableViewStyle={NativeTableView.Consts.Style.Plain}
                onHeader={this._onHeader}
                onFooter={this._onFooter}
                onPress={this._onPress}>
                <NativeTableView.Section>{
                    this._renderRow(dataSource)
                }
                </NativeTableView.Section>
            </NativeTableView>
        );
    }
}