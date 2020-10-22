import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import colors from '../colors'

const ToolTipText = styled.span`
  visibility: hidden;
  background-color: ${colors.layer1Background};
  color: ${colors.layer1Foreground};
  font-weight: 600;
  text-align: center;
  border-radius: 6px;
  border-color: ${colors.layer2Background};
  border-style: solid;
  padding: 5px 0px;
  width: 80%;
  left:0;
  top:20px;
  opacity: 0.8;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
`

const MessageDiv = styled.div`
  // Make it easy to visually differentiate messages
  padding-bottom: 7px;
  position: relative;
  &:hover ${ToolTipText} {
    visibility: visible;
  }
`

const Message = (props) => {
  return (
    <MessageDiv>
      {/* IMPORTANT SPACE               --> */}
      <b>&lt;{props.message.sender}&gt;</b> <span>{props.message.content}</span>
      {props.message.playerID && <ToolTipText>{props.message.playerID}</ToolTipText>}
    </MessageDiv>
  )
}

const MessagesDiv = styled.div`
  flex-basis: 100%;
  padding: 1rem;
  // Scrollbar for message box
  flex: 1 1 auto; 
  overflow-y: auto;
  height: 0px;
  color: ${colors.layer1Foreground};
  // Copied from default React index.css
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
`


const Messages = (props) => {
  const [isNavigationMode, setNavigationMode] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    !isNavigationMode && messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }, [props.messages])

  const handleScroll = (scrollEvent) => {
      const element = scrollEvent.currentTarget
      const isBottom = Math.abs(element.scrollHeight - element.scrollTop - element.offsetHeight) < 3
      setNavigationMode(!isBottom)
  }

  return (
    <MessagesDiv onScroll={handleScroll}>
      {
        props.messages.map((message, index) => <Message key={index} message={message} />)
      }
      <div ref={messagesEndRef} />
    </MessagesDiv>
  )
}

export default Messages