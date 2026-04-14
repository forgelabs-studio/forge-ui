'use client'
import type { SkeletonProps } from '@/lib/types'
export default function SkeletonRenderer({ props: p }: { props: SkeletonProps }) {
  const shine = `linear-gradient(90deg,rgba(255,255,255,.04) 25%,rgba(255,255,255,.09) 50%,rgba(255,255,255,.04) 75%)`
  const sk = (w:string|number,h:number,r=p.radius??8) => ({
    width:w, height:h, borderRadius:r,
    background: p.animated ? shine : 'rgba(255,255,255,.06)',
    backgroundSize: p.animated ? '400px 100%' : undefined,
    animation: p.animated ? 'skeleton-shine 1.5s linear infinite' : undefined,
  } as React.CSSProperties)

  if(p.variant==='card') return (
    <div style={{width:280,background:'#111113',border:'1px solid rgba(255,255,255,.07)',borderRadius:p.radius,padding:20,display:'flex',flexDirection:'column',gap:11}}>
      <div style={{display:'flex',alignItems:'center',gap:12}}><div style={sk(40,40)}/><div style={sk(120,14)}/></div>
      <div style={sk('100%',12)}/><div style={sk('85%',12)}/><div style={sk('70%',12)}/>
      <div style={{display:'flex',gap:8,marginTop:3}}><div style={sk(60,22)}/><div style={sk(80,22)}/></div>
    </div>
  )
  if(p.variant==='text') return (
    <div style={{width:280,display:'flex',flexDirection:'column',gap:10}}>
      {Array.from({length:p.lines??3}).map((_,i)=><div key={i} style={sk(i===p.lines-1?'65%':'100%',13)}/>)}
    </div>
  )
  if(p.variant==='profile') return (
    <div style={{display:'flex',alignItems:'center',gap:14,width:280}}>
      <div style={sk(56,56)}/>
      <div style={{flex:1,display:'flex',flexDirection:'column',gap:8}}><div style={sk(140,14)}/><div style={sk(100,11)}/></div>
    </div>
  )
  // table
  return (
    <div style={{width:300,display:'flex',flexDirection:'column',gap:2}}>
      <div style={sk('100%',36)}/>
      {[0,1,2].map(i=><div key={i} style={{display:'flex',gap:12,padding:'8px 0'}}><div style={sk(80,12)}/><div style={sk(120,12)}/><div style={sk(60,12)}/></div>)}
    </div>
  )
}
