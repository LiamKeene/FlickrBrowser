import React from "react"

import CreatableSelect from "react-select/lib/Creatable"

import axios from "axios"

import { Container, Content, MainContent, SideBar, TopBar } from "./Layout"
import Photo from "./Photo"

const components = {
  DropdownIndicator: null,
}

const createOption = label => ({
  label,
  value: label,
})

const createSearchQuery = tags => {
  const searchQuery = tags.map(tag => tag.value).join(",")
  return `https://Flickr-Proxy-Server--liamkeene.repl.co/search?format=json&nojsoncallback=1&tags=${searchQuery}`
}

const App = () => {
  const [input, setInput] = React.useState()
  const [tags, setTags] = React.useState([])

  const [photos, setPhotos] = React.useState([])

  function handleInputChange(newInput) {
    setInput(newInput)
  }

  function handleTagsChange(newTags) {
    setTags(newTags)
    if (newTags.length === 0) {
      setPhotos([])
    }
  }

  function handleTagClick(tag) {
    setInput("")
    setTags([...tags, createOption(tag)])
  }

  function handleInputKeyDown(e) {
    if (!input) return
    switch (e.key) {
      case "Enter":
      case "Tab":
      case " ":
      case ",":
        handleTagClick(input)
        e.preventDefault()
        break
      default:
        return true
    }
  }

  React.useEffect(() => {
    if (tags.length > 0) {
      const req = axios.get(createSearchQuery(tags))
      req.then(({ data }) => setPhotos(data.items))
    }
  }, [tags])

  return (
    <Container>
      <TopBar>
        <h1>flickr browser</h1>
      </TopBar>
      <MainContent>
        <SideBar>
          <CreatableSelect
            isClearable
            isMulti
            components={components}
            inputValue={input}
            menuIsOpen={false}
            onChange={handleTagsChange}
            onInputChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type in some tags and press enter..."
            value={tags}
          />
        </SideBar>
        <Content>
          {photos.length > 0 &&
            photos.map(photo => (
              <Photo key={photo.link} onTagClick={handleTagClick} {...photo} />
            ))}
          {tags.length === 0 && photos.length === 0 && (
            <p>Photos will be displayed as tags are added</p>
          )}
          {tags.length > 0 && photos.length === 0 && (
            <p>No matching photos, try removing some tags.</p>
          )}
        </Content>
      </MainContent>
    </Container>
  )
}

export default App
