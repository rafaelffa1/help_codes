const {Editor, EditorState, ContentState} = Draft;

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  render() {
    return (
      <div className="container-root">
        <Editor 
          placeholder="Type away :)"
          editorState={this.state.editorState}
          onChange={this._handleChange}
          handleReturn={this.handleReturn}
        />
      </div>
    );
  }
  _handleChange = (editorState) => {
    this.setState({editorState});
  }
  handleReturn = (e) => {
    const isNewLineKeyPressed = e.altKey || e.ctrlKey || e.shiftKey;
    if (!isNewLineKeyPressed) {
      this.clear();
      return 'handled';
    }
    return 'not-handled';
  }
  clear() {
    setTimeout(() => {
      const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
      const focusedEditorState = EditorState.moveFocusToEnd(editorState);
      this._handleChange(focusedEditorState);
    }, 10);
  }
}

ReactDOM.render(<Container />, document.getElementById('react-root'))