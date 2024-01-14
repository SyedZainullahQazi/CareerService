import React from 'react'
import TeamCss from '../../styles/shared/Team.module.css';
import Body from '../../components/Genral/Body';

function OurTeam() {
    return (
      <Body elementBody={()=><div className={TeamCss.team}>Join Event</div>}/>
      );
}

export default OurTeam;