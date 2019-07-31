import React from 'react';
import PropTypes from 'prop-types';

import Message from '../Message/Message';
import { StyledContainer, StyledList, StyledP, StyledInfo } from './style';

import { authorColors } from '../../utils/colors';

const MessageViewer = ({ messages, limit }) => {
  const participants = Array.from(
    new Set(messages.map(({ author }) => author)),
  ).filter(author => author !== 'System');
  const activeUser = participants[1];
  const colorMap = participants.reduce((obj, participant, i) => {
    return { ...obj, [participant]: authorColors[i % authorColors.length] };
  }, {});
  const renderedMessages =
    messages.length > limit ? messages.slice(0, limit) : messages;
  const isLimited = renderedMessages.length !== messages.length;

  return (
    <StyledContainer>
      {messages.length > 0 && (
        <StyledP>
          <StyledInfo>
            Showing {isLimited && 'first'} {renderedMessages.length} messages{' '}
            {isLimited && (
              <span>(out of {messages.length} for performance reasons)</span>
            )}
          </StyledInfo>
        </StyledP>
      )}

      <StyledList>
        {renderedMessages.map((message, i, arr) => {
          const prevMessage = arr[i - 1];

          return (
            <Message
              key={i} // eslint-disable-line react/no-array-index-key
              message={message}
              color={colorMap[message.author]}
              isActiveUser={activeUser === message.author}
              sameAuthorAsPrevious={
                prevMessage && prevMessage.author === message.author
              }
            />
          );
        })}
      </StyledList>
    </StyledContainer>
  );
};

MessageViewer.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.instanceOf(Date),
      author: PropTypes.string,
      message: PropTypes.string,
    }),
  ).isRequired,
  limit: PropTypes.number,
};

MessageViewer.defaultProps = {
  limit: Infinity,
};

export default MessageViewer;
