import React,{useContext} from 'react';
import HarvestContext from '../../Context/HarvestContext';

import {motion} from "framer-motion";

const TokenMessage = () => {

    const {tokenAddedMessage} = useContext(HarvestContext)
    return (
        <>
        {tokenAddedMessage ? 
            <motion.div
            key={tokenAddedMessage}
            initial={{ x:0,y: -100, opacity: 0 }}
            animate={{ x:0,y:0, opacity: 1 }}
            exit={{x:0,y: -100, opacity: 1 }}>
              <div className='token-added-message'>
                <p >{tokenAddedMessage}</p>
              </div>
            </motion.div>
            : null}
        </>
        
    );
}

export default TokenMessage;
