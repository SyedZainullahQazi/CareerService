import React from 'react';

import axios from 'axios';
import Editor from '../Genral/Editor';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';


import EvStyle from "../../styles/Forms/Event.module.css";
import convertBase64 from '../../utils/convertBase64';
import CreateEvent_API from '../../apis/admin/manage-blog/event/event_api';
import Cookies from 'js-cookie';
let initialVal = {
    postTitle: '',
    postDescription: '',
    postType: '', // Added postType field
    scheduleType: '',
    scheduledDate: null, // Added scheduledDate field
    scheduledTime: null,
    postDate: new Date(),
    coverImage: '',
}
let validationScheme = {
    postTitle: Yup.string().required('Title is required'),
    postDescription: Yup.string().required('Description is required'),
    postType: Yup.string().required('Post type is required'), // Validation for postType
    scheduleType: Yup.string().required('Post type is required'),
    coverImage: Yup.string().required('Cover Image is required'),
    scheduledDate: Yup.date()
        .required('Scheduled Date is required')
        .test('is-future-date', 'Scheduled Date cannot be in the past', function (value) {
            const currentDate = new Date();
            return value && value >= currentDate;
        }),

    scheduledTime: Yup.string().required('Scheduled Time is required'),
}

function Event() {

    const formik = useFormik({
        initialValues: initialVal,
        validationSchema: Yup.object(validationScheme),
        onSubmit: async (values) => {
            await onSubmitEvent(values);
        }
    });

    const navigate = useNavigate();

    let onSubmitEvent = async (values) => {
        formik.values.postDate = new Date();
        const eventDateTime = new Date(`${values.scheduledDate} ${values.scheduledTime}`);
        // Checking Event Date
        if (eventDateTime) {
            const errors = {}; if (formik.values.postDate > eventDateTime) {
                errors.scheduledDate = "Scheduled Date cannot Be Less Than Current Date";
            }
            if (Object.keys(errors).length > 0) { formik.setErrors(errors); return; }
        }
        // Checking Post Description
        if (!formik.values.postDescription || formik.values.postDescription === "<p><br></p>") {
            const errors = {};
            errors.postDescription = "post Desciption Cannot be Empty";
            if (Object.keys(errors).length > 0) { formik.setErrors(errors); return; }
        }
        console.log(values);
        try {
           const response= await CreateEvent_API(Cookies.get("jwtToken"),values);
            console.log("Yayyyy Published");
            setTimeout(()=>{
                navigate("/dashboard");
            },5000);

        } catch (error) {
            console.error('Error posting blog post:', error);
        }
    }
    const handleCoverImage=async (event)=>{
        const base64 = await convertBase64(event.currentTarget.files[0]);
        formik.setFieldValue("coverImage", base64);
    }

    return (
        <div className={`${EvStyle.EventMain} d-flex flex align-items-center flex-column `}>
            <form onSubmit={formik.handleSubmit}>
                <div className="d-flex flex-row">
                    {/* The Post Title  */}
                    <div className={`${EvStyle.EventTitle}`}>
                        <input
                            type="text"
                            id="postTitle"
                            name="postTitle"
                            onChange={formik.handleChange}
                            value={formik.values.postTitle}
                            onBlur={formik.handleBlur}
                            className={`form-control ${EvStyle.EventInputTextBox}`}
                            placeholder='POST TITLE'
                        />
                        {formik.touched.postTitle && formik.errors.postTitle ? (
                            <div className="text-danger">{formik.errors.postTitle}</div>
                        ) : <div className="my-4"></div>}
                    </div>
                    {/* Button Upload */}
                    {/* <div className="" >
                        <button name="uploadImageImgbb" className={`btn btn-success  ${EvStyle.EventInputTextBox}`}><i class="bi bi-cloud-upload-fill"></i>  IMAGE</button>
                    </div> */}
                </div>
                <div>
                        <input
                            className={` ${EvStyle.EventImageInput} form-control `}
                            type="file"
                            id="coverImage"
                            name="coverImage"
                            onChange={handleCoverImage}
                            onBlur={formik.handleBlur}
                            accept=".png, .jpg, .jpeg .webp"
                            placeholder='Upload Cover Image'
                            required
                        />
                        {formik.touched.coverImage && formik.errors.coverImage ? (
                            <p>{formik.errors.coverImage}</p>
                        ) : (
                            <div className="my-4"></div>
                        )}
                    </div>
                {/* Selecting the Type of The Post */}
                <div className={`${EvStyle.EventInputDiv}`} >
                    <select
                        id="postType"
                        name="postType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.postType}
                        className={`form-control ${EvStyle.EventInputTextBox}`}
                    >
                        <option value="" label="Select a type of Event" />
                        <option value="scholarship" label="Scholarship" />
                        <option value="session" label="Session" />
                    </select>
                    {formik.touched.postType && formik.errors.postType ? (
                        <div className="text-danger">{formik.errors.postType}</div>
                    ) : <div className="my-4"></div>}
                </div>

                {/* TIME OF SCHEDULE DATE/TIME*/}
                <div className="d-flex flex-row">
                    <div className={`${EvStyle.EventDateTimeBoxLeft}`}>
                        {/* DATE */}
                        <label htmlFor="scheduledDate">Scheduled Date:</label>
                        <input
                            type="date"
                            id="scheduledDate"
                            name="scheduledDate"
                            value={formik.values.scheduledDate}
                            onChange={formik.handleChange}
                            className={`form-control ${EvStyle.EventInputTextBox}`}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.scheduledDate && formik.errors.scheduledDate ? (
                            <div className="text-danger">{formik.errors.scheduledDate}</div>
                        ) : (
                            <br />
                        )}
                    </div>
                    {/* TIME */}
                    <div className={`${EvStyle.EventDateTimeBoxRight}`}>
                        <label htmlFor="scheduledTime">Scheduled Time:</label>
                        <input
                            type="time"
                            id="scheduledTime"
                            name="scheduledTime"
                            className={`form-control ${EvStyle.EventInputTextBox}`}
                            value={formik.values.scheduledTime}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.scheduledTime && formik.errors.scheduledTime ? (
                            <div className="text-danger">{formik.errors.scheduledTime}</div>
                        ) : (
                            <br />
                        )}
                    </div>
                </div>
                {/* Selecting the Type of The Schedule */}
                <div className={`${EvStyle.EventInputDiv}`} >
                    <select
                        id="scheduleType"
                        name="scheduleType"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.schduleType}
                        className={`form-control ${EvStyle.EventInputTextBox}`}
                    >
                        <option value="" label="Select a type of Schedule" />
                        <option value="tentative" label="Tentative" />
                        <option value="fixed" label="Fixed" />
                    </select>
                    {formik.touched.scheduleType && formik.errors.scheduleType ? (
                        <div className="error">{formik.errors.scheduleType}</div>
                    ) : <div className="my-4"></div>}
                </div>
                {/* POST REACT QUILL */}
                <div className={`${EvStyle.EventPost}`} style={{ color: "black", backgroundColor: "white", width: "50vw", height: "auto" }}>
                    <Editor value={formik.values.postDescription} setValue={formik.setFieldValue} FormikValName={"postDescription"} readOnly={false} />
                    {formik.touched.postDescription && formik.errors.postDescription ? (
                        <div className="text-danger" >{formik.errors.postDescription}</div>
                    ) : <div className=""></div>}
                </div>
                <div className="d-flex flex-row justify-content-center">
                    <button type="submit" className={`btn btn-dark ${EvStyle.EventInputTextBox} ${EvStyle.EventDateTimeBoxRight}`}>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Event