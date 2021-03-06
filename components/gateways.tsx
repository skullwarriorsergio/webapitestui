/* eslint-disable react/jsx-key */
import React, { useEffect, useState }  from "react"
import styles from '../styles/Home.module.css'
import { Accordion, Button, Card } from 'react-bootstrap';
import Devices from './devices'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'
import deletePic from '../public/delete.png'


const Gateways = (props:any) => { 
 const [objects, setObjects] = useState<any[]>([])

  
 useEffect(() => {
   fetch(`https://${process.env.NEXT_PUBLIC_apiIP}:${process.env.NEXT_PUBLIC_apiPort}/api/Gateways`,
   {
     method: 'Get',headers: 
     {
      'Content-Type': 'application/json'
     }
   }).then(r => r.json())
   .then(result => 
    {
      setObjects(result);
    }).catch(err => {})
 },[props.update]);

function DeleteGateway(serial:string)
{
  fetch(`https://${process.env.NEXT_PUBLIC_apiIP}:${process.env.NEXT_PUBLIC_apiPort}/api/Gateways/${serial}`,
   {
     method: 'DELETE',headers: 
     {
      'Content-Type': 'application/json'
     }
   }).then(r =>
    {
      console.log(r);
      if (r.ok)
      {
        props.selectGateway('<<Select a gateway>>');
        r.json().then(v => 
        {
          const a = objects.filter((item) => item.serialNumber != v);         
          setObjects(a);          
        });
      }
    }).catch(err => {})
}

return (
    <Accordion>      
      {objects.map((item, index) =>
      <Card>
         <Accordion.Toggle as={Card.Header} variant="link" eventKey={index.toString()}>
           <div className={styles.cardHeader} onClick={(e) => 
                  {
                    props.selectGateway(item.serialNumber);
                  }}>
             <p className={styles.cardHeaderText}>SN:{item.serialNumber} / Name:&quot;{item.name}&quot; / IP:{item.ip}</p>
             <div className={styles.elementholder}
                onClick={(e) => 
                  {
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                    DeleteGateway(item.serialNumber);
                  }}
             >
              <Image src={deletePic} alt="" width={20} height={20}/>
             </div>
           </div>
          </Accordion.Toggle>
        <Accordion.Collapse eventKey={index.toString()}>
          <Card.Body>
            <Devices serial={item.serialNumber}/>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      )}
    </Accordion>    
  ) 
}

export default Gateways