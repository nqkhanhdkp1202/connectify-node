import React from 'react';
import './index.css';
import Image1 from '../../assets/images/image1.jpg';
import Image2 from '../../assets/images/image2.jpg';
import Image3 from '../../assets/images/image3.jpg';
import Image4 from '../../assets/images/image4.jpg';
import Image5 from '../../assets/images/image5.jpeg';
import Image6 from '../../assets/images/image6.jpg';
import Image7 from '../../assets/images/image7.jpg';
import Image8 from '../../assets/images/image8.jpg';
import Image9 from '../../assets/images/image9.jpg';
import Image10 from '../../assets/images/image10.jpg';
import Story from '../Story';

function StoryReel() {
    return (
        <div className='storyReel'>
            <Story image={Image6} profileSrc={Image5} title='Pramurta Sinha' />
            <Story image={Image10} profileSrc={Image4} title='Elon Musk' />
            <Story image={Image8} profileSrc={Image1} title='Jeff Bezos' />
            <Story image={Image7} profileSrc={Image2} title='Bill Gates' />
            <Story image={Image9} profileSrc={Image3} title='Steve Jobs' />
        </div>
    )
}

export default StoryReel;
