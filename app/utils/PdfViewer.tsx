"use client";
import { useEffect, useRef, useState } from 'react';
import { usePDFJS } from './usePDFJS';



const PdfViewer = ({ url }: { url: string }) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [innerWidth, setInnerWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 400);

  useEffect(()=>{
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  },[])
 
  usePDFJS( async(pdfjsLib)=>{
    if (typeof window === 'undefined') return;
    try {
      var scaling = 1.4;
      if(innerWidth <= 600)
      {
      scaling = 0.8;
      }
      else if(innerWidth <= 800)
      {
        scaling = 1;
      }
      else if(innerWidth <= 1100){
        scaling=1.25;
      }
      else{
        scaling = 1.8;
      }
      //@ts-ignore
      const doc = await pdfjsLib.getDocument(url).promise;
      //@ts-ignore
      const pnums = doc.numPages;

      // Clear the container before appending new canvases
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      for (let i = 0; i < pnums; i++) {
        //@ts-ignore
        const page = await doc.getPage(i + 1);
        const scale:number = scaling;
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const ctx = canvas.getContext('2d');
        //@ts-ignore
        await page.render({ canvasContext: ctx as CanvasRenderingContext2D, viewport }).promise;
        
        //@ts-ignore
        containerRef.current?.appendChild(canvas);
      }
    } catch (e) {
      console.error(e);
    }
  },[url,innerWidth])
 
  return (
    <div className="h-full w-full overflow-auto">
      {/* Container to hold the canvases */}
     
      <div ref={containerRef} className='pdf-container' ></div>
    </div>
  );
};

export default PdfViewer;
