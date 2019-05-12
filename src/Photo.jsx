import React from "react"
import styled from "styled-components"
import moment from "moment"

import { mediaMin } from "./theme"

const Card = styled.div`
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  margin: 0 0 16px 0;
  text-align: center;
  width: 100%;

  ${mediaMin.tablet`
    margin: 0 16px 16px 16px;
    width: 25%;
  `}
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  height: 65%;
  justify-content: space-between;
  padding: 4px;
`

const ImgThumbnail = styled.div`
  background-image: url("${props => props.src}");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  height: 160px;
  width: 100%;
`

const Author = styled.p`
  margin: 4px 0;
`

const Date = styled.p`
  color: #999;
  font-size: 12px;
  font-style: italic;
  margin: 4px 0;
`

const Tag = styled.span`
  cursor: pointer;
  display: inline-block;
  font-size: 10px;
  margin: 0 4px;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`

// Flickr format - "nobody@flickr.com ("Author - Photographer")"
const formatAuthor = author => {
  console.log(author)
  const [_, match] = author.match(/\("(.+)"\)/)
  return match
}

const formatDate = date => moment(date).format("DD/MM/YYYY")

const Photo = ({ author, date_taken, link, media, tags, onTagClick }) => (
  <Card>
    <ImgThumbnail src={media.m} onClick={() => window.open(link, "_blank")} />
    <CardBody>
      <div>
        <Author>{formatAuthor(author)}</Author>
        <Date>{formatDate(date_taken)}</Date>
      </div>
      <span>
        {tags.split(" ").map(tag => (
          <Tag key={tag} onClick={() => onTagClick(tag)}>
            {tag}
          </Tag>
        ))}
      </span>
    </CardBody>
  </Card>
)

export default Photo
