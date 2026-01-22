import React, { useState } from 'react'
import { tabsData } from './Data/tabs'

export default function TabContainer() {

  let [activetab, setActivetab] = useState(0);
  let [activecontent, setActiveContent] = useState(tabsData[0]);
  let changeData = (index) => {
    setActivetab(index)
    setActiveContent(tabsData[index])
  }

  return (
    <div className='tabsOuter'>
        <h1 style={{textAlign: 'left'}}>Tabbing System </h1>
        <ul>
        
          {tabsData.map((tabsitem, index)=>{
            return(
              <li>
                <button onClick={() => changeData(index)} 
               key={index} className={activetab == index ? 'activeButton' : ''}>
                  {tabsitem.title}
                </button>
              </li>
            )
          })}
          
        </ul>

        {activecontent !== undefined ?
            <p >
              {activecontent.description}
            </p>
            :
             ''
        }
    </div>
    
  )
}
