import React from 'react'
import CodeMirror from 'react-codemirror'
import style from './style.js'
import './dracula.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'


export class CodeEditor extends React.Component {
  static propTypes = {
    mapStyle: React.PropTypes.object.isRequired,
    onStyleChanged: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      code: JSON.stringify(style.toJSON(props.mapStyle), null, 2)
    }
  }

  onCodeChange(newValue) {
    this.props.onStyleChanged(style.fromJSON(newValue))
  }

  render() {
		const codeMirrorOptions = {
			mode: 'javascript',
			tabSize: 2,
			theme: 'dracula',
      viewportMargin: Infinity
		}
    return <CodeMirror value={this.state.code} onChange={this.onCodeChange.bind(this)} options={codeMirrorOptions}/>
  }
}
