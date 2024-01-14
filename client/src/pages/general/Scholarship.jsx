import React from 'react'

import Body from '../../components/Genral/Body';

import ScholarshipCss from '../../styles/shared/Scholarship.module.css'
function Scholarship() {
    return (
      <Body elementBody={()=><div className={ScholarshipCss.scholarship}>
      Event</div>}/>
      );
      

}

export default Scholarship;