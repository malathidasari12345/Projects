import React, { useState, useEffect } from 'react';
import SplitPane, { Pane } from 'split-pane-react';
import 'split-pane-react/esm/themes/default.css';
import { FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { logo } from '../assets/img';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserProfile from '../components2/UserProfile';
import { doc, setDoc } from 'firebase/firestore';
import Alert from '../components2/alert';
import { db } from '../config/firebase';
import { MdCheck, MdEdit } from 'react-icons/md';

const NewProject = () => {
  const [verticalSizes, setVerticalSizes] = useState([350, '40%', 'auto']);
  const [horizontalSizes, setHorizontalSizes] = useState([300, 'auto']);
  const [bottomPaneSizes, setBottomPaneSizes] = useState(['80%', '50%']);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const user = useSelector(state => state.user?.user);
  const [alert, setAlert] = useState(false);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  const [output, setOutput] = useState("");
  const [consoleOutput, setConsoleOutput] = useState("");
  const [ title, settitle ] = useState("Untitled")
  const [ istitle , setistitle] = useState("")

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);
  // for responsiveness
  useEffect(() => {
    if (isMobile) {
      setVerticalSizes([120, '30%', 'auto']);
      setHorizontalSizes([400, 'auto']);
    } else {
      setVerticalSizes([350, '40%', 'auto']);
      setHorizontalSizes([300, 'auto']);
    }
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const layoutCSS = {
    height: '100%', 
    display: 'flex',
    alignItems: 'start',
    justifyContent: 'start',
  };
  const updateOutput = () => {
    try {
      // console.log('JS Code:', js);
  
      const scriptWithConsoleCapture = `
        (function() {
          const originalConsoleLog = console.log;
          let consoleOutput = [];
          console.log = function(message) {
            consoleOutput.push(message);
            originalConsoleLog.apply(console, arguments);
          };
          try {
            ${js}
          } catch (err) {
            console.error(err);
          }
          return consoleOutput;
        })()
      `;
  
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      const iframeWindow = iframe.contentWindow;
      let consoleResult;
  
      try {
        consoleResult = iframeWindow.eval(scriptWithConsoleCapture);
      } catch (evalError) {
        console.error('Error evaluating script:', evalError);
        consoleResult = ['Error evaluating script:', evalError.message];
      }
  
      setConsoleOutput(consoleResult.join('\n'));
      document.body.removeChild(iframe);
  
      const combinedOutput = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;
      setOutput(combinedOutput);
    } catch (e) {
      console.error('Error in updateOutput:', e);
    }
  };
  const saveProgram = async () => {
    const id = `${Date.now()}`;
    const _doc = {
      id: id,
      title: title,
      html: html,
      css: css,
      js: js,
      output: output,
      user: user,
    };
    await setDoc(doc(db, "projects", id), _doc)
      .then(() => {
        setAlert(true);
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <div className='w-screen h-screen flex flex-col items-start justify-start overflow-hidden' style={{ backgroundColor: 'text-primary' }}>
      {/* Header */}
      <header className='w-full flex items-center justify-between px-12 py-1 gap-6'>
             <div className='flex items-center'>
                <Link to='/home'>
                   <img src={logo} alt="Logo" className='object-contain h-auto w-20'/>
                 </Link>
                 {/* title */}
                 <div className='flex items-center justify-center gap-2 '>
                          { istitle
                          ?
                          (
                       <input 
                         className='px-2 py-1 rounded-md bg-transparent text-primaryText text-base outline-none border-none '
                         key={"TitleInput"}
                         type ="text" 
                         placeholder='Project Title'
                         value ={title} 
                         onChange={(e)=>{
                         settitle(e.target.value)
                          }}
                           />
                        )
                          :
                          (
                           <p key={"label"}
                           className='px-2 py-1 text-white text-lg'
                           >
                           {title}
                           </p>
                            )
                          }
                      
     {/* for checkbox */}
                          {istitle
                          ?
                         <>
                         <div key = {"MdCheck"} whileTap={{scale:0.9}}
                         className='cursor-pointer' onClick={()=>setistitle(false)}>
                              <MdCheck className='text-2xl text-emerald-500'/>
                         </div>
                         </>
                          :
                         <>
                         <div key = {"MdEdit"} whileTap={{scale:0.9}} 
                         className='cursor-pointer' onClick={()=>setistitle(true)}>
                             <MdEdit className='text-2xl text-primaryText' />
                         </div>
                         </>
                          }
                 </div>
             </div>
               {/* alert */}
    
        { alert&& <Alert status = {'success'} 
        alertMsg ={"Project Saved"}/>
        }
          {/* save button */}
          {
            user && (
              <div className='flex items-center justify-center gap-4'>
             <button 
             onClick={saveProgram}
             className="px-6 py-1 bg-primaryText cursor-pointer text-base text-primary font-semibold rounded-md">
                 SAVE
             </button>
              <UserProfile/>
          </div>
            )
          }
      </header>

      {/* Horizontal Split */}
      <SplitPane
        split='horizontal'
        sizes={horizontalSizes}
        onChange={setHorizontalSizes}
      >
        {/* Left Pane */}
        <Pane minSize={150} maxSize='70%' >
          {/* Vertical Split within Left Pane */}
          <SplitPane
            split='vertical'
            sizes={verticalSizes}
            onChange={setVerticalSizes}
          >
            <Pane minSize={150} maxSize='50%'>
              <div style={{ ...layoutCSS, height: '100%' }}>
                {/* HTML */}
                <div className='w-full h-full flex flex-col items-start justify-start'>
                  <div className='w-full flex items-center justify-between'>
                    <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                      <FaHtml5 className='text-xl text-red-500' />
                      <p className='text-primaryText font-semibold'>HTML</p>
                    </div>
                  </div>
                  <div className='w-full h-full overflow-hidden px-2'>
                    <CodeMirror
                      value={html}
                      height="100%"
                      extensions={[javascript({ jsx: true })]}
                      theme="dark"
                      onChange={(value) => setHtml(value)}
                    />
                  </div>
                </div>
              </div>
            </Pane>
            {/* CSS */}
            <Pane minSize={150} maxSize='50%'>
              <div style={{ ...layoutCSS, background: 'text-primary', height: '100%' }}>
                <div className='w-full h-full flex flex-col items-start justify-start'>
                  <div className='w-full flex items-center justify-between'>
                    <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                      <FaCss3Alt className='text-xl text-sky-500' />
                      <p className='text-primaryText font-semibold'>CSS</p>
                    </div>
                  </div>
                  <div className='w-full h-full overflow-hidden px-2'>
                    <CodeMirror
                      value={css}
                      height="100%"
                      extensions={[javascript({ jsx: true })]}
                      theme="dark"
                      onChange={(value) => setCss(value)}
                    />
                  </div>
                </div>
              </div>
            </Pane>
            {/* JavaScript */}
            <Pane minSize={150} maxSize='50%'>
              <div style={{ ...layoutCSS, background: 'text-primary', height: '100%' }}>
                <div className='w-full h-full flex flex-col items-start justify-start'>
                  <div className='w-full flex items-center justify-between'>
                    <div className='bg-secondary px-4 py-2 border-t-4 flex items-center justify-center gap-3 border-t-gray-500'>
                      <FaJs className='text-xl text-yellow-500' />
                      <p className='text-primaryText font-semibold'>JavaScript</p>
                    </div>
                  </div>
                  <div className='w-full h-full overflow-hidden px-2'>
                    <CodeMirror
                      value={js}
                      height="100%"
                      extensions={[javascript({ jsx: true })]}
                      theme="dark"
                      onChange={(value) => setJs(value)}
                    />
                  </div>
                </div>
              </div>
            </Pane>
          </SplitPane>
        </Pane>
        {/* Bottom Pane for Output and Console */}
        <Pane minSize={200} maxSize='60%' className='bg-dark'>
          {/* Split within Bottom Pane */}
          <SplitPane
            split='vertical'
            sizes={bottomPaneSizes}
            onChange={setBottomPaneSizes}
          >
            {/* Output Pane */}
            <Pane minSize={150}>
              <div style={{ ...layoutCSS, height: '100%' }}>
                <iframe
                  srcDoc={output}
                  title="output"
                  sandbox="allow-scripts"
                  frameBorder="0"
                  width="100%"
                  height="100%"
                  className='bg-white'
                />
              </div>
            </Pane>
            {/* Console Pane */}
            <Pane minSize={150}>
              <div style={{ ...layoutCSS, height: '100%', overflowY: 'auto', padding: '10px' }}>
                <pre className='text-white'>{consoleOutput}</pre>
              </div>
            </Pane>
          </SplitPane>
        </Pane>
      </SplitPane>
    </div>
  );
};

export default NewProject;
