import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'StayDue — Your semester, organized',description:'Review your syllabus, organize your coursework, and see what needs your attention next.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
