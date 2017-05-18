import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export default class LangBtn extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLangChange(lang) {
    console.log(lang);
    this.props.handleLangChange(lang);
  }

  render() {
    return (
      <DropdownButton title={this.props.title} id="lang">
        <MenuItem onClick={() => this.handleLangChange('en')}>En</MenuItem>
        <MenuItem onClick={() => this.handleLangChange('jp')}>JP</MenuItem>
      </DropdownButton>
    )
  }
}