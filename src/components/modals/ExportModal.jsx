import React from 'react'
import PropTypes from 'prop-types'
import { saveAs } from 'file-saver'

import styleSpec from '@mapbox/mapbox-gl-style-spec/style-spec'
import InputBlock from '../inputs/InputBlock'
import StringInput from '../inputs/StringInput'
import SelectInput from '../inputs/SelectInput'
import CheckboxInput from '../inputs/CheckboxInput'
import Button from '../Button'
import Modal from './Modal'
import MdFileDownload from 'react-icons/lib/md/file-download'
import TiClipboard from 'react-icons/lib/ti/clipboard'
import style from '../../libs/style.js'
import GitHub from 'github-api'
import { CopyToClipboard } from 'react-copy-to-clipboard'


function stripAccessTokens(mapStyle) {
  const changedMetadata = { ...mapStyle.metadata }
  delete changedMetadata['maputnik:mapbox_access_token']
  delete changedMetadata['maputnik:openmaptiles_access_token']
  return {
    ...mapStyle,
    metadata: changedMetadata
  }
}

class ExportModal extends React.Component {
  static propTypes = {
    mapStyle: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onOpenToggle: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  downloadStyle() {
    const blob = new Blob([styleSpec.format(stripAccessTokens(this.props.mapStyle))], {type: "application/json;charset=utf-8"});
    saveAs(blob, this.props.mapStyle.id + ".json");
  }

  render() {
    return <Modal
      isOpen={this.props.isOpen}
      onOpenToggle={this.props.onOpenToggle}
      title={'Export Style'}
    >

      <div className="maputnik-modal-section">
        <h4>Download Style</h4>
        <p>
          Download a JSON style to your computer.
        </p>
        <Button onClick={this.downloadStyle.bind(this)}>
          <MdFileDownload />
          Download
        </Button>
      </div>
    </Modal>
  }
}

export default ExportModal
