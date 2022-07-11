import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {UPDATE_READER_SAGA} from '../../../redux/constant/libraryManager/readerConstants'
import {GET_ALL_GENDER_SAGA} from "../../../redux/constant/libraryManager/genderConstants";
import * as Yup from 'yup';
import { withFormik } from "formik";
import { connect  } from "react-redux";


const FormEditReader =(props)=> {
  let nowDate = new Date()


  const dispatch = useDispatch();
     

      //componentdidmount
      useEffect(() => {

        //Load sự kiện submit lên drawer nút submit
        dispatch({ type: 'SET_SUBMIT', submitFunction: handleSubmit });
        dispatch({ type: GET_ALL_GENDER_SAGA })
    }, [])
    const {
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      setFieldValue
  } = props;

  const listGender=useSelector(state => state.genderReducers.genderList);
  const imgPreview = useSelector(state => state.imgReducers.imgPreview);

  const renderOptionGender=()=>{
    return listGender.map((gender,index)=>{
      return  <option key={index} value={gender.id}>
      {gender.NoiDung}
  </option>
    })
  }
  
  return (

    <>
    <form onSubmit={handleSubmit} enctype="multipart/form-data" style={{position:'relative'}}>
  
  <div className="row">
    <div className="col-6"> 
    <label for="" className="form-label">Tên</label>
    <input type="text" className="form-control" name="Ten"   onChange={handleChange}
        onBlur={handleBlur}
        value={values.Ten}/>
        
        {touched.Ten && errors.Ten ? (
  <div className="text-danger">{errors.Ten}</div>
       ) : null}
        
        </div>
     <div className="col-6"> 
    <label for="" className="form-label">Email</label>
    <input type="text" className="form-control" name="Email"     onChange={handleChange}
        onBlur={handleBlur}
        value={values.Email}/>
        
        {touched.Email && errors.Email ? (
  <div className="text-danger">{errors.Email}</div>
       ) : null}
        
        </div>

  
  <div className="col-6"> 
    <label for="" className="form-label">Dia Chi</label>
    <input type="text" className="form-control" name="DiaChi"  onChange={handleChange}
        onBlur={handleBlur}
        value={values.DiaChi} />
        
        {touched.DiaChi && errors.DiaChi ? (
  <div className="text-danger">{errors.DiaChi}</div>
       ) : null}
        
        
        </div>
    <div className="col-6"> 
    <label for="" className="form-label">Phone</label>
    <input type="text" className="form-control" name="Phone"  onChange={handleChange}
        onBlur={handleBlur}
        value={values.Phone} />
        
        {touched.Phone && errors.Phone ? (
  <div className="text-danger">{errors.Phone}</div>
       ) : null}
        
        </div>

  <div className="col-6"> 
    <label for="" className="form-label">CCCD</label>
    <input type="text" className="form-control" name="CCCD" onChange={handleChange}
        onBlur={handleBlur}
        value={values.CCCD} />
        
        {touched.CCCD && errors.CCCD ? (
  <div className="text-danger">{errors.CCCD}</div>
       ) : null}
        
        </div>
    


  <div className="col-6"> 
  <div>
  <label htmlFor="">Ngày Sinh</label>
  <input type="date" className="form-control" name="NgaySinh" onChange={handleChange}
        onBlur={handleBlur}
        value={values.NgaySinh} />
</div>

{touched.NgaySinh && errors.NgaySinh ? (
  <div className="text-danger">{errors.NgaySinh}</div>
       ) : null}

  </div>
  

  <div className="col-6"> 
  <div>
  <label htmlFor="">Gioi Tinh</label>
  <select className="form-control" name="MaGioiTinh" value={values.MaGioiTinh} onChange={handleChange}>
                            {renderOptionGender()}
                        </select>
</div>

  </div>

  <div className="col-6"> 
    <label for="" className="form-label">Mã Thẻ Sinh Viên</label>
    <input type="text" className="form-control" name="MaSinhVien" onChange={handleChange}
        onBlur={handleBlur}
        value={values.MaSinhVien} />
        
        {touched.MaSinhVien && errors.MaSinhVien ? (
  <div className="text-danger">{errors.MaSinhVien}</div>
       ) : null}
        
        </div>


<div className="col-6"> 
    <label for="" className="form-label">Ngày Cấp</label>
    <input type="date" className="form-control" name="NgayCap" onChange={handleChange} max={nowDate.toISOString().split('T')[0]}
        onBlur={handleBlur}
        value={values.NgayCap} />
        
        {touched.NgayCap && errors.NgayCap ? (
  <div className="text-danger">{errors.NgayCap}</div>
       ) : null}
        
        </div>

<div className="col-6"> 
    <label for="" className="form-label">HSD</label>
    <input type="date" className="form-control" name="HSD" onChange={handleChange}  min={nowDate.toISOString().split('T')[0]}
        onBlur={handleBlur}
        value={values.HSD} />
        
        {touched.HSD && errors.HSD ? (
  <div className="text-danger">{errors.HSD}</div>
       ) : null}
        
        
        </div>


        <div className="col-6"> 
    <label for="" className="form-label">Img avatar</label>
    
<input className="form-control" name="avatar" type="file" onChange={(event) => {
    dispatch({
      type:'IMG_PREVIEW',
      imgPreview:URL.createObjectURL(event.target.files[0])
    })
  setFieldValue("avatar", event.currentTarget.files[0]);
}} />
        {touched.avatar && errors.avatar ? (
  <div className="text-danger">{errors.avatar}</div>
       ) : null}
        
        
        </div>
  </div>
  <div style={{width:'150px',height:'150px',position:'absolute',right:'169px',bottom:'-69px'}}>
      <img src={imgPreview} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="Select img"></img>
      </div>
    </form>


    </>
  )
}

