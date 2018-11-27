import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';

import Note from '../../../common/types/note';
import { notesListGet } from '../notes/actions';
import styles from './styles.less';

interface NotesListProps {
  notes: Note[] | undefined;
}
interface NotesListComponentProps extends NotesListProps, RouteComponentProps {
  dispatch: Dispatch<AnyAction>;
}

class NotesList extends React.Component<NotesListComponentProps, {}> {
  componentDidMount(): void {
    this.props.dispatch(notesListGet());
  }
  render(): JSX.Element {
    if (!this.props.notes) {
      return (
        <div>Loading...</div>
      );
    }
    const sortedNotes = this.props.notes.sort((noteA: Note, noteB: Note) => noteA.updated > noteB.updated ? -1 : noteA.updated < noteB.updated ? 1 : 0);
    return (
      <div className={styles.notesList}>
        {sortedNotes.map((note: Note, index: number) => (
          <NavLink
            to={`/notes/${note.id}`}
            activeClassName={styles.active}
            exact
            key={index}
          >{note.text.split(/\n/)[0] || 'New note'}</NavLink>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state: any): NotesListProps {
  return { notes: state.notes };
}

export default withRouter(connect(mapStateToProps)(NotesList));