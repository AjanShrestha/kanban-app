import React, { Component } from 'react';

import uuid from 'uuid';
import Notes from './Notes';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [
        {
          id: uuid.v4(),
          task: 'Learn React'
        },
        {
          id: uuid.v4(),
          task: 'Revise final report'
        }
      ]
    };
  }
  render() {
    const {notes} = this.state;

    return (
      <div>
        <button onClick={() => this.addNote()}>+</button>
        <Notes
          notes={notes}
          onNoteClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
        />
      </div>
    );
  }

  addNote = () => {
    console.log('add note');
    const note = {
      id: uuid.v4(),
      task: 'New task'
    };
    this.setState({
      ...this.state,
      notes: [...this.state.notes, note]
    });
  }

  deleteNote = (id, e) => {
    // Avoid bubblind to edit
    e.stopPropagation();

    this.setState({
      ...this.state,
      notes: this.state.notes.filter(note => note.id !== id)
    });
  }

  activateNoteEdit = (id) => {
    this.setState({
      ...this.state,
      notes: this.state.notes.map(note => {
        if (note.id === id) {
          note.editing = true;
        }
        return note;
      })
    });
  }

  editNote = (id, task) => {
    this.setState({
      ...this.state,
      notes: this.state.notes.map(note => {
        if (note.id === id) {
          note.editing = false;
          note.task = task;
        }
        return note;
      })
    });
  }
}