const formatDate=(dateString)=>{
  return dateString.substring(0, 10)
}

const phoneRegex =/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/
const MaSinhVienRegex=/^(HE|SE|he|se)[1-9]{1}[0-9]{5}$/
const EmailRegex=/^[a-zA-Z]+(he|HE|se|SE)[1-9]{6}@fpt.edu.vn$/
const CCCDRegex=/^[0-9]{12}$/

const EditReaderWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {    
    const { readerEdit } = props;

  return {MaSinhVien:readerEdit.MaSinhVien, NgaySinh:formatDate(readerEdit.NgaySinh),Ten:readerEdit.Ten,DiaChi:readerEdit.DiaChi,Phone:readerEdit.Phone,Email:readerEdit.Email,CCCD:readerEdit.CCCD,MaGioiTinh:readerEdit.MaGioiTinh,HSD: formatDate(readerEdit.HSD),NgayCap:formatDate(readerEdit.NgayCap)} },



  // Custom sync validation
  validationSchema: Yup.object().shape({

    MaSinhVien:Yup.string().required().matches(MaSinhVienRegex, 'MaSinhVien is not valid ,vd HE141462'),
    Ten:Yup.string().required('This field  is required'),
    DiaChi:Yup.string().required('This field  is required'),
    Phone:Yup.string().required().matches(phoneRegex, 'Phone number is not valid ,length is 10'),
    Email:Yup.string().required().matches(EmailRegex, 'Email is not valid ,vd haiddhe141462@fpt.edu.vn'),
    CCCD:Yup.string().required().matches(CCCDRegex, 'CCCD is not valid ,It is number and length 12'),
    NgaySinh:Yup.string().required('This field  is required'),
    HSD:Yup.string().required('This field  is required'),
    NgayCap:Yup.string().required('This field  is required'),
    avatar:Yup.string().required('This field  is required'),

}),

  handleSubmit: (values , { setSubmitting ,props}) => {
    const formData= new FormData()
formData.append('avatar',values.avatar)
formData.append('Ten',values.Ten)
formData.append('DiaChi',values.DiaChi)
formData.append('Phone',values.Phone)
formData.append('CCCD',values.CCCD)
formData.append('NgaySinh',values.NgaySinh)
formData.append('MaGioiTinh',values.MaGioiTinh)

    props.dispatch({
      type:UPDATE_READER_SAGA,
      readerUpdate:formData,
      MaThongTinChung:props.readerEdit.MaThongTinChung,
      updateThuVien:{
        NgayCap:values.NgayCap,
      HSD:values.HSD,
        MaSinhVien:values.MaSinhVien
      },
      updateAcount:{
        Email:values.Email,
    
      },
      MaAcount:props.readerEdit.MaAcount,
      MaThe:props.readerEdit.MaThe,
      name:props.keySearch

      
  })
 
  },

  displayName: "  EditReaderForm",
})(FormEditReader);
const mapStateToProps = (state) => ({


  readerEdit:state.readerReducers.readerEdit,
  keySearch: state.readerReducers.keySearch
})
export default connect(mapStateToProps)(EditReaderWithFormik);