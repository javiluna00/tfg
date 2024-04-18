import { Icon } from '@iconify/react'
import React from 'react'

function Title ({ title, icon, className, iconPosition = 'left', iconClassName }) {
  return (
    <div className='flex items-center gap-2'>
      {icon && iconPosition === 'left' && <Icon icon={icon} className={`w-6 h-6 ${iconClassName}`} />}
      <h4 className={`text-lg font-bold ${className}`}>{title}</h4>
      {icon && iconPosition === 'right' && <Icon icon={icon} className={`w-6 h-6 ${iconClassName}`} />}
    </div>
  )
}

export default Title
