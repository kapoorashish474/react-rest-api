import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';


// Object Structure creation 
interface UserInfo {
  name : UserName,
  location : Location,
  picture: UserPicture;
}

interface UserName {
  first : string, last: string, title : string
}

interface Location {
  city: string,
  state: string,
  country: string
}

interface UserPicture {
  thumbnail: string;
}

//parsing data for UserName 
const parseUserName = (userInfo : UserInfo) => {
  const { name : {first, last}} = userInfo;
  return `${first} ${last}`;
}

//paring data for Location 
const parseLocation = (userInfo : UserInfo) => {
  const {location : {city, state, country}} = userInfo;
  return `${city} , ${state} , ${country}`
 }

//fetching the data from axios 
export const fetchRandomData = () => {
  return axios.get('https://randomuser.me/api')
 .then(({data}) => {
   // handle success
   console.log(data.results);
   return data;
 })
 .catch(function (error) {
   // handle error
   console.error(error);
 });
}

function App() {
  const[randonUserData, setRandomUserData] = useState('');
  const [userInfos, setUserInfos] = useState<any>([]);

  // this is called on click of button 
  const fetchUserData =() => {
    // this is setting Data to UI 
    fetchRandomData().then(randomData => {

      const newUserInfo = [
        ...userInfos,
        ...randomData.results,
      ]
      setUserInfos(newUserInfo); 
    });
  }

  // this is called by default on Page Load 
  useEffect(() => {
    fetchRandomData().then(randomData => {
      setRandomUserData(JSON.stringify(randomData, null, 2) || '')
      const newUserInfo = [
        ...userInfos,
        ...randomData.results,
      ]
      setUserInfos(newUserInfo);
    });
    
  }, [])

  return (
    <div className="App">
      {console.log(userInfos.length)}
      <React.Fragment>
      <tr>
          {
            userInfos.map((userInfo: UserInfo, idx: number) => (
              <div key={idx}>
                <p>Full Name : {parseUserName(userInfo)}</p>
                <img src={userInfo.picture.thumbnail}></img>
                <p>Location : {parseLocation(userInfo)}</p>
              </div>
            ))
          }
        </tr>
      </React.Fragment>
      <button onClick={ () => fetchUserData()}>Find User Data</button>
    </div>
  );
}

export default App; 
