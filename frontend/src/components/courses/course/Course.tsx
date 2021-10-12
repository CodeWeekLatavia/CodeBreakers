import React from 'react'
import '../courses.scss'
import Star from '../../../assets/svg/Profile/star.svg';

interface Props {
    data: any;
}

const Course: React.FC<Props> = ({data}): JSX.Element => {
    return (
        <div className="courses swiper">
            <div className="courses__course swiper-slide">
                <img src={data.image} alt={`course with name ${data.name}`} />
                <p className="courses__course__name">{data.name}</p>
                <p className="courses__course__author">{data.author}</p>
                <p className="courses__course__description">{data.description}</p>
                <h4>Price: <img src={Star} alt="points"/>{data.price}</h4>
                <button>Apply</button>
            </div>
        </div>
    )
}

export default Course

