import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

// import VideoPlayer from "./videoPlayer";

const DropZone = ({
  acceptedTypes,
  onFileSelected,
  style = { width: "120px", height: "120px" },
  file
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length == 0) return;
    if (onFileSelected != null) onFileSelected(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: acceptedTypes,
    onDrop,
  });

  const files = acceptedFiles.map((f, i) => (
    <div
      className="flex flex-col justify-center items-center w-full h-full"
      key={i}
    >
      {acceptedTypes.includes("/") &&
        acceptedTypes.split("/").includes("video") && (
          <video
            controls
            id="dropVideo"
            className="rounded "
            src={URL.createObjectURL(f)}
          ></video>
        )}
      {acceptedTypes.includes("/") &&
        acceptedTypes.split("/").includes("image") && (
          <img className="rounded img-fluid w-full h-full" alt="description of image"  src={file || URL.createObjectURL(f)}
          
          ></img>
        )}
      {!acceptedTypes.includes("/") && (
        <div
          className="flex flex-col justify-center items-center"
          key={i}
        >
          <i className="mdi mdi-36px mdi-file" />
          <p className="text-center fw-bold">{f.name}</p>
        </div>
      )}
    </div>
  ));


  return (
    <section className="w-32 h-32 rounded-full p-0 flex justify-center   overflow-hidden">
      <div className="w-64 p-0">
        <div
          {...getRootProps({
            className:
              "dropzone flex flex-wrap justify-center items-center",
          })}
        >
          <input {...getInputProps()} />
          {files.length == 0 ? (
            <div
              className="flex justify-center items-center "
              style={style}
            >
              <div className="text-center text-dark cross cross-alt" />
            </div>
          ) : (
            <div
              className="flex-wrap flex justify-center items-center "
              style={style}
            >
              {files}
            </div>
          )}
        </div>
        {files.length > 0 && (
          <p
            className="mt-3 text-center text-muted fst-italic"
            style={{ fontSize: "0.8rem" }}
          >
            Para reemplazar, arrastra el archivo que quieres.
          </p>
        )}
      </div>
    </section>
  );
};

export default DropZone;
