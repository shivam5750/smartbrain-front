import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecoginition from './components/FaceRecoginition/FaceRecoginition';

const particleOptions = {
  particles: {
    number: {
      value: 155,
      density: {
        enable: true,
        value_area:800
      }
    }
  }
}
const app = new Clarifai.App({
 apiKey: 'YOUR_API_KEY'
});

const IntialState = {
  input: " ",
      imageUrl: " ",
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: 2,
        name: '',
        email: '',
        entries: 0,
        joined:''
      }
}
class App extends Component{

  constructor() {
    super()
    this.state = IntialState
  }

  loadUser=(data)=> {
    this.setState({
      user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined:data.joined
    }})
  }


  calculateFaceLocation = (data) => {
    const faceLocation = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftcol: faceLocation.left_col * width,
      topRow: faceLocation.top_row * height,
      rightcol: width - (faceLocation.right_col * width),
      bottomRow: height -(faceLocation.bottom_row *height)

    }
  }

  boxLocation = (box) => {
    this.setState({ box: box })
  }
  
  onInputChange = (event) => {
    this.setState({ input: event.target.value })
    
  }

  onButtonClick = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        if (response) {
          fetch('https://powerful-depths-64004.herokuapp.com/image', {
            'method': 'put',
            'headers': { 'content-Type': 'application/json' },
            'body': JSON.stringify({
                id:this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries:count}))
            })
        }
        this.boxLocation(this.calculateFaceLocation(response))
       })
      .catch(err => console.log(err))
  }

  onRouteChange = (place) => {    
    if (place === 'signout') {
      this.setState(IntialState)
    } else if (place === 'home') {
      this.setState({isSignedIn:true})
    }
    this.setState({route:place})
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particleOptions}
        />
        <Navigation isSignedIn ={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onButtonClick ={this.onButtonClick} onInputChange={ this.onInputChange }/>
              <FaceRecoginition box={this.state.box} imageSrc ={this.state.imageUrl} />
           </div>
          : (this.state.route === 'signin'?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            :<Register loadUser={this.loadUser} onRouteChange={ this.onRouteChange}/>
          )  

        }
        
      </div>
    )
  }
}
export default App;
