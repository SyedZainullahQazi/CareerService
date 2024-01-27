import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup'

import { Backdrop } from '@mui/material';
import { CircularProgress } from '@mui/material';
import EvStyle from "../../styles/Forms/Event.module.css";
import Cookies from 'js-cookie';
import convertBase64 from '../../utils/convertBase64';
import GETUSER_API from '../../apis/generals/GetUser_API';
import UpdateProfile_API from '../../apis/admin/profile/updateProfile_API';

let initialVal = {
    batch: '',
}
let validationScheme = {
    profilepicture: Yup.string().required('Cover Image is required'),
    batch: Yup.date()
        .required('Scheduled Date is required')
        .test('is-future-date', 'Scheduled Date cannot be in the past', function (value) {
            const currentDate = new Date();
            return value && value <= currentDate;
        }),
}

function ProfileCard(props) {
    const [userData,setUserData]=useState(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(()=>{
        //CALL API With user data
        const GetUserData=async ()=>{
        const UserData= await GETUSER_API(Cookies.get("jwtToken"));
        setUserData(UserData);
        formik.setFieldValue("batch", UserData.batch);
        console.log(UserData);
        }
        GetUserData();
    },[]);
 

    const formik = useFormik({
        initialValues:initialVal,
        validationSchema: Yup.object(validationScheme),
        onSubmit: async (values) => {
            await onSubmitEvent(values);
        }
    });

    let onSubmitEvent = async (values) => {
        try {
            setLoading(true);
            const response = await UpdateProfile_API(Cookies.get("jwtToken"), values);
            setLoading(false);
        } catch (error) {
            console.error('Error posting blog post:', error);
        }
    }
    const handleCoverImage = async (event) => {
        const base64 = await convertBase64(event.currentTarget.files[0]);
        formik.setFieldValue("profilepicture", base64);
    }

    return (
        <div className={`${EvStyle.EventMain} d-flex flex align-items-center flex-column `}>
            <form onSubmit={formik.handleSubmit}>
                <div className="d-flex flex-row">
                    {/* The Post Title  */}
                    <div className={`${EvStyle.EventTitle}`}>
                        <input
                            type="text"
                            id="profileName"
                            name="profileName"
                            value={userData?userData.name:"Loading..."}
                            readOnly
                            className={`form-control ${EvStyle.EventInputTextBox}`}W
                        />
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
                        id="profilepicture"
                        name="profilepicture"
                        onChange={handleCoverImage}
                        onBlur={formik.handleBlur}
                        accept=".png, .jpg, .jpeg .webp"
                        placeholder='Upload Cover Image'
                    />
                    {formik.touched.profilepicture && formik.errors.profilepicture ? (
                        <p>{formik.errors.profilepicture}</p>
                    ) : (
                        <br />
                    )}
                </div>
                {/* Selecting the Type of The Post */}
                <div className={`${EvStyle.EventInputDiv}`} >
                    <select
                        id="batch"
                        name="batch"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.batch}
                        className={`form-control ${EvStyle.EventInputTextBox}`}
                    >
                        <option value="" label={userData?`If ${userData.batch} is'nt your batch Select...`:
                        'Select Your Batch'} />
                        <option value="2023" label="2023" />
                        <option value="2022" label="2022" />
                        <option value="2021" label="2021" />
                        <option value="2020" label="2020" />
                        <option value="2019" label="2019" />
                        <option value="2018" label="2018" />
                        <option value="2017" label="2017" />
                        <option value="2016" label="2016" />
                    </select>
                    {formik.touched.batch && formik.errors.batch ? (
                        <div className="text-danger">{formik.errors.batch}</div>
                    ) : <br />}
                </div>

                {/* TIME OF SCHEDULE DATE/TIME*/}
                <div className="d-flex flex-row">
                    <div className={`${EvStyle.EventDateTimeBoxLeft}`}>
                        {/* DATE */}
                        <label htmlFor="profileEmail">Email</label>
                        <input
                            type="text"
                            id="profileEmail"
                            name="profileEmail"
                            value={userData ?userData.email_id:'Loading....'}
                            className={`form-control ${EvStyle.EventInputTextBox}`}
                            readOnly
                        />
                    </div>
                    {/* TIME */}
                    <div className={`${EvStyle.EventDateTimeBoxRight}`}>
                        <label htmlFor="profileUserType">User Type</label>
                        <input
                            type="text"
                            id="profileUserType"
                            name="profileUserType"
                            className={`form-control ${EvStyle.EventInputTextBox}`}
                            value={userData?userData.usertype:'Loading...'}
                            readOnly
                        />
                    </div>
                </div>
                
                <div className="d-flex flex-row justify-content-center">
                    <button type="submit" className={`btn btn-dark ${EvStyle.EventInputTextBox} ${EvStyle.EventDateTimeBoxRight}`}>Submit</button>
                </div>
            </form>
            {
                loading ?
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    :
                    <div></div>
            }

        </div>
    )

}

export default ProfileCard;