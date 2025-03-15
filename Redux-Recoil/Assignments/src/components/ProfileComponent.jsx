import React, { useContext } from 'react'
import '../App.css'
import avatar from '../../public/avatar.jpg';
import ColorContext from '../context/ColorContext';

const ProfileComponent = ({stats, about}) => {
    const { color } = useContext(ColorContext);
    function convertNums (n) {
        return parseInt(n/100000000) > 0 ? parseFloat(n/100000000).toFixed(0)+"B" : parseInt(n/1000000)>0 ? parseFloat(n/1000000).toFixed(1)+"M" : parseInt(n/1000)>0 ? parseFloat(n/1000).toFixed(1)+"K" : n;
    }
    return (
        <div className='card'>
            <div className="header">
                <img src={avatar} alt="" className='img' />
            </div>
            <div className="info">
                <div className="about">
                    <h4 style={{color: color === "white"? "rgb(53, 52, 52)" : color}}>{about.name} {about.age}</h4>
                    <p>{about.place}</p>
                </div>

                <hr />
                <div className="stats">
                    <div>
                        <h5>{convertNums(stats.followers)}</h5>
                        <p>Followers</p>
                    </div>
                    <div>
                        <h5>{convertNums(stats.likes)}</h5>
                        <p>Likes</p>
                    </div>
                    <div>
                        <h5>{convertNums(stats.photos)}</h5>
                        <p>Photos</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent
