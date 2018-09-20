import React, { Component } from "react";
import { View, TextInput, ScrollView,Alert } from "react-native";
import { Icon, Header } from 'react-native-elements';
import HandleMorePress from "./HandleMorePress";
import AddNoteBottom from "./AddNoteBottom";
import HandleAddPress from "./HandleAddPress";

var noteService = require('../../../services/NoteService');
var styleSheet = require('../../../css/styles');
var style = styleSheet.style;

export default class UpdateNote extends Component {

    constructor(props) {
        super(props);
        var currentTime = new Date().toLocaleTimeString([], { hour12: true });
        // this.changeColor = this.changeColor.bind(this);
        this.state = {
            title: '',
            description: '',
            time: currentTime,
            color : '#d8ccc9',
            isOpenedMoreMenu: false,
            isOpenedPlusMenu : false
        }
    }

    changeColor(color){
        this.setState({color:color});
    }

    handleMorePress = () => {
        this.setState({ isOpenedMoreMenu: !this.state.isOpenedMoreMenu });
    }

    handleAddPress = () => {
        this.setState({ isOpenedPlusMenu: !this.state.isOpenedPlusMenu });
    }

    renderHeader() {
        var noteKey = this.props.noteKey;
        var note = this.props.note;
        return (
            <View style={{ flexDirection: 'row' }}>
                <Icon name="arrow-back"
                    onPress={() => { this.props.onClick(!this.props.modalVisible); noteService.updateNote(this.state.title, this.state.description, this.state.color,noteKey) }}
                    size={30} color="black"
                />

                <View style={{ flexDirection: 'row', marginLeft: 220 }}>
                    {
                        note.isPin ? <Icon name='pin' type='material-community' size={30} color="#4285f4" iconStyle={{ padding: 8, alignItems:'flex-end' }}
                            onPress={() => { noteService.isPinNote(noteKey, note) }} />
                            :
                            <Icon name='pin' type='material-community' size={30} color="grey" iconStyle={{ padding: 8 }}
                                onPress={() => { noteService.isPinNote(noteKey, note) }} />
                    }
                    <Icon name='reminder' type='material-community' size={30} color="grey" iconStyle={{ padding: 8 }}
                        onPress={() => { this.addReminderDialog(noteKey,note) }} />
                    {
                        note.isArchive === true ?
                        <Icon name='unarchive' size={30} color="grey" iconStyle={{ padding: 5, paddingRight: 10 }}
                        onPress={() => { noteService.isArchiveNote(noteKey, note) }} />
                        :
                        <Icon name='archive' size={30} color="grey" iconStyle={{ padding: 5, paddingRight: 10 }}
                        onPress={() => { noteService.isArchiveNote(noteKey, note) }} />
                    }
                    
                </View>
            </View>
        )
    }
    render() {
        var note = this.props.note;
        var noteKey = this.props.noteKey;

        return (
            <View style={{ position: 'relative', flexDirection: 'column', flex: 1 }}>
                <Header
                    centerComponent={this.renderHeader()}
                    backgroundColor="white"
                />
                <ScrollView>
                    <TextInput placeholder="Title" style={{ fontSize: 20, fontWeight: 'bold', padding: 15 }}
                        defaultValue={note.Notetitle}
                        onChangeText={(title) => this.setState({ title })} />

                    <TextInput placeholder="Note" style={{ fontSize: 20, padding: 15 }} multiline={true}
                        defaultValue={note.NoteDesc}
                        onChangeText={(description) => this.setState({ description })} />

                </ScrollView>

                <View style={style.slideMenuStyle}>
                    <HandleAddPress openAddMenu={this.state.isOpenedPlusMenu} />
                    <HandleMorePress oncolorChange = {this.changeColor} openMoreMenu={this.state.isOpenedMoreMenu} note={note} noteKey={noteKey} />
                </View>

                <View style={[style.addNoteBottomStyle, { backgroundColor: 'white', height: 50, flexDirection: 'row', justifyContent: 'center' }]}>
                    <AddNoteBottom time={this.state.time} onPressPlus={this.handleAddPress} onPressMore={this.handleMorePress}></AddNoteBottom>
                </View>

            </View>
        );
    }
}
