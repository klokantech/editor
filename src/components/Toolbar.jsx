import React from 'react'
import PropTypes from 'prop-types'
import FileReaderInput from 'react-file-reader-input'
import classnames from 'classnames'

import MdFileDownload from 'react-icons/lib/md/file-download'
import MdFileUpload from 'react-icons/lib/md/file-upload'
import OpenIcon from 'react-icons/lib/md/open-in-browser'
import MdInfo from 'react-icons/lib/md/info'
import SourcesIcon from 'react-icons/lib/md/layers'
import MdSave from 'react-icons/lib/md/save'
import MdStyle from 'react-icons/lib/md/style'
import MdMap from 'react-icons/lib/md/map'
import MdInsertEmoticon from 'react-icons/lib/md/insert-emoticon'
import MdFontDownload from 'react-icons/lib/md/font-download'
import HelpIcon from 'react-icons/lib/md/help-outline'
import InspectionIcon from 'react-icons/lib/md/find-in-page'

import logoImage from '../img/logo-white.svg'
import SourcesModal from './modals/SourcesModal'

import style from '../libs/style'

class IconText extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  }

  render() {
    return <span className="maputnik-icon-text">{this.props.children}</span>
  }
}

class ToolbarLink extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    href: PropTypes.string,
  }

  render() {
    return <a
      className={classnames('maputnik-toolbar-link', this.props.className)}
      href={this.props.href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {this.props.children}
    </a>
  }
}

class ToolbarAction extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func
  }

  render() {
    return <a
      className='maputnik-toolbar-action'
      onClick={this.props.onClick}
    >
      {this.props.children}
    </a>
  }
}

export default class Toolbar extends React.Component {
  static propTypes = {
    mapStyle: PropTypes.object.isRequired,
    inspectModeEnabled: PropTypes.bool.isRequired,
    onStyleChanged: PropTypes.func.isRequired,
    // A new style has been uploaded
    onStyleOpen: PropTypes.func.isRequired,
    onStyleExport: PropTypes.func.isRequired,
    // A dict of source id's and the available source layers
    sources: PropTypes.object.isRequired,
    onStyleSave: PropTypes.func.isRequired,
    onInspectModeToggle: PropTypes.func.isRequired,
    children: PropTypes.node
  }

  constructor(props) {
    super(props)
    this.state = {
      isOpen: {
        sources: false,
        add: false,
      }
    }
  }

  toggleModal(modalName) {
    this.setState({
      isOpen: {
        ...this.state.isOpen,
        [modalName]: !this.state.isOpen[modalName]
      }
    })
  }

  render() {
    return <div className='maputnik-toolbar'>
      <SourcesModal
          mapStyle={this.props.mapStyle}
          onStyleChanged={this.props.onStyleChanged}
          isOpen={this.state.isOpen.sources}
          onOpenToggle={this.toggleModal.bind(this, 'sources')}
      />
      <div className="maputnik-toolbar__inner">
        <ToolbarLink
          href="https://cloud.maptiler.com"
          className="maputnik-toolbar-logo"
        >
          <img src={logoImage} alt="Maputnik" />
        </ToolbarLink>
        <div className="maputnik-toolbar__actions">
          <ToolbarAction onClick={this.props.onStyleOpen}>
            <OpenIcon />
            <IconText>Open</IconText>
          </ToolbarAction>
          <ToolbarAction onClick={this.props.onStyleSave}>
            <MdSave />
            <IconText>Save</IconText>
          </ToolbarAction>
          <ToolbarAction onClick={this.props.onStyleExport}>
            <MdFileDownload />
            <IconText>Export</IconText>
          </ToolbarAction>
          <ToolbarAction onClick={this.toggleModal.bind(this, 'sources')}>
            <SourcesIcon />
            <IconText>Sources</IconText>
          </ToolbarAction>
          <ToolbarAction onClick={this.props.onInspectModeToggle}>
            <InspectionIcon />
            <IconText>
              { this.props.inspectModeEnabled && <span>Map Mode</span> }
              { !this.props.inspectModeEnabled && <span>Inspect Mode</span> }
            </IconText>
          </ToolbarAction>
        </div>
      </div>
    </div>
  }
}
