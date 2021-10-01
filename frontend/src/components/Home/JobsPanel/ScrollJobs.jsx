import React from "react";
import './ScrollJobs.scss';
import ScrollJob from "./scrolljob/ScrollJob";

function ScrollJobs({jobs}) {
    return (
        <>
            {jobs && jobs.map((jobOffer, i) => {
        
                return (
                    <ScrollJob 
                        jobOffer={jobOffer}
                        key={i}
                    />
                )
            })}
        </>
    )
}

export default ScrollJobs;