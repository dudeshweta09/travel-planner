import React from 'react'
import { TargetIcon } from "@radix-ui/react-icons";

const TrpmateDisplay = ({name, ondelete}:any) => {
  return (
    <div>
      <p className='flex gap-6'>{name}</p>
    </div>
  )
}

export default TrpmateDisplay
