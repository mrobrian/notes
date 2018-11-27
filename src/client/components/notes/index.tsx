import * as React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Dispatch, AnyAction } from 'redux';

import NoteEdit from '../noteEdit';
import NotesList from '../notesList';
import styles from './styles.less';
import { noteDelete, noteCreate } from './actions';

interface NotesProps extends RouteComponentProps<{ id: string }> {
  dispatch: Dispatch<AnyAction>;
}

class Notes extends React.Component<NotesProps> {
  constructor(props: NotesProps) {
    super(props);
  }

  render(): JSX.Element {
    const id: number | undefined = this.props.match.params.id ? parseInt(this.props.match.params.id, 10) : undefined;
    return (
      <div className={styles.notes}>
        <div className={styles.sidebar}>
          <NotesList />
          <div className={styles.actions}>
            <i className='fas fa-plus-circle' onClick={this.createNote.bind(this)} />
            {id && <i className='fas fa-trash' onClick={this.deleteNote.bind(this, id)} />}
          </div>
        </div>
        <Switch>
          <Route path='/notes/:id' render={({ match }) => <NoteEdit id={parseInt(match.params.id, 10)} />} />
          <Route render={() => <div className={styles.empty}>Please select a note to the left<br />or create a new one.</div>} />
        </Switch>
      </div>
    );
  }

  private createNote() {
    this.props.dispatch(noteCreate());
  }

  private deleteNote(id: number) {
    this.props.dispatch(noteDelete(id));
  }
}

export default withRouter(connect()(Notes));