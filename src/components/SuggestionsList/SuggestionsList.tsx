/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import '../../yamui';
import * as React from 'react';
import { NestableBaseComponentProps } from '../../util/BaseComponent/props';
import SuggestionsListItem, { SuggestionItem } from './SuggestionsListItem';
import Spinner from '../Spinner';
import Text, { TextSize, TextColor } from '../Text';
import Callout, { DirectionalHint } from '../Callout';
import Block, { GutterSize } from '../Block';
import './SuggestionsList.css';
import { IPoint } from 'office-ui-fabric-react/lib/utilities/positioning';

export interface SuggestionsListProps extends NestableBaseComponentProps {
  /**
   * The target that the Callout should try to position itself based on.
   */
  target: HTMLElement | IPoint;
  /**
   * The active search that produced the current state.
   */
  searchText: string;
  /**
   * Text to show next to the loading spinner.
   */
  loadingText: string;
  /**
   * Text to show when the results are empty for the active search.
   */
  noResultsText: string;
  /**
   * Flag to indicate that a search is in flight
   * @default false
   */
  isLoading?: boolean;
  /**
   * The groups of items to render.
   */
  groupedItems?: SuggestionItemGroupProps[];
  /**
   * The index of current keyboard selection.
   */
  selectedId?: string | number;
  /**
   * Called when an item in a group is selected by clicking.
   */
  onItemSelected(id: string | number): void;
}

interface SuggestionsListWithResultsProps extends SuggestionsListProps {
  groupedItems: SuggestionItemGroupProps[];
}

export interface SuggestionItemGroupProps {
  title: string;
  items: SuggestionItem[];
}

const hasResults = (props: SuggestionsListProps): props is SuggestionsListWithResultsProps => {
  return !!props.groupedItems && props.groupedItems.length > 0;
};

const withResultsClass = 'y-suggestions-list--with-results';
const withStatusClass = 'y-suggestions-list--with-status';

/**
 * A `SuggestionsList` displays a list of search results in a dropdown.
 */
export default class SuggestionsList extends React.PureComponent<SuggestionsListProps> {
  public render() {
    const status = this.getSearchStatus();
    const results = this.getGroupedResults();

    const classNames = ['y-suggestions-list'];
    if (status) {
      classNames.push(withStatusClass);
    }
    if (results) {
      classNames.push(withResultsClass);
    }

    return (
      <Callout
        calloutWidth={280}
        doNotLayer={true}
        directionalHint={DirectionalHint.bottomLeftEdge}
        directionalHintFixed={true}
        target={this.props.target}
        className={classNames.join(' ')}
        isBeakVisible={false}
        minPagePadding={-500} /* allow to run past bottom of viewport */
      >
        {results}
        {status}
      </Callout>
    );
  }

  private getGroupedResults() {
    if (!hasResults(this.props)) {
      return null;
    }
    return (
      <ul className="y-suggestions-list--results">
        {this.props.groupedItems.map(this.getGroupResults)}
      </ul>
    );
  }

  private getGroupResults = (group: SuggestionItemGroupProps) => {
    const items = group.items.map(this.getResultItem);
    return (
      <li key={group.title}>
        <ul>{items}</ul>
      </li>
    );
  };

  private getResultItem = (item: SuggestionItem) => {
    const { searchText, selectedId, onItemSelected } = this.props;
    const isSelected = item.id === selectedId;
    return (
      <li key={item.id}>
        <SuggestionsListItem
          searchText={searchText}
          isSelected={isSelected}
          onSelect={onItemSelected}
          {...item}
        />
      </li>
    );
  };

  private getSearchStatus() {
    return this.props.isLoading ? this.getLoading() : this.getNoResults();
  }

  private getLoading() {
    return (
      <Spinner
        text={this.props.loadingText}
        className="y-suggestions-list--loading"
        isCentered={true}
      />
    );
  }

  private getNoResults() {
    if (hasResults(this.props)) {
      return null;
    }
    return (
      <Block textAlign="center" padding={GutterSize.LARGE} textSize={TextSize.SMALL}>
        <Text color={TextColor.METADATA}>{this.props.noResultsText}</Text>
      </Block>
    );
  }
}
