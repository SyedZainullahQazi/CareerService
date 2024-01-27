import { useRef,useMemo } from "react"

import Cookies from "js-cookie";
import ReactQuill from "react-quill"

import 'react-quill/dist/quill.snow.css'
import SendBlogPostImage_API from "../../apis/admin/manage-blog/UploadBlogImage";

const Editor = ({ value, setValue,FormikValName,readOnly,updateHandler,Loading,toolbar = true }) => {

    const editorRef = useRef(null)


    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);
    
          fileReader.onload = () => {
            resolve(fileReader.result);
          };
    
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
    };
    const imageHandler=async ()=>{
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async function() {
          const file = input.files[0];
          console.log('User trying to uplaod this:', file);
          const loadingValue=Loading;
          updateHandler(!loadingValue);
          const base64 = await convertBase64(file);
          const id = await SendBlogPostImage_API(Cookies.get("jwtToken"),base64); // I'm using react, so whatever upload function
          updateHandler(loadingValue);
          const quill = editorRef.current.getEditor();
          console.log(quill);
          const range = quill.getSelection();
          console.log(range);
          // this part the image is inserted
          // by 'image' option below, you just have to put src(link) of img here. 
          console.log(range.index);
          quill.insertEmbed(range.index, 'image', id); 
        }//.bind(this); // react thing
    }

    const modules =useMemo(()=>({
        toolbar: {
            container:[
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, 
            {'align': []},],
            [{ 'font': [] }, ],
            [{ 'script': 'sub' },{'script':'super' }],
            [{ 'color': [] }, { 'background': [] }],
            ['link', 'image'],
            ['clean']
        ],
        handlers: {
            image:imageHandler
        },
        },}),[]);
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'align','font','script',
        'color', 'background',
        'link', 'image',
        'clean'
    ]

    const handleChange = () => {
        if (editorRef.current) {
            const editor = editorRef.current.getEditor()
            const html = editor.root.innerHTML
            setValue(FormikValName,html);
        }
    };


    return (
        <ReactQuill
            ref={editorRef}
            theme="snow"
            value={value}
            onChange={handleChange}
            modules={toolbar ? modules : {toolbar:false}}
            formats={formats}
            className="w-full flex flex-col items-center h-fit bg-slate-500/30"
            placeholder="Write something awesome..."
            readOnly={readOnly}
        />

    )
}

export default Editor;