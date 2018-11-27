import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, AnyAction } from 'redux';

import Note from '../../../common/types/note';
import styles from './styles.less';
import { noteUpdate } from '../notes/actions';

interface NoteEditOwnProps {
  id: number
}
interface NoteEditProps {
  note: Note | undefined;
}
interface NoteEditComponentProps extends NoteEditProps, NoteEditOwnProps {
  dispatch: Dispatch<AnyAction>;
}

interface NoteEditComponentState {
  text: string | null;
}

class NoteEdit extends React.Component<NoteEditComponentProps, NoteEditComponentState> {
  private noteText: HTMLTextAreaElement;
  private idleTimeout: number | null = null;

  constructor(props: NoteEditComponentProps) {
    super(props);
    this.state = {
      text: props.note && props.note.text || null
    }
  }

  componentDidUpdate(prevProps: NoteEditComponentProps, prevState: NoteEditComponentState): void {
    if ((prevState.text === null || prevProps.id !== this.props.id) && this.props.note) {
      this.setState({ text: this.props.note.text });
    }
  }

  render(): JSX.Element {
    if (!this.props.note) {
      return (
        <div>Unable to load the selected note</div>
      );
    }
    return (
      <div className={styles.noteEdit}>
        <textarea
          ref={(element: HTMLTextAreaElement) => { this.noteText = element; }}
          onChange={this.resetIdleTimer.bind(this)}
          value={this.state.text || ''}
        />
      </div>
    );
  }

  private resetIdleTimer(): void {
    if (this.idleTimeout !== null) {
      clearTimeout(this.idleTimeout);
    }
    this.idleTimeout = window.setTimeout(() => {
      this.updateNote();
      this.idleTimeout = null;
    }, 800);
    this.setState({ text: this.noteText.value });
  }

  private updateNote(): void {
    this.props.dispatch(noteUpdate(this.props.id, this.noteText.value));
  }
}

function mapStateToProps(state: any, ownProps: NoteEditOwnProps): NoteEditProps {
  return { note: state.notes.find((note: Note) => note.id === ownProps.id) };
}

export default connect(mapStateToProps)(NoteEdit);