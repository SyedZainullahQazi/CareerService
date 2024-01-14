import React from 'react'

import JoinEventCss from '../../styles/shared/JoinEvent.module.css'
import Body from '../../components/Genral/Body';
function JoinEvent() {
    return (
        <Body elementBody={()=><div className={JoinEventCss.joinEvent}>Join Event</div>}/>
      );
}

export default JoinEvent;