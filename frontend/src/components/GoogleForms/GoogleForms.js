import React from 'react';
import {Link} from 'react-router-dom';



export default class GoogleForms extends React.Component {


    render() {
        return(
            <div>
                <Link style={{color: '#4d4d4d'}} to={'./'}> Return To Dashboard</Link>
                <br></br>
                <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc7E3a15ZMfQDYWuBldvJccG3r-zgAn8LPQjjZT8q0xK1X4_Q/viewform?embedded=true" width="640" height="971" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            </div>
        )
    }
}