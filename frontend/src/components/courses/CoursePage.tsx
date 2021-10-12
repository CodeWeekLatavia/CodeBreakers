import React from 'react'
import Course from './course/Course';

const courses = [
    {
        name: "Python Jr",
        author: "Datorium",
        image: "https://files.cdn.thinkific.com/courses/course_card_image_001/012/9151604583714.original.png",
        description:"Which programming language is number one today? Python! So what are you are you waiting for? Start learning as early as you can.Create first apps with Python! ",
        price: 50
    },
    {
        name: "React Web Front-End",
        author: "Datorium",
        image: "https://tse1.mm.bing.net/th?id=OIP.BwJ84XJUWpPNpSKFGU8KDQHaEO&pid=Api",
        description:"This complete course is designed to educate and transform you into a job-ready, employable web developer.Create Websites in the most demanded web platfrom React.",
        price: 50
    },
    {
        name: "Marketing course",
        author: "Martin Summers",
        image: "https://img.lagaceta.com.ar/fotos/notas/2019/11/02/pymes-como-animarse-al-marketing-digital-823814-213209.jpg",
        description:"With over 20 hours of training, quizzes and practical steps you can follow - this is one of the most comprehensive digital marketing courses available.Learn to sell.",
        price: 30
    },
    {
        name: "Web design course",
        author: "Mitch Bigger",
        image: "https://tse1.mm.bing.net/th?id=OIP.jTwct7suDdPurgmKVIYCfAHaD6&pid=Api",
        description:"This Specialization covers how to write syntactically correct HTML5 and CSS3, and how to create interactive web experiences with JavaScript.Reliability is our tagline.",
        price: 35
    },
    {
        name: "SEO course",
        author: "Mr SEO expert",
        image: "https://tse4.mm.bing.net/th?id=OIP.TJXw8mM6zLgOMkdKiQRCNAEGDu&pid=Api",
        description:"This Specialization will teach you to optimize website content for the best possible search engine ranking. You'll learn the theory behind Google search and other search engine algorithms.",
        price: 20
    },
    {
        name: "AWS course",
        author: "AWS master",
        image: "https://tse1.mm.bing.net/th?id=OIP.S-9EjIzAEYqbP1oktJVc5wHaEw&pid=Api",
        description:"If want want to master advanced skills in architecture design, administration and software development this the course for you. Develop AWS capabilities and build you future. ",
        price: 60
    },
]

const CoursePage:React.FC = (): JSX.Element => {
    return (
        <div className="courses">
            {courses.map((data, i: number) => {
                return(
                    <Course 
                        key={i}
                        data={data}
                    />
                )
            })}
        </div>
    )
}

export default CoursePage





