import {Component} from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
import Header from '../Header'
import './index.css'

class Albums extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imagesList: [],
      photoIndex: 0,
      isOpen: false,
    }
  }

  componentDidMount() {
    this.getAlbums()
  }

  getAlbums = async () => {
    const apiUrl = `https://jsonplaceholder.typicode.com/photos`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.map(item => ({
        title: item.title,
        url: item.url,
        id: item.id,
        thumbnailUrl: item.thumbnailUrl,
      }))
      this.setState({
        imagesList: updatedData,
      })
    }
  }

  render() {
    const {photoIndex, isOpen, imagesList} = this.state

    return (
      <>
        <Header />
        <div className="album-container">
          <button
            className="albums"
            type="button"
            onClick={() => this.setState({isOpen: true})}
          >
            Open Album
          </button>

          {isOpen && (
            <Lightbox
              mainSrc={imagesList[photoIndex]}
              nextSrc={imagesList[(photoIndex + 1) % imagesList.length]}
              prevSrc={
                imagesList[
                  (photoIndex + imagesList.length - 1) % imagesList.length
                ]
              }
              onCloseRequest={() => this.setState({isOpen: false})}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex:
                    (photoIndex + imagesList.length - 1) % imagesList.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % imagesList.length,
                })
              }
            />
          )}
        </div>
      </>
    )
  }
}

export default Albums
