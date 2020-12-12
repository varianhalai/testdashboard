import React,{useContext} from 'react';
import HarvestContext from '../../Context/HarvestContext';

import {motion} from "framer-motion";

const HarvestMessage = () => {

    const {harvestingMessage} = useContext(HarvestContext)
    return (
        <>
        {harvestingMessage ? 
            <motion.div
            key={harvestingMessage}
            initial={{ x:0,y: -100, opacity: 0 }}
            animate={{ x:0,y:0, opacity: 1 }}
            exit={{x:0,y: -100, opacity: 1 }}>
              <div className='token-added-message'>
                <p >{harvestingMessage}</p>
              </div>
            </motion.div>
            : null}
        </>
        
    );
}

export default HarvestMessage;
