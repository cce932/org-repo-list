import React from 'react';
import styled from 'styled-components';

const Icon = styled.span`
  font-size: 18px;
  line-height: 1.3;
`;

export function StarIcon() {
  return (
    <Icon className="material-icons">
      star_border
    </Icon>
  );
}
export function LanguageIcon() {
  return (
    <Icon className="material-icons">
      settings_ethernet
    </Icon>
  );
}
export function DateIcon() {
  return (
    <Icon className="material-icons-outlined">
      date_range
    </Icon>
  );
}
export function StorageIcon() {
  return (
    <Icon className="material-icons-outlined">
      sim_card_download
    </Icon>
  );
}
