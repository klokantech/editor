import React from 'react'
import PropTypes from 'prop-types'
import Modal from './Modal'
import Button from '../Button'

import { deleteSource, addSource, changeSource } from '../../libs/source'
import sources from '../../config/tilesets.json'

import AddIcon from 'react-icons/lib/md/add-circle-outline'
import DeleteIcon from 'react-icons/lib/md/delete'

class Source extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
  }

  render() {
    return <div className="maputnik-public-source">
			<Button
        className="maputnik-public-source-select"
				onClick={() => this.props.onSelect(this.props.id)}
			>
				<div className="maputnik-public-source-info">
					<p className="maputnik-public-source-name">{this.props.title}</p>
					<p className="maputnik-public-source-id">#{this.props.id}</p>
				</div>
				<span className="maputnik-space" />
				<AddIcon />
			</Button>
    </div>
  }
}

class ActiveSourceTypeEditor extends React.Component {
  static propTypes = {
    sourceId: PropTypes.string.isRequired,
    source: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
  }

  render() {
    return <div className="maputnik-active-source-type-editor">
      <div className="maputnik-active-source-type-editor-header">
        <span className="maputnik-active-source-type-editor-header-id">#{this.props.sourceId}</span>
        <span className="maputnik-space" />
        <Button
          className="maputnik-active-source-type-editor-header-delete"
          onClick={()=> this.props.onDelete(this.props.sourceId)}
          style={{backgroundColor: 'transparent'}}
        >
          <DeleteIcon />
        </Button>
      </div>
    </div>
  }
}

const strip = function(source) {
  const strippedSource = {...source}
  delete strippedSource['title']
  return strippedSource
}

class SourcesModal extends React.Component {
  static propTypes = {
    mapStyle: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onOpenToggle: PropTypes.func.isRequired,
    onStyleChanged: PropTypes.func.isRequired,
  }

  render() {
    const mapStyle = this.props.mapStyle
    const activeSources = Object.keys(mapStyle.sources).map(sourceId => {
      const source = mapStyle.sources[sourceId]
      return <ActiveSourceTypeEditor
        key={sourceId}
        sourceId={sourceId}
        source={source}
        onDelete={() => {
          this.props.onStyleChanged(deleteSource(mapStyle, sourceId))
        }}
      />
    })

    const tilesetOptions = Object.keys(sources)
        .filter(sourceId => !(sourceId in mapStyle.sources))
        .map(sourceId => {
      const source = sources[sourceId]
      return <Source
        key={sourceId}
        id={sourceId}
        type={source.type}
        title={source.title}
        onSelect={() => {
          this.props.onStyleChanged(addSource(mapStyle, sourceId, strip(source)));
        }}
      />
    })

    return <Modal
      isOpen={this.props.isOpen}
      onOpenToggle={this.props.onOpenToggle}
      title={'Sources'}
    >
      <div className="maputnik-modal-section">
        <h4>Active Sources</h4>
        {activeSources}
      </div>

      <div className="maputnik-modal-section">
        <h4>Choose Available Source</h4>
        <p>
          Add one of available sources to your style.
        </p>
        <div style={{maxwidth: 500}}>
        {tilesetOptions}
        </div>
      </div>

    </Modal>
  }
}

export default SourcesModal
