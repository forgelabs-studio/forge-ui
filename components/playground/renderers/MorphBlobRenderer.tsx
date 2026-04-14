'use client'
import { hexRgb } from './_utils'
import type { MorphBlobProps } from '@/lib/types'
export default function MorphBlobRenderer({ props: p }: { props: MorphBlobProps }) {
  const col = p.color||'#7F77DD'; const rgb = hexRgb(col)
  const dur = ({slow:'6s',normal:'4s',fast:'2s'} as Record<string,string>)[p.speed]??'4s'
  const bg = p.gradient?`linear-gradient(135deg,${col},${p.color2||'#D4537E'})`:`rgba(${rgb},.6)`
  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',width:200,height:200}}>
      <div style={{width:p.size||120,height:p.size||120,background:bg,animation:`morph ${dur} ease-in-out infinite`,opacity:p.opacity??0.8,filter:p.blur?`blur(${p.blur}px)`:undefined}}/>
    </div>
  )
}
