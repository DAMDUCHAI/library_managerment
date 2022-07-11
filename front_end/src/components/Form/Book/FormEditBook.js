import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_BOOK_SAGA} from "../../../redux/constant/libraryManager/bookConstant";
import {GET_ALL_AUTHOR_SAGA} from '../../../redux/constant/libraryManager/authorConstants'
import {GET_ALL_CATEGORY_SAGA} from '../../../redux/constant/libraryManager/categoryConstants'
import {GET_ALL_BOOKSHELF_SAGA} from '../../../redux/constant/libraryManager/bookshelfConstants'
import {GET_ALL_PUBLISHER_SAGA} from '../../../redux/constant/libraryManager/publisherConstants'
import * as Yup from 'yup';
import { withFormik } from "formik";
import { connect  } from "react-redux";

const FormEditBook =(props)=> {

  const dispatch = useDispatch();
      //componentdidmount
      useEffect(() => {

        dispatch({ type: GET_ALL_AUTHOR_SAGA })
        dispatch({ type:GET_ALL_BOOKSHELF_SAGA})
        dispatch({ type: GET_ALL_CATEGORY_SAGA })
        dispatch({ type: GET_ALL_CATEGORY_SAGA })
        dispatch({ type:   GET_ALL_PUBLISHER_SAGA })
      
     
        
        //Load sự kiện submit lên drawer nút submit
        dispatch({ type: 'SET_SUBMIT', submitFunction: handleSubmit });
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
    const authorList = useSelector(state => state.authorReducers.authorList);
    const categortList = useSelector(state => state.categoryReducers.categoryList);
    const bookshelfList = useSelector(state => state.bookshelfReducers.bookshelfList);
    const publisherList = useSelector(state => state.publisherReducers.publisherList);

    const imgPreview = useSelector(state => state.imgReducers.imgPreview);

    
 const renderOptionCategory=()=>{
  return categortList.map((category,index)=>{
    return  <option key={index} value={category.id}>
    {category.Ten}
</option>
  })
}

const renderOptionBookshelf=()=>{
  return bookshelfList.map((bookshelf,index)=>{
    return  <option key={index} value={bookshelf.id}>
    {bookshelf.Ten}
</option>
  })
}

const renderOptionPublisher=()=>{
  return publisherList.map((publisher,index)=>{
    return  <option key={index} value={publisher.id}>
    {publisher.Ten}
</option>
  })
}

const renderOptionAuthor=()=>{
  return authorList.map((author,index)=>{
    return  <option key={index} value={author.id}>
    {author.Ten}
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
    <label for="" className="form-label">Năm Xuất bản</label>
    <input type="text" className="form-control" name="NamXB"     onChange={handleChange}
        onBlur={handleBlur}
        value={values.NamXB}/>
        
        {touched.NamXB && errors.NamXB ? (
  <div className="text-danger">{errors.NamXB}</div>
       ) : null}

        </div>
  </div>
  <div className="row">
  <div className="col-4"> 
    <label for="" className="form-label">Giá</label>
    <input type="text" className="form-control" name="Gia"  onChange={handleChange}
        onBlur={handleBlur}
        value={values.Gia} />
        
        
        {touched.Gia && errors.Gia ? (
  <div className="text-danger">{errors.Gia}</div>
       ) : null}
        
        </div>
    <div className="col-4"> 
    <label for="" className="form-label">Số lượng đầu sách</label>
    <input type="text" className="form-control" name="SoLgDauSach"  onChange={handleChange}
        onBlur={handleBlur}
        value={values.SoLgDauSach} />
        
        {touched.SoLgDauSach && errors.SoLgDauSach ? (
  <div className="text-danger">{errors.SoLgDauSach}</div>
       ) : null}
        
        </div>

  <div className="col-4"> 
    <label for="" className="form-label">Số lượng hiện tại</label>
    <input type="text" className="form-control" name="SoLgHienTai" onChange={handleChange}
        onBlur={handleBlur}
        value={values.SoLgHienTai} />
        
        
        {touched.SoLgHienTai && errors.SoLgHienTai ? (
  <div className="text-danger">{errors.SoLgHienTai}</div>
       ) : null}
        
        </div>
   
  </div>
  <div className="row">
  <div className="col-12"> 
  <div>
  <label htmlFor="">Nội dung</label>
  <textarea className="form-control" name="NoiDung" rows={2} defaultValue={""}  onChange={handleChange}
        onBlur={handleBlur}
        value={values.NoiDung} />
</div>

{touched.NoiDung && errors.NoiDung ? (
  <div className="text-danger">{errors.NoiDung}</div>
       ) : null}

  </div>
</div>

<div className="row">
  <div className="col-6">
  <label htmlFor="">Tác giả</label>
                        <select className="form-control" name="MaTacGia" value={values.MaTacGia} onChange={handleChange}>
                            {renderOptionAuthor()}
                        </select>
  </div>


  <div className="col-6">
  <label htmlFor="">Nhà xuất bản</label>
                        <select className="form-control" name="MaNXB" value={values.MaNXB} onChange={handleChange}>
                            {renderOptionPublisher()}
                        </select>
  </div>



  <div className="col-6">
  <label htmlFor="">Kệ sách</label>
                        <select className="form-control" name="MaKeSach" value={values.MaKeSach} onChange={handleChange}>
                            {renderOptionBookshelf()}
                        </select>
  </div>



  <div className="col-6">
  <label htmlFor="">Thể loại</label>
                        <select className="form-control" name="MaTheLoai" value={values.MaTheLoai} onChange={handleChange}>
                            {renderOptionCategory()}
                        </select>
  </div>
</div>

<div className="col-6"> 
    <label for="" className="form-label">Image book</label>
    
<input className="form-control" name="book_img" type="file" onChange={(event) => {
    dispatch({
      type:'IMG_PREVIEW',
      imgPreview:URL.createObjectURL(event.target.files[0])
    })
  setFieldValue("book_img", event.currentTarget.files[0]);
}} />
        {touched.book_img && errors.book_img ? (
  <div className="text-danger">{errors.book_img}</div>
       ) : null}
        
        
        </div>
        <div style={{width:'150px',height:'150px',position:'absolute',right:'169px',bottom:'-69px'}}>
      <img src={imgPreview} style={{width:'100%',height:'100%',objectFit:'cover'}} alt="Select img"></img>
      </div>
    </form>


    </>
  )
}
const yearRegex= /^(18|19|20){1}[0-9]{2}$/
const numberRegex= /^[0-9]+$/

const EditBookWithFormik = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {    
    const { bookEdit } = props;
    console.log(bookEdit);
  return { Ten:bookEdit.Ten, NamXB: bookEdit.NamXB,Gia: bookEdit.Gia,SoLgHienTai:bookEdit.SoLgHienTai,SoLgDauSach:bookEdit.SoLgDauSach,MaTacGia:bookEdit.MaTacGia,MaNXB:bookEdit.MaNXB,MaKeSach:bookEdit.MaKeSach,MaTheLoai:bookEdit.MaTheLoai,NoiDung:bookEdit.NoiDung,book_img:'' } },



  // Custom sync validation
  validationSchema: Yup.object().shape({
    Ten:Yup.string().required('This field  is required'),
    NamXB:Yup.string().required().matches(yearRegex, 'NamXB is not valid ,length is 10'),
    Gia:Yup.number().required(),
    SoLgHienTai:Yup.string().required().matches(numberRegex, 'This field  is natural number, start 1'),
    SoLgDauSach:Yup.string().required().matches(numberRegex, 'This field  is natural number, start 1'),
    NoiDung:Yup.string().required('This field  is required'),
    book_img:Yup.string().required('This field  is required'),


}),

  handleSubmit: (values , { setSubmitting ,props}) => {
    const formData= new FormData()
    formData.append('Ten',values.Ten)
    formData.append('NamXB',values.NamXB)
    formData.append('Gia',values.Gia)
    formData.append('SoLgHienTai',values.SoLgHienTai)
    formData.append('SoLgDauSach',values.SoLgDauSach)
    formData.append('NoiDung',values.NoiDung)
    formData.append('book_img',values.book_img)
    formData.append('MaTacGia',values.MaTacGia)
    formData.append('MaTheLoai',values.MaTheLoai)
    formData.append('MaKeSach',values.MaKeSach)
    formData.append('MaNXB',values.MaNXB)

    console.log('values',values);
    console.log('props.bookEdit',props.bookEdit);
    props.dispatch({
      type:UPDATE_BOOK_SAGA,
      bookUpdate:formData,

      idBook: props.bookEdit.id,
  })
  },

  displayName: "EditBookForm",
})(FormEditBook);
const mapStateToProps = (state) => ({

  bookEdit: state.bookReducers.bookEdit

})
export default connect(mapStateToProps)(EditBookWithFormik);