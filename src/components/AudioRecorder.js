import React, { useEffect, useState } from "react";
import vmsg from "vmsg";
import SelectedAudio from "./SelectedAudio";
import { BsTrash } from "react-icons/bs";
import { BsFillMicFill } from "react-icons/bs";
import { BsFillMicMuteFill } from "react-icons/bs";
import { FaCut } from "react-icons/fa";
//import WaveSurfer from 'wavesurfer.js';

const recorder = new vmsg.Recorder({
  wasmURL: "https:unpkg.com/vmsg@0.3.0/vmsg.wasm",
});

const AudioRecoder = () => {
  const [isLoading, setisLoading] = useState(false);
  const [isRecording, setisRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [trim, setTrim] = useState(true);
  const [value, setValue] = useState(0);
  const [del ,  setdel] =useState(false);
  //const [wavesurfer, setWavesurfer] = useState(null);

 

  const record = async () => {
    setisLoading(true);
    if (isRecording) {
      const blob = await recorder.stopRecording();
      setisLoading(false);
      setisRecording(false);
      setRecordings(recordings.concat(URL.createObjectURL(blob)));
      console.log(recordings);
      //setCurrentRecording(URL.createObjectURL(blob));
    } else {
      try {
        await recorder.initAudio();
        await recorder.initWorker();
        recorder.startRecording();
        setisLoading(false);
        setisRecording(true);
      } catch (e) {
        console.error(e);
        setisLoading(false);
      }
    }
  };

  
  

// useEffect(() => {
//   if (recordings.length > 0 && wavesurfer === null) {
//     const options = {
//       container: '#waveform',
//       waveColor: 'grey',
//       progressColor: 'orange',
//       cursorColor: 'white',
//       barWidth: 2,
//       barHeight: 1,
//       responsive: true,
//       height: 100,
//       normalize: true,
//       plugins: [
//         WaveSurfer.regions.create({
//           dragSelection: {
//             slop: 5,
//           },
//         }),
//       ],
//     };
//     const ws = WaveSurfer.create(options);
//     setWavesurfer(ws);
//   }
// }, [recordings, wavesurfer]);



  // const trimed = (url) => {
  //   recordings.forEach((record) => {
  //     if (record === url) {
  //       const index = recordings.indexOf(record);
  //       setValue(index);
  //       const region = wavesurfer.regions.list[Object.keys(wavesurfer.regions.list)[0]];
  //       if (region) {
  //         region.remove();
  //       }
  //       wavesurfer.load(url);
  //       wavesurfer.on('ready', () => {
  //         wavesurfer.clearRegions();
  //         wavesurfer.addRegion({
  //           start: 0,
  //           end: wavesurfer.getDuration(),
  //           loop: false,
  //           color: 'hsla(400, 100%, 30%, 0.4)',
  //         });
  //         wavesurfer.regions.list[Object.keys(wavesurfer.regions.list)[0]].play();
  //       });
  //     }
  //   });
  // };

  const trimed = (url) => {
    recordings.forEach((record) => {
      if (record === url) {
        const index = recordings.indexOf(record);
        setValue(index);
      }
    });
  };
  
  useEffect(() => {
     
     setRecordings(recordings);
     
  },[del]);

  const deleteTheAudio = (url) => {
    recordings.forEach((record) => {
      if (record === url) {
        const delindex = recordings.indexOf(record);
        recordings.splice(delindex, 1);
        setRecordings(recordings);
        {del?setdel(false):setdel(true);}
        console.log("delete recording");
      }
    });
  };

 
  return (
    <div className="container">
       
      <div className="recording__section">
        <h3>Click Mic To Start Recording</h3>
        <button onClick={record} disabled={isLoading} className="audiobtn">
          {" "}
          {isRecording
            ? ("Stop ", (<BsFillMicFill />))
            : ("Record", (<BsFillMicMuteFill />))}
            {isRecording
            ? ("  Stop ")
            : ("  Record")}
        </button>
        <div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {recordings.map((url) => (
              <div className="listed"> 
                <li key={url}>
                  <audio src={url} controls trim />
                  <FaCut
                    className="faCut"
                    onClick={() => {
                      trimed(url.toString());
                    }}
                  />

                  <BsTrash
                    className="trash"
                    style={{ color: "red" }}
                    onClick={() => deleteTheAudio(url.toString())}
                  />
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div className="edit__block">
        <h1>Trimming & Editing</h1>
        <h3>Selected Audio To Trim</h3>
        {trim ? (
          <audio src={recordings[value]} controls />
        ) : (
          <h1>Selected to trim</h1>
        )}
      </div>
    </div>
  );
};
export default AudioRecoder;






 