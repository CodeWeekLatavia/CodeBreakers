import React from "react";
import './SwipeJobs.scss'

import SvipeJob from "./swipeJob/SvipeJob";

function SwipeJobs({jobs}) {
    return (
        <div className="swipeJobsCountainer">
            {jobs.map((job, i) => (
                <SvipeJob 
                    job={job}
                    key={i}
                />
            ))}
        </div>
    )
}

export default SwipeJobs;
